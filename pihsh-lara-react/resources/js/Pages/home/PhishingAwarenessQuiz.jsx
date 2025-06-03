import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PhishingAwarenessQuiz = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const questions = [
        {
            question: "Is this email safe? Subject: 'Urgent: Update Your Account Now!'",
            description: "An email claiming to be from your bank asks you to click a link to update your account details immediately, with a generic greeting ('Dear Customer').",
            options: ["Safe", "Phishing"],
            correctAnswer: "Phishing",
        },
        {
            question: "Is this email safe? Subject: 'Your Order Confirmation #12345'",
            description: "An email with your recent order details, sent from a legitimate company email (e.g., orders@amazon.com), but you didn’t place an order recently.",
            options: ["Safe", "Phishing"],
            correctAnswer: "Phishing",
        },
        {
            question: "Is this email safe? Subject: 'Meeting Agenda for Tomorrow'",
            description: "An email from your colleague’s email address with a meeting agenda, but the email contains a suspicious attachment named 'agenda.exe'.",
            options: ["Safe", "Phishing"],
            correctAnswer: "Phishing",
        },
    ];

    const handleAnswer = (answer) => {
        if (answer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setQuizCompleted(false);
        setIsModalOpen(false);
    };

    // Animation variants for section and modal
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
    };

    const backdropVariants = {
        hidden: { opacity: 0, backdropFilter: "blur(0px)" },
        visible: { opacity: 1, backdropFilter: "blur(8px)", transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3, ease: "easeIn" } },
    };

    return (
        <section className="w-full px-4 py-16 text-blue-900 bg-white">
            <motion.div
                className="max-w-5xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="relative inline-block text-5xl font-extrabold text-blue-900 md:text-6xl">
                        Test Your Phishing Awareness
                        <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-900/30 rounded-full"></span>
                    </h2>
                    <p className="max-w-3xl mx-auto mt-6 text-xl md:text-2xl text-blue-900/80">
                        Can you spot a phishing attempt? Take this quick quiz to find out!
                    </p>
                </div>

                {/* Call to Action Button */}
                <div className="text-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-3 text-white transition-colors duration-300 bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
                    >
                        Take the Quiz Now
                    </button>
                </div>
            </motion.div>

            {/* Modal for Quiz */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        {/* Backdrop with Blur */}
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/40"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={backdropVariants}
                            style={{ backdropFilter: "blur(8px)" }}
                        />

                        {/* Modal Content */}
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={modalVariants}
                        >
                            <div className="relative w-full max-w-lg p-6 bg-white border shadow-xl dark:bg-gray-800 rounded-xl backdrop-blur-sm border-blue-900/20 dark:border-gray-700">
                                {/* Close Button */}
                                <button
                                    onClick={resetQuiz}
                                    className="absolute text-blue-900 top-4 right-4 dark:text-white hover:text-blue-700"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>

                                {/* Quiz Content */}
                                <div className="text-center">
                                    {!quizCompleted ? (
                                        <>
                                            <h3 className="mb-4 text-xl font-semibold text-blue-900 dark:text-white">
                                                Question {currentQuestion + 1} of {questions.length}
                                            </h3>
                                            <p className="mb-2 text-lg text-blue-900 dark:text-white">
                                                {questions[currentQuestion].question}
                                            </p>
                                            <p className="mb-6 text-blue-900/80 dark:text-gray-200">
                                                {questions[currentQuestion].description}
                                            </p>
                                            <div className="flex justify-center gap-4">
                                                {questions[currentQuestion].options.map((option, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleAnswer(option)}
                                                        className="px-6 py-2 text-white transition-colors duration-300 bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                            <h3 className="mb-4 text-xl font-semibold text-blue-900 dark:text-white">
                                                Quiz Completed!
                                            </h3>
                                            <p className="mb-6 text-lg text-blue-900/80 dark:text-gray-200">
                                                You scored {score} out of {questions.length}!{' '}
                                                {score === questions.length
                                                    ? "Great job! You're a phishing detection pro!"
                                                    : "Nice effort! Learn more to stay safe from phishing attacks."}
                                            </p>
                                            <button
                                                onClick={resetQuiz}
                                                className="px-6 py-2 text-white transition-colors duration-300 bg-blue-900 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-900/50"
                                            >
                                                Try Again
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PhishingAwarenessQuiz;