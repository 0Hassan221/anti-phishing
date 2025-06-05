import { motion } from "framer-motion";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { useTrainingStore, useUiStore } from '@/stores';

const TrainingContent = () => {
    // Zustand stores
    const {
        activeModule,
        setActiveModule,
        completeModule,
        isModuleCompleted,
        getModuleProgress,
        getOverallProgress
    } = useTrainingStore();

    const { addNotification } = useUiStore();

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
                className="relative px-4 py-16 overflow-hidden sm:px-6 lg:py-24"
                style={{
                    background: "linear-gradient(135deg, #0f172a, #1e3a8a, #60a5fa)", // كحلي غامق مع تدرج
                }}
            >
                {/* Background Effects */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(#93c5fd 1px, transparent 2px)", // نقاط زرقاء فاتحة
                        backgroundSize: "50px 50px",
                    }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-64 h-64 rounded-full bg-blue-900/20 filter blur-3xl top-20 left-20"
                    animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                    className="relative z-10 mx-auto max-w-7xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.header className="mb-12 text-center" variants={containerVariants}>
                        <motion.h2
                            className="pt-10 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            Phishing Defense Training
                        </motion.h2>
                        <motion.p
                            className="max-w-2xl mx-auto mt-4 text-lg text-blue-200/80"
                            variants={containerVariants}
                        >
                            Arm yourself with the skills to outsmart cybercriminals through interactive lessons and articles.
                        </motion.p>

                        {/* Overall Progress */}
                        <motion.div
                            className="max-w-md mx-auto mt-8"
                            variants={containerVariants}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-blue-200">Overall Progress</span>
                                <span className="text-sm font-semibold text-blue-100">{getOverallProgress()}%</span>
                            </div>
                            <div className="w-full bg-blue-900/50 rounded-full h-2">
                                <motion.div
                                    className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${getOverallProgress()}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                        </motion.div>
                    </motion.header>

                    {/* Training Modules */}
                    <div className="mb-16">
                        <h3 className="mb-6 text-2xl font-bold text-center text-white">Training Modules</h3>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {trainingModules.map((module) => (
                                <motion.div
                                    key={module.id}
                                    className="p-6 border shadow-lg bg-blue-900/50 backdrop-blur-md rounded-xl border-blue-400/30 hover:shadow-blue-500/20"
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
                                            className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700"
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
                                            <p className="mt-1 text-sm text-blue-200">{module.description}</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        className="mt-4 overflow-hidden text-blue-100/90"
                                        variants={detailVariants}
                                        animate={activeModule === module.id ? "visible" : "hidden"}
                                    >
                                        <p>{module.details}</p>
                                        <div className="flex items-center justify-between mt-4">
                                            <motion.button
                                                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                                                    isModuleCompleted(module.id)
                                                        ? 'text-green-300 bg-green-900/20 border border-green-500/50'
                                                        : 'text-blue-300 bg-transparent border border-blue-400 hover:bg-blue-400/20'
                                                }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    if (!isModuleCompleted(module.id)) {
                                                        completeModule(module.id);
                                                        addNotification({
                                                            type: 'success',
                                                            title: 'Module Completed!',
                                                            message: `You've completed "${module.title}"`
                                                        });
                                                    }
                                                }}
                                            >
                                                {isModuleCompleted(module.id) ? 'Completed' : 'Start Lesson'}
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
                                                        d={isModuleCompleted(module.id) ? "M5 13l4 4L19 7" : "M13 7l5 5m0 0l-5 5m5-5H6"}
                                                    />
                                                </svg>
                                            </motion.button>

                                            {/* Progress indicator */}
                                            <div className="text-xs text-blue-200">
                                                Progress: {getModuleProgress(module.id)}%
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Articles Section */}
                    <div>
                        <h3 className="mb-6 text-2xl font-bold text-center text-white">Latest Articles</h3>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <motion.div
                                    key={article.id}
                                    className="p-5 border shadow-md bg-blue-800/40 backdrop-blur-md rounded-xl border-blue-500/30 hover:shadow-blue-500/20"
                                    variants={cardVariants}
                                    whileHover={{
                                        scale: 1.02,
                                        borderColor: "rgba(59, 130, 246, 0.6)", // أزرق متوسط
                                        transition: { duration: 0.3 },
                                    }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <motion.div
                                            className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"
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
                                            <p className="mt-1 text-sm text-blue-100/80">{article.excerpt}</p>
                                            <motion.a
                                                href={article.link}
                                                className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-300 hover:text-blue-200"
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







// //this component if we will have the full training page
// import { useState } from "react";
// import Navbar from "@/Components/Navbar";
// import Footer from "@/Components/Footer";

// const TrainingContent = () => {
//   const [activeModule, setActiveModule] = useState(null);

//   // Training Modules Data
//   const trainingModules = [
//     {
//       id: 1,
//       title: "Spotting Phishing Emails",
//       description: "Learn to identify suspicious emails and avoid falling for scams.",
//       icon: "envelope-exclamation",
//       details: "Focus on red flags like urgent language, unknown senders, and sketchy links.",
//       level: "Beginner",
//       duration: "20 min"
//     },
//     {
//       id: 2,
//       title: "Safe Browsing Habits",
//       description: "Master techniques to surf the web without risking your data.",
//       icon: "globe-shield",
//       details: "Use HTTPS, avoid public Wi-Fi for sensitive tasks, and double-check URLs.",
//       level: "Intermediate",
//       duration: "25 min"
//     },
//     {
//       id: 3,
//       title: "Password Security 101",
//       description: "Build strong passwords and keep them safe from hackers.",
//       icon: "lock-keyhole",
//       details: "Mix letters, numbers, and symbols—never reuse passwords!",
//       level: "Beginner",
//       duration: "15 min"
//     },
//     {
//       id: 4,
//       title: "Two-Factor Authentication",
//       description: "Add an extra layer of security to all your important accounts.",
//       icon: "device-mobile",
//       details: "Learn how to set up and use 2FA on different platforms for maximum security.",
//       level: "Intermediate",
//       duration: "30 min"
//     },
//     {
//       id: 5,
//       title: "Social Engineering Defense",
//       description: "Recognize and counter manipulation tactics used by cybercriminals.",
//       icon: "users",
//       details: "Protect yourself from scammers who use psychological tricks to access sensitive information.",
//       level: "Advanced",
//       duration: "40 min"
//     },
//     {
//       id: 6,
//       title: "Data Breach Response",
//       description: "Steps to take when your personal information is compromised.",
//       icon: "shield-alert",
//       details: "Learn what to do immediately following a data breach to minimize damage.",
//       level: "Intermediate",
//       duration: "35 min"
//     }
//   ];

//   // Articles Data
//   const articles = [
//     {
//       id: 1,
//       title: "How Phishing Scams Evolved in 2025",
//       excerpt: "A look at the latest phishing trends and how to stay ahead.",
//       icon: "book-open",
//       link: "#article-1",
//       date: "May 10, 2025"
//     },
//     {
//       id: 2,
//       title: "Top 5 Email Traps to Avoid",
//       excerpt: "Common tricks scammers use and how to spot them.",
//       icon: "mail-warning",
//       link: "#article-2",
//       date: "May 5, 2025"
//     },
//     {
//       id: 3,
//       title: "Why Strong Passwords Matter",
//       excerpt: "The science behind unbreakable passwords.",
//       icon: "key",
//       link: "#article-3",
//       date: "April 28, 2025"
//     },
//     {
//       id: 4,
//       title: "Cybersecurity for Remote Workers",
//       excerpt: "Staying safe while working from anywhere.",
//       icon: "laptop-code",
//       link: "#article-4",
//       date: "April 20, 2025"
//     }
//   ];

//   // Resources section
//   const resources = [
//     {
//       title: "Security Tools",
//       items: ["Password Manager", "VPN Service", "Anti-Phishing Extension"]
//     },
//     {
//       title: "Templates",
//       items: ["Security Policy Template", "Incident Response Plan", "Training Checklist"]
//     },
//     {
//       title: "Quick Links",
//       items: ["Report Phishing", "Security FAQ", "Support Contact"]
//     }
//   ];

//   // Icon mapping for easier maintenance
//   const iconMap = {
//     "envelope-exclamation": (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
//       </svg>
//     ),
//     "globe-shield": (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//       </svg>
//     ),
//     "lock-keyhole": (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//       </svg>
//     ),
//     "device-mobile": (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
//       </svg>
//     ),
//     "users": (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
//       </svg>
//     ),
//     "shield-alert": (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />
//       </svg>
//     ),
//     "book-open": (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
//       </svg>
//     ),
//     "mail-warning": (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//       </svg>
//     ),
//     "key": (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
//       </svg>
//     ),
//     "laptop-code": (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
//       </svg>
//     ),
//   };

//   const toggleModule = (id) => {
//     setActiveModule(activeModule === id ? null : id);
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />
      
//       {/* Hero Section */}
//       <section className="relative py-12 overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 lg:py-20">
//         <div className="absolute inset-0 bg-grid-white/[0.05] -z-1"></div>
//         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//           <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-blue-600/20 blur-3xl"></div>
//           <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 blur-3xl"></div>
//         </div>
        
//         <div className="container relative z-10 px-4 mx-auto">
//           <div className="max-w-4xl mx-auto text-center">
//             <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-100 uppercase bg-blue-700 rounded-full">
//               Cybersecurity Training
//             </span>
//             <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
//               Phishing Defense Training
//             </h1>
//             <p className="mb-8 text-lg text-blue-100 md:text-xl">
//               Arm yourself with the skills to outsmart cybercriminals through our interactive and comprehensive training program.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <button className="px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                 Start Learning
//               </button>
//               <button className="px-6 py-3 font-medium text-blue-800 transition-colors bg-white rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                 View Curriculum
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Progress Overview */}
//       <section className="py-8 bg-white shadow-sm">
//         <div className="container px-4 mx-auto">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div className="mb-4 md:mb-0">
//               <h2 className="text-xl font-semibold text-gray-900">Your Training Progress</h2>
//               <p className="text-gray-600">Complete 6 more modules to earn your certification</p>
//             </div>
//             <div className="w-full md:w-1/3">
//               <div className="relative h-4 overflow-hidden bg-gray-200 rounded-full">
//                 <div className="absolute top-0 bottom-0 left-0 bg-blue-600 rounded-full" style={{ width: '40%' }}></div>
//               </div>
//               <div className="flex justify-between mt-1 text-sm">
//                 <span className="font-medium text-blue-600">40% Complete</span>
//                 <span className="text-gray-500">4/10 Modules</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <main className="flex-grow py-12 bg-gray-50 lg:py-16">
//         <div className="container px-4 mx-auto">
//           {/* Training Modules */}
//           <section className="mb-16">
//             <div className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">Training Modules</h2>
//                 <p className="mt-2 text-gray-600">Start with the basics and work your way up to advanced techniques</p>
//               </div>
//               <div className="mt-4 md:mt-0">
//                 <div className="relative inline-block w-full md:w-auto">
//                   <select className="block w-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
//                     <option>All Levels</option>
//                     <option>Beginner</option>
//                     <option>Intermediate</option>
//                     <option>Advanced</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
//                     <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
//                       <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {trainingModules.map((module) => (
//                 <div 
//                   key={module.id} 
//                   className={`relative overflow-hidden transition bg-white border rounded-lg shadow-sm hover:shadow-md ${
//                     activeModule === module.id ? 'ring-2 ring-blue-500' : ''
//                   }`}
//                 >
//                   <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
//                   <div className="p-6">
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center justify-center w-10 h-10 mr-3 text-white bg-blue-600 rounded-lg">
//                         {iconMap[module.icon]}
//                       </div>
//                       <div className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded">
//                         {module.level}
//                       </div>
//                     </div>
//                     <h3 className="mb-2 text-lg font-semibold text-gray-900">{module.title}</h3>
//                     <p className="mb-4 text-gray-600">{module.description}</p>
                    
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="flex items-center text-sm text-gray-500">
//                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                         </svg>
//                         {module.duration}
//                       </span>
//                       <button 
//                         onClick={() => toggleModule(module.id)}
//                         className="text-sm font-medium text-blue-600 hover:text-blue-800"
//                       >
//                         {activeModule === module.id ? 'Hide Details' : 'View Details'}
//                       </button>
//                     </div>
                    
//                     {activeModule === module.id && (
//                       <div className="p-4 mt-2 border-t">
//                         <p className="mb-4 text-gray-700">{module.details}</p>
//                         <button className="flex items-center justify-center w-full px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                           Start Module
//                           <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
//                           </svg>
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Stats Section */}
//           <section className="px-6 py-10 mb-16 text-white bg-blue-800 rounded-lg">
//             <div className="grid gap-6 text-center md:grid-cols-3">
//               <div className="p-4">
//                 <h3 className="mb-2 text-4xl font-bold">94%</h3>
//                 <p className="text-blue-200">of users report improved security awareness</p>
//               </div>
//               <div className="p-4">
//                 <h3 className="mb-2 text-4xl font-bold">75%</h3>
//                 <p className="text-blue-200">reduction in phishing susceptibility</p>
//               </div>
//               <div className="p-4">
//                 <h3 className="mb-2 text-4xl font-bold">15k+</h3>
//                 <p className="text-blue-200">professionals trained worldwide</p>
//               </div>
//             </div>
//           </section>

