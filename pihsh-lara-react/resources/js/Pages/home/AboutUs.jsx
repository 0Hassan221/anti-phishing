import { motion } from 'framer-motion';

function AboutUs() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const textVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 120, duration: 0.8 }
        }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, duration: 0.6 }
        }
    };

    return (
        <section id="about" className="bg-gradient-to-br from-blue-900 to-blue-800 py-16 px-4 sm:px-6 lg:py-24 relative overflow-hidden">
            {/* Animated background particles */}
            <motion.div 
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    color: '#bfdbfe'
                }}
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'mirror'
                }}
            />
            
            <motion.div 
                className="max-w-7xl mx-auto relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                <div className="flex flex-col lg:flex-row items-center gap-8 xl:gap-12">
                    {/* Image Section - Static */}
                    <div className="w-full lg:w-4/12 xl:w-1/3 relative">
                        <div className="relative rounded-xl lg:rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-900/20 z-10"/>
                            <img 
                                src="/assets/urlScanning.png" 
                                alt="Phishing protection services interface"
                                className="w-full h-auto object-cover aspect-video lg:aspect-square"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Content Section - Animated */}
                    <motion.div 
                        className="w-full lg:w-8/12 xl:w-2/3 space-y-6 sm:space-y-8"
                        variants={containerVariants}
                    >
                        <motion.header className="space-y-3" variants={textVariants}>
                            <motion.h2 
                                className="text-3xl sm:text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                                    Complete Phishing Protection
                                </span>
                            </motion.h2>
                            <motion.div 
                                className="w-16 h-1 bg-blue-400 rounded-full"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.3 }}
                            />
                        </motion.header>

                        <motion.div className="space-y-6" variants={containerVariants}>
                            <motion.p 
                                className="text-base sm:text-lg xl:text-xl text-blue-100 leading-relaxed"
                                variants={textVariants}
                            >
                                Our multi-layered defense system combines advanced technology with user education to combat phishing threats across all digital channels.
                            </motion.p>

                            <motion.div className="grid gap-5 sm:gap-6">
                                {[
                                    {
                                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>,
                                        title: "Real-Time Scanning",
                                        text: "24/7 monitoring of URLs & emails with AI-powered threat detection and instant alerts"
                                    },
                                    {
                                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>,
                                        title: "Smart Training Modules",
                                        text: "Interactive simulations and personalized learning paths to enhance threat recognition skills"
                                    },
                                    {
                                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>,
                                        title: "Browser Shield",
                                        text: "Lightweight Chrome extension providing real-time protection without compromising browsing speed"
                                    }
                                ].map((item, index) => (
                                    <motion.div 
                                        key={index}
                                        className="flex items-start gap-4 p-4 bg-blue-800/30 rounded-lg backdrop-blur-sm hover:bg-blue-700/20 transition-all duration-300 cursor-pointer"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <motion.div 
                                            className="mt-1 flex-shrink-0 w-7 h-7 rounded-md bg-blue-400 flex items-center justify-center"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {item.icon}
                                            </svg>
                                        </motion.div>
                                        <div>
                                            <motion.h3 
                                                className="text-lg font-semibold text-blue-200 mb-1.5"
                                                whileHover={{ x: 5 }}
                                            >
                                                {item.title}
                                            </motion.h3>
                                            <motion.p className="text-sm text-blue-100">
                                                {item.text}
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

export default AboutUs;