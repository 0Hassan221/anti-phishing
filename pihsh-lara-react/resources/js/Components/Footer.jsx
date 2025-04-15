import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 text-sm shadow-inner">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
                {/* Mobile Layout: Logo at the Top */}
                <motion.div
                    className="flex lg:hidden items-center space-x-2 group mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="relative">
                        <motion.div
                            className="absolute -inset-2 bg-cyan-400/30 rounded-full blur-lg"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="relative bg-cyan-400 p-1.5 rounded-full">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="text-xl font-bold text-white hover:text-cyan-300 transition-colors duration-300"
                    >
                        Anti<span className="font-extrabold">Phishing</span>
                    </Link>
                </motion.div>

                {/* Desktop Layout: Logo + Copyright on the Left */}
                <div className="hidden lg:flex items-center space-x-4 mb-4 lg:mb-0">
                    <motion.div
                        className="flex-shrink-0 flex items-center space-x-2 group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <div className="relative">
                            <motion.div
                                className="absolute -inset-2 bg-cyan-400/30 rounded-full blur-lg"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <div className="relative bg-cyan-400 p-1.5 rounded-full">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <Link
                            href="/"
                            className="text-xl font-bold text-white hover:text-cyan-300 transition-colors duration-300"
                        >
                            Anti<span className="font-extrabold">Phishing</span>
                        </Link>
                    </motion.div>
                    <p className="text-gray-300">
                        © {new Date().getFullYear()} AntiPhishing. All rights reserved.
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center space-x-6 mb-4 lg:mb-0">
                    <Link
                        href="/"
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                    >
                        About
                    </Link>
                    <Link
                        href="/services"
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                    >
                        Services
                    </Link>
                    <Link
                        href="/contact"
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Mobile Layout: Copyright and Privacy/Terms at the Bottom */}
                <div className="flex flex-col lg:hidden items-center space-y-2 mb-4">
                    <p className="text-gray-300">
                        © {new Date().getFullYear()} AntiPhishing. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <Link
                            href="/privacy"
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-gray-500">|</span>
                        <Link
                            href="/terms"
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>

                {/* Desktop Layout: Privacy and Terms on the Right */}
                <div className="hidden lg:flex space-x-4">
                    <Link
                        href="/privacy"
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                    >
                        Privacy Policy
                    </Link>
                    <span className="text-gray-500">|</span>
                    <Link
                        href="/terms"
                        className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                    >
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;