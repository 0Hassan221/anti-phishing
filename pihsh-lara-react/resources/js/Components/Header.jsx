// import { Link } from '@inertiajs/react';

// function Header({ auth }) {
//     return (
//         <div id="header" className="mx-auto lg:w-[90%] py-8 bg-gradient-to-b  min-h-screen flex items-center">
//             <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12 gap-10">
//                 {/* Image Section */}
//                 <div className="flex justify-center md:justify-end order-first md:order-last">
//                     <div className="relative">
//                         <img
//                             src="/assets/header1.webp"
//                             alt="Security Header"
//                             className="max-w-full h-auto rounded-2xl object-cover"
//                         />
//                         {/* <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-600 rounded-full opacity-20 blur-xl"></div> */}
//                     </div>
//                 </div>

//                 {/* Text Section */}
//                 <div className="header-info text-center md:text-left flex flex-col items-center md:items-start order-last md:order-first space-y-6">
//                     <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
//                         Stay <span className="text-blue-600">Safe</span>,<br />
//                         Stay <span className="text-blue-600">Secure</span>
//                     </h1>
//                     <p className="text-lg text-gray-600 max-w-md">
//                         Protect yourself from phishing and cyber threats with our advanced security platform.
//                     </p>
                    
//                     {/* Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start">
//                         <Link
//                             href={route('login')}
//                             className="inline-flex items-center justify-center gap-2 py-3 px-8 font-semibold text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 text-lg"
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
//                             className="inline-flex items-center justify-center gap-2 py-3 px-8 font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-xl shadow-md hover:bg-blue-50 focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform hover:scale-105 text-lg"
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

    return (
        <motion.div
            id="header"
            className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-800 min-h-screen flex items-center justify-center relative overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Background Overlay for Depth */}
            <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                {/* Header Content */}
                <motion.div className="space-y-10" variants={childVariants}>
                    {/* Subheading */}
                    <motion.p
                        className="text-sm md:text-lg pt-10 uppercase tracking-widest text-cyan-400 font-medium"
                        variants={childVariants}
                    >
                        Advanced Cybersecurity Solutions
                    </motion.p>

                    {/* Main Heading */}
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight text-white"
                        variants={childVariants}
                    >
                        Defend Your <span className="text-cyan-300">Digital Life</span><br />
                        With <span className="text-cyan-300">Confidence</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed"
                        variants={childVariants}
                    >
                        Safeguard against phishing, malware, and cyber threats with our cutting-edge platform. Access expert-led training to stay ahead of attackers.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        variants={childVariants}
                    >
                        <motion.div
                            variants={buttonVariants}
                            whileTap="tap"
                            className="w-full sm:w-auto"
                        >
                            <Link
                                href={route('login')}
                                className="group inline-flex items-center justify-center gap-3 py-4 px-12 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-colors duration-300 w-full sm:w-auto"
                            >
                                <svg
                                    className="w-6 h-6 shrink-0 group-hover:rotate-12 transition-transform duration-300"
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
                                className="group inline-flex items-center justify-center gap-3 py-4 px-12 text-lg font-semibold text-cyan-300 bg-transparent border-2 border-cyan-300 rounded-full hover:bg-cyan-300/20 transition-colors duration-300 w-full sm:w-auto"
                            >
                                <svg
                                    className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform duration-300"
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

                    {/* Additional Text for Training */}
                    <motion.p
                        className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto italic"
                        variants={childVariants}
                    >
                        "Master cybersecurity with our expert-led training programs—available to all users."
                    </motion.p>

                    {/* Trust Indicators */}
                    <motion.div
                        className="mt-8 flex flex-col sm:flex-row justify-center gap-6 text-gray-400 text-sm md:text-base"
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
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
        </motion.div>
    );
}

export default Header;