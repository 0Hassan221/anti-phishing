import { motion } from 'framer-motion';

function AboutUs() {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 150, damping: 15 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 120, damping: 20 },
        },
    };

    const glowVariants = {
        animate: {
            boxShadow: [
                '0 0 10px rgba(96, 165, 250, 0.3)',
                '0 0 20px rgba(96, 165, 250, 0.5)',
                '0 0 10px rgba(96, 165, 250, 0.3)',
            ],
        },
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    };

    return (
        <section
            id="about"
            className="relative py-16 px-4 sm:px-6 lg:py-24 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #1e3a8a, #1e1b4b, #0f172a)',
            }}
        >
            {/* Enhanced Background with Holographic Particles */}
            <motion.div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `
            radial-gradient(circle at 10% 20%, #60a5fa 2px, transparent 3px),
            radial-gradient(circle at 90% 80%, #a78bfa 2px, transparent 3px)
          `,
                    backgroundSize: '60px 60px',
                }}
                animate={{
                    scale: [1, 1.03, 1],
                    backgroundPosition: ['0% 0%', '20% 20%', '0% 0%'],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            {/* Subtle Floating Orbs */}
            <motion.div
                className="absolute w-40 h-40 bg-cyan-400/20 rounded-full filter blur-3xl top-10 left-10"
                animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute w-60 h-60 bg-purple-400/20 rounded-full filter blur-3xl bottom-20 right-20"
                animate={{ y: [0, 20, 0], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
                className="max-w-7xl mx-auto relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Enhanced Image Section */}
                    <motion.div
                        className="w-full lg:w-5/12 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    >
                        <motion.div
                            className="relative rounded-2xl overflow-hidden border border-cyan-500/30"
                            whileHover={{ scale: 1.02, rotate: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 z-10"
                                variants={glowVariants}
                                animate="animate"
                            />
                            <img
                                src="/assets/about.jpg"
                                alt="Phishing protection services interface"
                                className="w-full h-auto object-cover aspect-square"
                                loading="lazy"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Content Section */}
                    <motion.div className="w-full lg:w-7/12 space-y-8" variants={containerVariants}>
                        <motion.header className="space-y-4" variants={textVariants}>
                            <motion.h2
                                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-purple-300 leading-tight tracking-tight"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            >
                                Ultimate Phishing Defense
                            </motion.h2>
                            <motion.div
                                className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
                            />
                        </motion.header>

                        <motion.p
                            className="text-lg lg:text-xl text-blue-100/90 leading-relaxed max-w-2xl"
                            variants={textVariants}
                        >
                            Harness the power of AI-driven security and immersive training to shield your digital world from phishing threats.
                        </motion.p>

                        <motion.div className="grid gap-6" variants={containerVariants}>
                            {[
                                {
                                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />,
                                    title: "Real-Time Threat Analysis",
                                    text: "AI-powered scanning with instant threat neutralization across all channels.",
                                },
                                {
                                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
                                    title: "Adaptive Learning Hub",
                                    text: "Gamified training with real-world simulations to master phishing defense.",
                                },
                                {
                                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                                    title: "Cyber Shield Extension",
                                    text: "Seamless browser protection with zero performance impact.",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start gap-5 p-5 bg-blue-900/20 rounded-xl border border-cyan-500/20 backdrop-blur-md"
                                    variants={itemVariants}
                                    whileHover={{
                                        scale: 1.03,
                                        borderColor: 'rgba(96, 165, 250, 0.5)',
                                        backgroundColor: 'rgba(30, 58, 138, 0.3)',
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center"
                                        whileHover={{ rotate: [0, 15, -15, 0], scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {item.icon}
                                        </svg>
                                    </motion.div>
                                    <div>
                                        <motion.h3
                                            className="text-xl font-semibold text-cyan-200 mb-2"
                                            whileHover={{ x: 5, color: '#e0f2fe' }}
                                        >
                                            {item.title}
                                        </motion.h3>
                                        <motion.p className="text-sm text-blue-100/80">
                                            {item.text}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

export default AboutUs;