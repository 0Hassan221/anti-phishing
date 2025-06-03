// import { Link } from '@inertiajs/react';

// function Header({ auth }) {
//     return (
//         <div id="header" className="mx-auto lg:w-[90%] py-8 bg-gradient-to-b  min-h-screen flex items-center">
//             <div className="container grid items-center grid-cols-1 gap-10 px-6 mx-auto md:grid-cols-2 md:px-12">
//                 {/* Image Section */}
//                 <div className="flex justify-center order-first md:justify-end md:order-last">
//                     <div className="relative">
//                         <img
//                             src="/assets/header1.webp"
//                             alt="Security Header"
//                             className="object-cover h-auto max-w-full rounded-2xl"
//                         />
//                         {/* <div className="absolute w-20 h-20 bg-blue-600 rounded-full -bottom-4 -right-4 opacity-20 blur-xl"></div> */}
//                     </div>
//                 </div>

//                 {/* Text Section */}
//                 <div className="flex flex-col items-center order-last space-y-6 text-center header-info md:text-left md:items-start md:order-first">
//                     <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl md:text-6xl">
//                         Stay <span className="text-blue-600">Safe</span>,<br />
//                         Stay <span className="text-blue-600">Secure</span>
//                     </h1>
//                     <p className="max-w-md text-lg text-gray-600">
//                         Protect yourself from phishing and cyber threats with our advanced security platform.
//                     </p>
                    
//                     {/* Buttons */}
//                     <div className="flex flex-col justify-center w-full gap-4 sm:flex-row md:justify-start">
//                         <Link
//                             href={route('login')}
//                             className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 transform bg-blue-600 shadow-md rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 hover:scale-105"
//                         >
//                             <svg
//                                 className="w-5 h-5"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zm0 12a4 4 0 100-8 4 4 0 000 8zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0V9z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                             Login Now
//                         </Link>
//                         <Link
//                             href={route('register')}
//                             className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-semibold text-blue-600 transition-all duration-300 transform bg-white border-2 border-blue-600 shadow-md rounded-xl hover:bg-blue-50 focus:ring-4 focus:ring-blue-300 hover:scale-105"
//                         >
//                             <svg
//                                 className="w-5 h-5"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path
//                                     fillRule="evenodd"
//                                     d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zm0 12a4 4 0 100-8 4 4 0 000 8zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0V9z"
//                                     clipRule="evenodd"
//                                 />
//                             </svg>
//                             Register
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Header;






import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

function Header({ auth }) {
    const userName = auth?.user?.name || "Guest"; // Fallback to "Guest" if not logged in
    const isLoggedIn = auth?.user !== null; // Check if user is logged in

    console.log(auth.user?.name)

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
                staggerChildren: 0.3,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const buttonVariants = {
        tap: { 
            scale: 0.95, 
            transition: { duration: 0.2, ease: "easeIn" } 
        },
    };

    const welcomeVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 1, 
                ease: "easeOut",
                delay: 0.2
            } 
        },
    };

    return (
        <motion.div
            id="header"
            className="relative flex items-center justify-center w-full min-h-screen py-16 overflow-hidden md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-blue-950"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background Overlay for Depth */}
            <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            {/* Welcome Message for Logged In Users */}
            {isLoggedIn && (
  <motion.div
    className="absolute z-20 -translate-x-1/2 top-24" // زوّد top بدل mb-20
    variants={welcomeVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="flex items-center gap-3 px-6 py-3 border rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border-cyan-400/30">
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
      <span className="text-sm font-medium tracking-wide text-cyan-300 md:text-base">
        Welcome back, <span className="font-semibold text-white">{userName}</span>
      </span>
    </div>
  </motion.div>
)}


            <div className="container relative z-10 px-6 mx-auto text-center md:px-12">

                {/* Header Content */}
                <motion.div className="space-y-10 " variants={childVariants}>
                    {/* Subheading */}
                    <motion.p
                        className="pt-10 text-sm font-medium tracking-widest uppercase md:text-lg text-cyan-400"
                        variants={childVariants}
                    >
                        Advanced Cybersecurity Solutions
                    </motion.p>

                    {/* Main Heading */}
                    <motion.h1
                        className="text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
                        variants={childVariants}
                    >
                        Defend Your <span className="text-cyan-300">Digital Life</span><br />
                        With <span className="text-cyan-300">Secura</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="max-w-3xl mx-auto text-lg font-light leading-relaxed text-gray-300 md:text-xl"
                        variants={childVariants}
                    >
                        Safeguard against phishing, malware, and cyber threats with our cutting-edge platform. Access expert-led training to stay ahead of attackers.
                    </motion.p>

                    {/* Buttons - Only show when user is NOT logged in */}
                    {!isLoggedIn && (
                        <motion.div
                            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
                            variants={childVariants}
                        >
                            <motion.div
                                variants={buttonVariants}
                                whileTap="tap"
                                className="w-full sm:w-auto"
                            >
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center w-full gap-3 px-12 py-4 text-lg font-semibold text-white transition-colors duration-300 rounded-full group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 sm:w-auto"
                                >
                                    <svg
                                        className="w-6 h-6 transition-transform duration-300 shrink-0 group-hover:rotate-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                                        />
                                    </svg>
                                    <span>Sign In</span>
                                </Link>
                            </motion.div>
                            <motion.div
                                variants={buttonVariants}
                                whileTap="tap"
                                className="w-full sm:w-auto"
                            >
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center w-full gap-3 px-12 py-4 text-lg font-semibold transition-colors duration-300 bg-transparent border-2 rounded-full group text-cyan-300 border-cyan-300 hover:bg-cyan-300/20 sm:w-auto"
                                >
                                    <svg
                                        className="w-6 h-6 transition-transform duration-300 shrink-0 group-hover:scale-110"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M18 9v3m0 0v3m0-3h-3m-3 0H9m3-3V6m0 12v-3"
                                        />
                                    </svg>
                                    <span>Sign Up</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Additional Text for Training */}
                    <motion.p
                        className="max-w-2xl mx-auto text-base italic text-gray-400 md:text-lg"
                        variants={childVariants}
                    >
                        "Master cybersecurity with our expert-led training programs—available to all users."
                    </motion.p>

                    {/* Trust Indicators */}
                    <motion.div
                        className="flex flex-col justify-center gap-6 mt-8 text-sm text-gray-400 sm:flex-row md:text-base"
                        variants={childVariants}
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zm-1 11l-3-3 1.5-1.5L9 10l4-4 1.5 1.5L9 13z" />
                            </svg>
                            Trusted by 10,000+ Users
                        </span>
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zm-1 11l-3-3 1.5-1.5L9 10l4-4 1.5 1.5L9 13z" />
                            </svg>
                            99.9% Uptime Guarantee
                        </span>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-t from-gray-900 to-transparent" />
        </motion.div>
    );
}

export default Header;