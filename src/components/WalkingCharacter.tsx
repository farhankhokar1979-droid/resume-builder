// interface Props {
//     size?: number;
//     className?: string;
// }

// /**
//  * A small, friendly, fully coded (no external assets) walking character.
//  * Legs/arms swing via CSS keyframes defined in index.css; colors read from
//  * the same --glow-a/b/c theme variables the rest of the app uses, so it
//  * re-tints automatically between light ("sunset") and dark ("cyberpunk").
//  */
// export default function WalkingCharacter({ size = 100, className = "" }: Props) {
//     const gradientId = "char-gradient";

//     return (
//         <svg
//             width={size}
//             height={size * 1.4}
//             viewBox="0 0 100 140"
//             className={className}
//             aria-hidden="true"
//         >
//             <defs>
//                 <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" style={{ stopColor: "rgb(var(--glow-a))" }} />
//                     <stop offset="100%" style={{ stopColor: "rgb(var(--glow-b))" }} />
//                 </linearGradient>
//             </defs>

//             <g className="char-body-bob">
//                 {/* back arm (behind body) */}
//                 <rect x="62" y="46" width="10" height="38" rx="5" fill={`url(#${gradientId})`} className="char-arm-right" />

//                 {/* legs */}
//                 <rect x="38" y="86" width="10" height="42" rx="5" fill={`url(#${gradientId})`} className="char-leg-left" />
//                 <rect x="52" y="86" width="10" height="42" rx="5" fill={`url(#${gradientId})`} className="char-leg-right" />

//                 {/* body */}
//                 <rect x="33" y="42" width="34" height="50" rx="17" fill={`url(#${gradientId})`} />

//                 {/* front arm (in front of body) */}
//                 <rect x="28" y="46" width="10" height="38" rx="5" fill={`url(#${gradientId})`} className="char-arm-left" />

//                 {/* head */}
//                 <circle cx="50" cy="22" r="18" fill={`url(#${gradientId})`} />

//                 {/* face */}
//                 <circle cx="43" cy="20" r="2.4" fill="white" />
//                 <circle cx="57" cy="20" r="2.4" fill="white" />
//                 <path d="M42 28 Q50 34 58 28" stroke="white" strokeWidth="2.4" fill="none" strokeLinecap="round" />
//             </g>
//         </svg>
//     );
// }

interface Props {
    size?: number;
    className?: string;
}

/**
 * A small, coded (no external assets) walking character styled like a
 * professional headed to work — blazer, tie, briefcase, tidy hair — rather
 * than a generic stick figure. Legs/arms swing via CSS keyframes defined in
 * index.css; the blazer/tie colors read from the same --glow-a/b/c theme
 * variables the rest of the app uses, so it re-tints with light/dark mode.
 */
export default function WalkingCharacter({ size = 100, className = "" }: Props) {
    const blazerId = "char-blazer-gradient";

    return (
        <svg
            width={size}
            height={size * 1.5}
            viewBox="0 0 100 150"
            className={className}
            aria-hidden="true"
        >
            <defs>
                <linearGradient id={blazerId} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "rgb(var(--glow-a))" }} />
                    <stop offset="100%" style={{ stopColor: "rgb(var(--glow-b))" }} />
                </linearGradient>
            </defs>

            {/* ground shadow, stays put while the body bobs above it */}
            <ellipse cx="50" cy="144" rx="19" ry="4.5" fill="rgba(15, 23, 42, 0.18)" />

            <g className="char-body-bob">
                {/* briefcase, held near the front hand */}
                <rect x="17" y="78" width="15" height="12" rx="2.5" fill="#3f2d20" />
                <rect x="22" y="74" width="5" height="5" rx="1.5" fill="none" stroke="#3f2d20" strokeWidth="1.6" />

                {/* back leg + shoe (grouped so they swing as one rigid limb) */}
                <g className="char-leg-right">
                    <rect x="41" y="94" width="9" height="38" rx="4.5" fill="#334155" />
                    <ellipse cx="45.5" cy="133" rx="6.5" ry="3.4" fill="#1e293b" />
                </g>

                {/* front leg + shoe */}
                <g className="char-leg-left">
                    <rect x="51" y="94" width="9" height="38" rx="4.5" fill="#3f4b63" />
                    <ellipse cx="55.5" cy="133" rx="6.5" ry="3.4" fill="#1e293b" />
                </g>

                {/* back arm (sleeve) + hand */}
                <g className="char-arm-right">
                    <rect x="64" y="50" width="9.5" height="36" rx="4.75" fill={`url(#${blazerId})`} />
                    <circle cx="68.5" cy="88" r="4.5" fill="#f2c9a0" />
                </g>

                {/* blazer body */}
                <path
                    d="M35 46 Q35 40 50 40 Q65 40 65 46 L68 90 Q50 96 32 90 Z"
                    fill={`url(#${blazerId})`}
                />

                {/* shirt + tie */}
                <path d="M44 42 L56 42 L50 58 Z" fill="#ffffff" />
                <path d="M47.5 44 L52.5 44 L51.3 60 L48.7 60 Z" fill="rgb(var(--glow-c))" />

                {/* front arm (sleeve) + hand, holding the briefcase handle */}
                <g className="char-arm-left">
                    <rect x="26" y="50" width="9.5" height="36" rx="4.75" fill={`url(#${blazerId})`} />
                    <circle cx="30.5" cy="80" r="4.5" fill="#f2c9a0" />
                </g>

                {/* neck */}
                <rect x="46" y="36" width="8" height="8" fill="#f2c9a0" />

                {/* head */}
                <circle cx="50" cy="24" r="17" fill="#f2c9a0" />

                {/* hair */}
                <path
                    d="M33 22 Q33 6 50 6 Q67 6 67 22 Q60 15 50 15 Q40 15 33 22 Z"
                    fill="#4b3621"
                />

                {/* cheeks */}
                <circle cx="40" cy="27" r="2.6" fill="#f9a8d4" opacity="0.55" />
                <circle cx="60" cy="27" r="2.6" fill="#f9a8d4" opacity="0.55" />

                {/* face */}
                <circle cx="44" cy="23" r="2.2" fill="#1e293b" />
                <circle cx="56" cy="23" r="2.2" fill="#1e293b" />
                <path d="M43 30 Q50 35 57 30" stroke="#1e293b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </g>
        </svg>
    );
}