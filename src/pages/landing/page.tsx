// import { useEffect, useState } from "react";
// import {
//     FileText,
//     Sparkles,
//     Palette,
//     Download,
//     LayoutTemplate,
//     ShieldCheck,
//     ArrowRight,
//     Sun,
//     Moon,
// } from "lucide-react";

// interface Props {
//     onGetStarted: () => void;
// }

// const FEATURES = [
//     {
//         icon: LayoutTemplate,
//         title: "13 Templates",
//         desc: "From minimal to bold — pick a style that fits you.",
//     },
//     {
//         icon: Palette,
//         title: "Full Personalization",
//         desc: "Your colors, your fonts, your section order.",
//     },
//     {
//         icon: Download,
//         title: "One-Click PDF",
//         desc: "Pixel-faithful export, ready to send.",
//     },
//     {
//         icon: ShieldCheck,
//         title: "No Sign-Up, Ever",
//         desc: "Nothing leaves your browser. No account needed.",
//     },
// ];

// export default function LandingPage({ onGetStarted }: Props) {
//     const [darkMode, setDarkMode] = useState(true);

//     useEffect(() => {
//         const savedTheme = localStorage.getItem("resume-theme");

//         if (savedTheme === "light") {
//             setDarkMode(false);
//             document.documentElement.classList.remove("dark");
//         } else {
//             setDarkMode(true);
//             document.documentElement.classList.add("dark");
//         }
//     }, []);

//     const toggleTheme = () => {
//         const newMode = !darkMode;

//         setDarkMode(newMode);

//         if (newMode) {
//             document.documentElement.classList.add("dark");
//             localStorage.setItem("resume-theme", "dark");
//         } else {
//             document.documentElement.classList.remove("dark");
//             localStorage.setItem("resume-theme", "light");
//         }
//     };

//     return (
//         <div
//             className="
//             min-h-screen overflow-hidden relative
//             bg-slate-100 text-slate-900
//             dark:bg-slate-950 dark:text-white
//             transition-colors duration-500
//             "
//         >

//             {/* Ambient Glow */}
//             <div className="pointer-events-none absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-fuchsia-500/20 blur-[120px] float-slow" />

//             <div
//                 className="pointer-events-none absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full bg-sky-500/20 blur-[120px] float-slow"
//                 style={{ animationDelay: "1.5s" }}
//             />

//             <div
//                 className="pointer-events-none absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-violet-500/20 blur-[120px] float-slow"
//                 style={{ animationDelay: "3s" }}
//             />


//             <div className="relative max-w-5xl mx-auto px-6 pt-10 pb-24 flex flex-col items-center text-center">


//                 {/* Navbar */}
//                 <div className="flex justify-between items-center w-full mb-16">

//                     <div className="flex items-center gap-2">
//                         <div className="w-9 h-9 rounded-lg neon-button flex items-center justify-center">
//                             <FileText className="w-5 h-5 text-white" />
//                         </div>

//                         <span className="font-bold text-lg">
//                             Resume Builder
//                         </span>
//                     </div>


//                     {/* Theme Toggle */}
//                     <button
//                         onClick={toggleTheme}
//                         className="
//                         p-3 rounded-full
//                         border border-slate-300
//                         dark:border-white/15
//                         bg-white/70
//                         dark:bg-white/5
//                         hover:scale-105
//                         transition
//                         "
//                         aria-label="Toggle theme"
//                     >
//                         {darkMode ? (
//                             <Sun className="w-5 h-5 text-yellow-400" />
//                         ) : (
//                             <Moon className="w-5 h-5 text-slate-700" />
//                         )}
//                     </button>

//                 </div>



//                 <div
//                     className="
//                     inline-flex items-center gap-2 px-4 py-1.5 rounded-full
//                     border border-slate-300
//                     dark:border-white/10
//                     bg-white/60
//                     dark:bg-white/5
//                     text-xs font-medium
//                     text-slate-600
//                     dark:text-slate-300
//                     mb-8
//                     "
//                 >
//                     <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />

//                     Free forever. No account required.
//                 </div>



//                 <h1 className="
//                     text-5xl sm:text-6xl
//                     font-black
//                     leading-tight
//                     max-w-3xl
//                 ">
//                     Your next job starts with a{" "}
//                     <span className="neon-text">
//                         resume that stands out
//                     </span>
//                 </h1>