//           {/* Latest Articles */}
//           <section className="mb-16">
//             <div className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">Latest Articles</h2>
//                 <p className="mt-2 text-gray-600">Stay informed with the newest insights and strategies</p>
//               </div>
//               <a href="#all-articles" className="inline-flex items-center mt-4 text-blue-600 md:mt-0 hover:text-blue-800">
//                 View All Articles
//                 <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
//                 </svg>
//               </a>
//             </div>

//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               {articles.map((article) => (
//                 <a 
//                   key={article.id} 
//                   href={article.link}
//                   className="flex flex-col overflow-hidden transition bg-white border rounded-lg shadow-sm hover:shadow-md"
//                 >
//                   <div className="h-48 bg-blue-100">
//                     <div className="flex items-center justify-center w-full h-full text-blue-300">
//                       <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={article.icon === "book-open" ? "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" : "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"} />
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="flex flex-col flex-grow p-5">
//                     <span className="mb-2 text-xs font-medium text-blue-600">{article.date}</span>
//                     <h3 className="mb-2 text-lg font-semibold text-gray-900">{article.title}</h3>
//                     <p className="mb-4 text-gray-600">{article.excerpt}</p>
//                     <div className="flex items-center mt-auto text-blue-600 hover:text-blue-800">
//                       <span className="text-sm font-medium">Read Article</span>
//                       <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
//                       </svg>
//                     </div>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </section>

