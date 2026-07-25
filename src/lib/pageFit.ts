import { useLayoutEffect, useRef, useState } from "react";

/**
 * ── PAGE FIT CONFIG ──────────────────────────────────────────────────────
 * Single place to tune the auto-fit-to-one-page behavior.
 *
 * REF_WIDTH / REF_HEIGHT: content is always laid out at this fixed
 *   reference size (an A4 page at a nominal pixel width), then visually
 *   scaled to match whatever size the preview column actually is. Keeping
 *   layout width constant is what prevents the "content keeps moving"
 *   feedback loop — text never re-wraps because of our own scaling.
 * MIN_SCALE: the smallest we'll ever shrink long content to. Below this,
 *   text would become unreadably small, so we stop shrinking instead.
 * RESIZE_DEBOUNCE_MS: delay before recalculating after a resize/content
 *   change, to avoid thrashing while the user is typing.
 */
export const PAGE_FIT_CONFIG = {
  REF_WIDTH: 800,
  REF_HEIGHT: Math.round((800 * 297) / 210), // A4 ratio at REF_WIDTH
  MIN_SCALE: 0.55,
  RESIZE_DEBOUNCE_MS: 60,
};

/**
 * Renders content at a fixed reference width/height (so it never reflows
 * due to its own scale), then returns a `scale` to visually fit that fixed
 * page into whatever size `containerRef` actually renders at on screen.
 *
 * - Width scaling handles the responsive preview column (always fills it).
 * - Height scaling only kicks in when content is taller than one page, and
 *   never enlarges short content — short content is instead padded up to a
 *   full page height (via an explicit pixel height, not a % or min-height,
 *   so nested `h-full` sidebars reliably stretch to the bottom).
 */
export function useFitToPage<C extends HTMLElement, T extends HTMLElement>() {
  const containerRef = useRef<C>(null);
  const contentRef = useRef<T>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    content.style.width = `${PAGE_FIT_CONFIG.REF_WIDTH}px`;

    let timeout: number | undefined;

    const recalc = () => {
      const containerWidth = container.clientWidth;
      if (!containerWidth) return;

      // Reset to "auto" first so we always measure the TRUE natural content
      // height, never a stale height we imposed on a previous pass (this is
      // what lets the page shrink back down if content is deleted).
      content.style.height = "auto";
      const naturalHeight = content.scrollHeight;

      const overflowScale =
        naturalHeight > PAGE_FIT_CONFIG.REF_HEIGHT
          ? Math.max(PAGE_FIT_CONFIG.MIN_SCALE, PAGE_FIT_CONFIG.REF_HEIGHT / naturalHeight)
          : 1;
      const containerScale = containerWidth / PAGE_FIT_CONFIG.REF_WIDTH;

      // Lock in a definite pixel height (padded up to one full page if the
      // content is shorter) so nested `h-full` elements (sidebars) have a
      // real, definite height to stretch against.
      content.style.height = `${Math.max(naturalHeight, PAGE_FIT_CONFIG.REF_HEIGHT)}px`;

      setScale(containerScale * overflowScale);
    };

    const schedule = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(recalc, PAGE_FIT_CONFIG.RESIZE_DEBOUNCE_MS);
    };

    recalc();

    // Container resize (responsive layout) and content resize (real content
    // edits) are the only legitimate triggers — our own style writes above
    // don't feed back into either in a way that causes repeated changes.
    const containerObserver = new ResizeObserver(schedule);
    containerObserver.observe(container);
    const contentObserver = new ResizeObserver(schedule);
    contentObserver.observe(content);

    return () => {
      window.clearTimeout(timeout);
      containerObserver.disconnect();
      contentObserver.disconnect();
    };
  }, []);

  return { containerRef, contentRef, scale };
}