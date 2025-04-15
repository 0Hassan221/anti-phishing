import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function SimulationResults({ score = 80, totalSteps = 5 }) {
    // Calculate results (assuming these props come from the simulation)
    const correctAnswers = Math.floor(score / 20); // Each correct answer is 20 points
    const accuracy = Math.round((correctAnswers / totalSteps) * 100);

    // Feedback based on performance
    const getFeedback = () => {
        if (accuracy >= 80) return "Great job! You’re a phishing detection pro.";
        if (accuracy >= 50) return "Not bad! Keep sharpening your skills.";
        return "Room to grow. Practice makes perfect!";
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const statVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Head title="Simulation Results - AntiPhishing" />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="pt-20 pb-16 min-h-screen bg-gradient-to-br from-gray-900 via-cyan-950 to-blue-900 flex items-center justify-center relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="w-96 h-96 bg-cyan-500/10 rounded-full absolute top-0 left-0 blur-3xl animate-pulse"></div>
                    <div className="w-80 h-80 bg-blue-500/10 rounded-full absolute bottom-0 right-0 blur-3xl animate-pulse delay-1000"></div>
                </div>

                <motion.div
                    className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10"
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
                                    Simulation Results
                                </h1>
                                <p className="mt-2 text-lg text-cyan-200 font-mono">
                                    Email Phishing Lab
                                </p>
                            </div>
                        </div>

                        {/* Score Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <motion.div
                                className="p-6 bg-gray-700/50 rounded-xl border border-cyan-500/20 shadow-lg"
                                variants={statVariants}
                            >
                                <p className="text-sm text-cyan-400 uppercase">Total Score</p>
                                <p className="mt-2 text-3xl font-bold text-white">{score}/{totalSteps * 20}</p>
                            </motion.div>
                            <motion.div
                                className="p-6 bg-gray-700/50 rounded-xl border border-cyan-500/20 shadow-lg"
                                variants={statVariants}
                            >
                                <p className="text-sm text-cyan-400 uppercase">Correct Answers</p>
                                <p className="mt-2 text-3xl font-bold text-white">{correctAnswers}/{totalSteps}</p>
                            </motion.div>
                            <motion.div
                                className="p-6 bg-gray-700/50 rounded-xl border border-cyan-500/20 shadow-lg"
                                variants={statVariants}
                            >
                                <p className="text-sm text-cyan-400 uppercase">Accuracy</p>
                                <p className="mt-2 text-3xl font-bold text-white">{accuracy}%</p>
                            </motion.div>
                        </div>

                        {/* Feedback */}
                        <div className="mb-10 text-center">
                            <p className="text-xl text-gray-300">{getFeedback()}</p>
                            {accuracy < 80 && (
                                <p className="mt-2 text-sm text-cyan-300 font-mono">
                                    Tip: Look for suspicious domains and urgent language in phishing attempts.
                                </p>
                            )}
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link
                                href="/simulation/email"
                                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-md hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-300"
                            >
                                Retry Simulation
                            </Link>
                            <Link
                                href="/simulation"
                                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold rounded-xl shadow-md hover:from-gray-600 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300"
                            >
                                Back to Labs
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}