//           {/* Resources Grid */}
//           <section className="mb-16">
//             <h2 className="mb-8 text-2xl font-bold text-gray-900 lg:text-3xl">Helpful Resources</h2>
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {resources.map((category, index) => (
//                 <div key={index} className="p-6 bg-white border rounded-lg shadow-sm">
//                   <h3 className="mb-4 text-xl font-semibold text-gray-900">{category.title}</h3>
//                   <ul className="space-y-3">
//                     {category.items.map((item, idx) => (
//                       <li key={idx}>
//                         <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
//                           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                           </svg>
//                           {item}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* CTA Section */}
//           <section className="px-6 py-12 border-2 border-blue-200 rounded-lg bg-blue-50">
//             <div className="max-w-3xl mx-auto text-center">
//               <h2 className="mb-4 text-3xl font-bold text-gray-900">Ready to strengthen your security?</h2>
//               <p className="mb-8 text-lg text-gray-700">
//                 Join thousands of professionals who have already improved their cybersecurity skills through our comprehensive training program.
//               </p>
//               <div className="flex flex-wrap justify-center gap-4">
//                 <button className="px-6 py-3 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                   Enroll Now
//                 </button>
//                 <button className="px-6 py-3 font-medium text-blue-700 transition-colors bg-white border border-blue-300 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                   Download Syllabus
//                 </button>
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default TrainingContent; 