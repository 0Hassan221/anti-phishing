import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Simulation() {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    const handleClick = (e) => {
        console.log('Link clicked! Navigating to /simulation/email');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Head title="Simulation Labs - AntiPhishing" />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-gray-900 via-cyan-950 to-blue-900 flex items-center justify-center relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="w-96 h-96 bg-cyan-500/10 rounded-full absolute top-0 left-0 blur-3xl animate-pulse"></div>
                    <div className="w-80 h-80 bg-blue-500/10 rounded-full absolute bottom-0 right-0 blur-3xl animate-pulse delay-1000"></div>
                </div>

                <motion.div
                    className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-2xl border border-cyan-500/30 p-8">
                        {/* Top Accent Bar */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-600 to-blue-900" />

                        {/* Header */}
                        <div className="flex items-center space-x-6 mb-8">
                            <svg
                                className="w-14 h-14 text-cyan-400"
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
                            <div>
                                <h1 className="text-4xl font-extrabold text-white tracking-tight">
                                    Phishing Simulation Labs
                                </h1>
                                <p className="mt-2 text-lg text-cyan-200 font-mono">
                                    Test your skills. Defend the digital frontier.
                                </p>
                            </div>
                        </div>

                        {/* Introduction */}
                        <div className="mb-10">
                            <p className="text-lg text-gray-300 leading-relaxed max-w-prose">
                                Hone your phishing detection skills with interactive simulations. Identify threats, earn scores, and become a cybersecurity expert.
                            </p>
                        </div>

                        {/* Simulation Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <Link href="/simulation/email" onClick={handleClick}>
                                <motion.div
                                    className="p-6 bg-gray-700/50 rounded-xl border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 cursor-pointer"
                                    variants={cardVariants}
                                    whileHover="hover"
                                >
                                    <h3 className="text-xl font-semibold text-cyan-300">Email Phishing Lab</h3>
                                    <p className="mt-2 text-gray-400">Spot phishing emails in a simulated inbox.</p>
                                    <p className="mt-2 text-sm text-cyan-400">Difficulty: Beginner | ~5 mins</p>
                                </motion.div>
                            </Link>
                            <motion.div
                                className="p-6 bg-gray-700/50 rounded-xl border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                                variants={cardVariants}
                                whileHover="hover"
                            >
                                <h3 className="text-xl font-semibold text-cyan-300">Website Phishing Lab</h3>
                                <p className="mt-2 text-gray-400">Identify fake websites designed to steal data.</p>
                                <p className="mt-2 text-sm text-cyan-400">Difficulty: Intermediate | ~7 mins</p>
                            </motion.div>
                        </div>

                        {/* Score Dashboard */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-white mb-4">Your Scores</h2>
                            <div className="p-6 bg-gray-700/50 rounded-xl border border-cyan-500/20">
                                <p className="text-gray-400 text-center">No simulations completed yet.</p>
                                <p className="mt-2 text-cyan-300 text-center font-mono">
                                    Start a lab to see your scores!
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <Link
                                href="/simulation/email"
                                onClick={handleClick}
                                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-300 inline-block"
                            >
                                Start Simulation
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}