//                 <p
//                     className="
//                     mt-6 text-lg max-w-xl
//                     text-slate-600
//                     dark:text-slate-400
//                     "
//                 >
//                     Build a polished, professional resume in minutes —
//                     pick a template, make it yours, and download a
//                     pixel-perfect PDF. No sign-up, no watermark, no catch.
//                 </p>



//                 <button
//                     type="button"
//                     onClick={onGetStarted}
//                     className="
//                     neon-button mt-10
//                     flex items-center gap-2
//                     px-8 py-4 rounded-full
//                     text-white font-bold text-lg
//                     shadow-xl
//                     hover:scale-105
//                     active:scale-100
//                     transition-transform
//                     "
//                 >
//                     Get Started for Free
//                     <ArrowRight className="w-5 h-5" />
//                 </button>


//                 <p className="mt-4 text-xs text-slate-500">
//                     Takes less than a minute to start.
//                 </p>



//                 {/* Features */}
//                 <div className="
//                     mt-24
//                     grid grid-cols-1
//                     sm:grid-cols-2
//                     lg:grid-cols-4
//                     gap-5
//                     w-full
//                 ">

//                     {FEATURES.map((f) => (

//                         <div
//                             key={f.title}
//                             className="
//                             rounded-xl
//                             border
//                             border-slate-200
//                             dark:border-white/10
//                             bg-white/70
//                             dark:bg-white/[0.03]
//                             p-5
//                             text-left
//                             hover:border-fuchsia-400/40
//                             transition
//                             "
//                         >

//                             <f.icon className="
//                                 w-5 h-5
//                                 text-fuchsia-400
//                                 mb-3
//                             "/>


//                             <h3 className="font-semibold text-sm">
//                                 {f.title}
//                             </h3>


//                             <p className="
//                                 text-xs mt-1
//                                 text-slate-600
//                                 dark:text-slate-400
//                             ">
//                                 {f.desc}
//                             </p>

//                         </div>

//                     ))}

//                 </div>



//                 <button
//                     type="button"
//                     onClick={onGetStarted}
//                     className="
//                     mt-20
//                     flex items-center gap-2
//                     px-6 py-3
//                     rounded-full
//                     border
//                     border-slate-300
//                     dark:border-white/15
//                     text-slate-700
//                     dark:text-slate-200
//                     font-medium
//                     hover:bg-white/10
//                     transition
//                     "
//                 >
//                     Start building your resume

//                     <ArrowRight className="w-4 h-4" />
//                 </button>


//             </div>

//         </div>
//     );
// }
import { useEffect, useState } from "react";
import {
    FileText,
    Sparkles,
    Palette,
    Download,
    LayoutTemplate,
    ShieldCheck,
    ArrowRight,
    Sun,
    Moon,
} from "lucide-react";

interface Props {
    onGetStarted: () => void;
}

const FEATURES = [
    {
        icon: LayoutTemplate,
        title: "13 Templates",
        desc: "From minimal to bold — pick a style that fits you.",
    },
    {
        icon: Palette,
        title: "Full Personalization",
        desc: "Your colors, fonts, and section order.",
    },
    {
        icon: Download,
        title: "One-Click PDF",
        desc: "Pixel-perfect export ready to send.",
    },
    {
        icon: ShieldCheck,
        title: "No Sign-Up",
        desc: "Nothing leaves your browser.",
    },
];


