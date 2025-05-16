import Navbar from '@/Components/Navbar';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EmailPhishingSimulation() {
    const [step, setStep] = useState(1); // Current simulation step
    const [score, setScore] = useState(0); // User score
    const [result, setResult] = useState(null); // Result of current choice
    const totalSteps = 5; // Total number of simulations

    // Sample simulation data (replace with dynamic data later)
    const simulation = {
        sender: "support@yourbank.com",
        subject: "Urgent: Verify Your Account Now!",
        body: "Dear Customer,\n\nWe’ve detected unusual activity on your account. Click the link below to verify your identity within 24 hours or your account will be suspended.\n\n[Verify Now](http://yourbank-security.com/login)",
        isPhishing: true,
        explanation: "The domain 'yourbank-security.com' is not the official bank site, and urgent demands are common phishing tactics."
    };

    const handleChoice = (userChoice) => {
        const isCorrect = (userChoice === 'phishing') === simulation.isPhishing;
        setResult({
            isCorrect,
            message: isCorrect ? 'Correct! Well spotted.' : 'Incorrect. Check the explanation.',
        });
        setScore((prev) => prev + (isCorrect ? 20 : 0));
    };

    const nextStep = () => {
        if (step < totalSteps) {
            setStep(step + 1);
            setResult(null);
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const resultVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    };

    return (
        <div className="min-h-screen text-white bg-gray-900">
            <Head title="Email Phishing Simulation - AntiPhishing" />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="relative flex items-center justify-center min-h-screen pt-20 pb-16 overflow-hidden bg-gradient-to-br from-gray-900 via-cyan-950 to-blue-900">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 rounded-full w-96 h-96 bg-cyan-500/10 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 delay-1000 rounded-full w-80 h-80 bg-blue-500/10 blur-3xl animate-pulse"></div>
                </div>

                <motion.div
                    className="relative z-10 max-w-5xl px-4 mx-auto sm:px-6 lg:px-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <div className="p-8 border shadow-2xl bg-gray-800/90 backdrop-blur-md rounded-2xl border-cyan-500/30">
                        {/* Top Accent Bar */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-600 to-blue-900" />

                        {/* Header */}
                        <div className="flex items-center mb-8 space-x-6">
                            <img
                                src="/assets/Eye.png"
                                alt="Eye Icon"
                                className="object-contain w-20 h-20 mt-2"
                            />
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-white">
                                    Email Phishing Simulation
                                </h1>
                                <p className="mt-2 font-mono text-lg text-cyan-200">
                                    Step {step} of {totalSteps} | Score: {score}
                                </p>
                            </div>
                        </div>

                        {/* Instructions */}
                        <p className="mb-6 text-lg text-gray-300">
                            Analyze the email below. Is it safe or a phishing attempt?
                        </p>

                        {/* Email Simulation */}
                        <div className="p-6 mb-8 border bg-gray-700/50 rounded-xl border-cyan-500/20">
                            <div className="text-left">
                                <p className="font-mono text-sm text-cyan-400">From: {simulation.sender}</p>
                                <p className="mt-2 font-mono text-sm text-cyan-400">Subject: {simulation.subject}</p>
                                <p className="mt-4 text-gray-200 whitespace-pre-line">{simulation.body}</p>
                            </div>
                        </div>

                        {/* Choices */}
                        {!result && (
                            <div className="flex justify-center mb-8 space-x-6">
                                <button
                                    onClick={() => handleChoice('safe')}
                                    className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-green-600 to-green-500 rounded-xl hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Safe
                                </button>
                                <button
                                    onClick={() => handleChoice('phishing')}
                                    className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-red-600 to-red-500 rounded-xl hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Phishing
                                </button>
                            </div>
                        )}

                        {/* Result */}
                        {result && (
                            <motion.div
                                className={`p-6 rounded-xl border ${
                                    result.isCorrect
                                        ? 'bg-green-900/30 border-green-500/50'
                                        : 'bg-red-900/30 border-red-500/50'
                                }`}
                                initial="hidden"
                                animate="visible"
                                variants={resultVariants}
                            >
                                <div className="flex items-center space-x-4">
                                    <svg
                                        className={`w-8 h-8 ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={result.isCorrect ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'}
                                        />
                                    </svg>
                                    <div>
                                        <p className={`text-lg font-semibold ${result.isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                                            {result.message}
                                        </p>
                                        <p className="mt-2 text-gray-300">{simulation.explanation}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation */}
                        {result && (
                            <div className="flex justify-center mt-8 space-x-4">
                                {step < totalSteps ? (
                                    <button
                                        onClick={nextStep}
                                        className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                    >
                                        Next Simulation
                                    </button>
                                ) : (
                                    <Link
                                        href="/simulation/results"
                                        className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-md bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                    >
                                        View Results
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}