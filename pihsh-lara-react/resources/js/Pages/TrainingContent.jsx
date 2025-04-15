import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

const TrainingContent = () => {
    const [activeModule, setActiveModule] = useState(null);

    // Training Modules Data
    const trainingModules = [
        {
            id: 1,
            title: "Spotting Phishing Emails",
            description: "Learn to identify suspicious emails and avoid falling for scams.",
            icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
            details: "Focus on red flags like urgent language, unknown senders, and sketchy links.",
        },
        {
            id: 2,
            title: "Safe Browsing Habits",
            description: "Master techniques to surf the web without risking your data.",
            icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
            details: "Use HTTPS, avoid public Wi-Fi for sensitive tasks, and double-check URLs.",
        },
        {
            id: 3,
            title: "Password Security 101",
            description: "Build strong passwords and keep them safe from hackers.",
            icon: "M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 2.896 2 4zm0 0c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 2.896 2 4zm8 0c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 2.896 2 4zm-8 6c-3.314 0-6-2.686-6-6s6-10 6-10 6 6.686 6 10-2.686 6-6 6z",
            details: "Mix letters, numbers, and symbols—never reuse passwords!",
        },
    ];

    // Articles Data
    const articles = [
        {
            id: 1,
            title: "How Phishing Scams Evolved in 2025",
            excerpt: "A look at the latest phishing trends and how to stay ahead.",
            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253",
            link: "#article-1",
        },
        {
            id: 2,
            title: "Top 5 Email Traps to Avoid",
            excerpt: "Common tricks scammers use and how to spot them.",
            icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
            link: "#article-2",
        },
        {
            id: 3,
            title: "Why Strong Passwords Matter",
            excerpt: "The science behind unbreakable passwords.",
            icon: "M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 2.896 2 4zm8 0c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 2.896 2 4z",
            link: "#article-3",
        },
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring" } },
    };

    const detailVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeOut" } },
    };

    return (
        <>
            <Navbar />
            <section
                className="relative py-16 px-4 sm:px-6 lg:py-24 overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #0f172a, #1e3a8a, #60a5fa)", // كحلي غامق مع تدرج
                }}
            >
                {/* Background Effects */}
                <motion.div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(#93c5fd 1px, transparent 2px)", // نقاط زرقاء فاتحة
                        backgroundSize: "50px 50px",
                    }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-64 h-64 bg-blue-900/20 rounded-full filter blur-3xl top-20 left-20"
                    animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                    className="max-w-7xl mx-auto relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.header className="text-center mb-12" variants={containerVariants}>
                        <motion.h2
                            className="text-4xl pt-10 sm:text-5xl lg:text-6xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400 leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            Phishing Defense Training
                        </motion.h2>
                        <motion.p
                            className="text-lg text-blue-200/80 mt-4 max-w-2xl mx-auto"
                            variants={containerVariants}
                        >
                            Arm yourself with the skills to outsmart cybercriminals through interactive lessons and articles.
                        </motion.p>
                    </motion.header>

                    {/* Training Modules */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Training Modules</h3>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {trainingModules.map((module) => (
                                <motion.div
                                    key={module.id}
                                    className="bg-blue-900/50 backdrop-blur-md rounded-xl p-6 border border-blue-400/30 shadow-lg hover:shadow-blue-500/20"
                                    variants={cardVariants}
                                    whileHover={{
                                        scale: 1.03,
                                        borderColor: "rgba(96, 165, 250, 0.6)", // أزرق فاتح
                                        transition: { duration: 0.3 },
                                    }}
                                    onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                                >
                                    <div className="flex items-start space-x-4">
                                        <motion.div
                                            className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center"
                                            whileHover={{ rotate: [0, 10, -10, 0], scale: 1.1 }}
                                            transition={{ duration: 0.6 }}
                                        >
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
                                                    d={module.icon}
                                                />
                                            </svg>
                                        </motion.div>
                                        <div className="flex-1">
                                            <h4 className="text-xl font-semibold text-white">{module.title}</h4>
                                            <p className="text-sm text-blue-200 mt-1">{module.description}</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        className="mt-4 text-blue-100/90 overflow-hidden"
                                        variants={detailVariants}
                                        animate={activeModule === module.id ? "visible" : "hidden"}
                                    >
                                        <p>{module.details}</p>
                                        <motion.button
                                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-300 bg-transparent border border-blue-400 rounded-lg hover:bg-blue-400/20"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Start Lesson
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Articles Section */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">Latest Articles</h3>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <motion.div
                                    key={article.id}
                                    className="bg-blue-800/40 backdrop-blur-md rounded-xl p-5 border border-blue-500/30 shadow-md hover:shadow-blue-500/20"
                                    variants={cardVariants}
                                    whileHover={{
                                        scale: 1.02,
                                        borderColor: "rgba(59, 130, 246, 0.6)", // أزرق متوسط
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <motion.div
                                            className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d={article.icon}
                                                />
                                            </svg>
                                        </motion.div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-white">{article.title}</h4>
                                            <p className="text-sm text-blue-100/80 mt-1">{article.excerpt}</p>
                                            <motion.a
                                                href={article.link}
                                                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-blue-300 hover:text-blue-200"
                                                whileHover={{ x: 5 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                Read More
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </motion.a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>
            <Footer />
        </>
    );
};

export default TrainingContent;