export default function LandingPage({ onGetStarted }: Props) {

    const [darkMode, setDarkMode] = useState(true);


    useEffect(() => {
        const saved = localStorage.getItem("resume-theme");

        if (saved === "light") {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        } else {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }

    }, []);



    const toggleTheme = () => {

        const next = !darkMode;

        setDarkMode(next);

        if (next) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("resume-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("resume-theme", "light");
        }
    };



    return (

        <div
            className="
            min-h-screen relative overflow-hidden
            bg-slate-100
            dark:bg-slate-950
            text-slate-900
            dark:text-white
            transition-colors duration-500
            "
        >


            {/* Background Glow */}

            <div
                className="
                pointer-events-none
                absolute
                -top-32
                -left-32
                w-72 h-72
                sm:w-[32rem]
                sm:h-[32rem]
                rounded-full
                bg-fuchsia-600/20
                blur-[100px]
                "
            />

            <div
                className="
                pointer-events-none
                absolute
                top-1/3
                -right-32
                w-72 h-72
                sm:w-[32rem]
                sm:h-[32rem]
                rounded-full
                bg-sky-500/20
                blur-[100px]
                "
            />



            <main
                className="
                relative
                max-w-5xl
                mx-auto
                px-5
                sm:px-6
                pt-6
                sm:pt-10
                pb-16
                sm:pb-24
                flex
                flex-col
                items-center
                text-center
                "
            >



                {/* Header */}

                <header
                    className="
                    w-full
                    flex
                    items-center
                    justify-between
                    mb-12
                    sm:mb-16
                    "
                >

                    <div className="flex items-center gap-2">

                        <div
                            className="
                            w-9 h-9
                            rounded-xl
                            neon-button
                            flex
                            items-center
                            justify-center
                            "
                        >
                            <FileText className="w-5 h-5 text-white" />
                        </div>


                        <span
                            className="
                            font-bold
                            text-base
                            sm:text-lg
                            "
                        >
                            Resume Builder
                        </span>

                    </div>



                    <button
                        onClick={toggleTheme}
                        className="
                        w-11
                        h-11
                        rounded-full
                        flex
                        items-center
                        justify-center
                        border
                        border-slate-300
                        dark:border-white/15
                        bg-white/70
                        dark:bg-white/5
                        active:scale-95
                        transition
                        "
                    >

                        {
                            darkMode
                                ?
                                <Sun className="w-5 h-5 text-yellow-400" />
                                :
                                <Moon className="w-5 h-5" />
                        }

                    </button>

                </header>





                {/* Badge */}

                <div
                    className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    border
                    border-slate-300
                    dark:border-white/10
                    bg-white/60
                    dark:bg-white/5
                    text-xs
                    sm:text-sm
                    text-slate-600
                    dark:text-slate-300
                    mb-6
                    "
                >

                    <Sparkles
                        className="
                        w-4 h-4
                        text-fuchsia-400
                        "
                    />

                    Free forever. No account required.

                </div>





                {/* Hero */}

                <h1
                    className="
                    text-4xl
                    leading-[1.1]
                    sm:text-5xl
                    lg:text-6xl
                    font-black
                    max-w-3xl
                    "
                >

                    Your next job starts with a

                    <span className="neon-text block sm:inline">

                        resume that stands out

                    </span>

                </h1>




                <p
                    className="
                    mt-5
                    sm:mt-6
                    text-base
                    sm:text-lg
                    max-w-xl
                    leading-relaxed
                    text-slate-600
                    dark:text-slate-400
                    "
                >

                    Build a polished professional resume in minutes.
                    Choose a template, customize it, and download a
                    pixel-perfect PDF.

                </p>





                {/* CTA */}

                <button
                    onClick={onGetStarted}
                    className="
                    neon-button
                    mt-8
                    w-full
                    sm:w-auto
                    px-8
                    py-4
                    rounded-full
                    flex
                    justify-center
                    items-center
                    gap-2
                    font-bold
                    text-base
                    sm:text-lg
                    shadow-xl
                    active:scale-95
                    transition
                    "
                >

                    Get Started for Free

                    <ArrowRight className="w-5 h-5" />

                </button>



                <p
                    className="
                    mt-3
                    text-xs
                    text-slate-500
                    "
                >
                    Takes less than a minute to start.
                </p>







                {/* Feature Cards */}

                <section
                    className="
                    mt-16
                    sm:mt-24
                    grid
                    grid-cols-1
                    xs:grid-cols-2
                    lg:grid-cols-4
                    gap-4
                    w-full
                    "
                >

                    {
                        FEATURES.map((f) => (

                            <div
                                key={f.title}
                                className="
                                rounded-2xl
                                border
                                border-slate-200
                                dark:border-white/10
                                bg-white/70
                                dark:bg-white/[0.03]
                                p-5
                                text-left
                                "
                            >

                                <f.icon
                                    className="
                                    w-5
                                    h-5
                                    text-fuchsia-400
                                    mb-3
                                    "
                                />


                                <h3 className="font-semibold text-sm">
                                    {f.title}
                                </h3>


                                <p
                                    className="
                                    mt-1
                                    text-xs
                                    text-slate-600
                                    dark:text-slate-400
                                    "
                                >
                                    {f.desc}
                                </p>


                            </div>

                        ))
                    }

                </section>






                <button
                    onClick={onGetStarted}
                    className="
                    mt-14
                    sm:mt-20
                    px-6
                    py-3
                    rounded-full
                    border
                    border-slate-300
                    dark:border-white/15
                    text-sm
                    sm:text-base
                    font-medium
                    hover:bg-white/10
                    transition
                    flex
                    items-center
                    gap-2
                    "
                >

                    Start building your resume

                    <ArrowRight className="w-4 h-4" />

                </button>


            </main>

        </div>

    );
}