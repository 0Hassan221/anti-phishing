import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { memo } from "react"; // Import memo for memoization

// Memoize the Services component to prevent unnecessary re-renders
const Services = memo(() => {
    const servicesData = [
        {
            id: 1,
            title: "URL Scanning",
            description: "Analyze URLs in real-time to neutralize phishing and malicious threats with precision.",
            image: "/assets/url.jpg",
            link: "/url-check",
        },
        {
            id: 2,
            title: "Phishing Email Detection",
            description: "Advanced algorithms detect phishing emails, safeguarding users from deceptive scams.",
            image: "/assets/email.jpg",
            link: "/url-check",
        },
        {
            id: 3,
            title: "Malware Detection",
            description: "Identify and eliminate malware threats embedded in websites or files instantly.",
            image: "/assets/malware.jpg",
            link: "/malware-detection",
        },
        {
            id: 4,
            title: "Real-Time Alerts",
            description: "Instant notifications of phishing attempts, empowering rapid threat response.",
            image: "/assets/alert.jpg",
            link: "#",
        },
        {
            id: 5,
            title: "Phishing Simulation",
            description: "Simulate real-world phishing attacks to train and fortify your team's defenses.",
            image: "/assets/simulation.jpg",
            link: "simulation",
        },
        {
            id: 6,
            title: "Training Content",
            description: "Cutting-edge resources to educate and empower users against phishing threats.",
            image: "/assets/training.jpg",
            link: "training",
        },
    ];

    // Optimized scrolling animation (lighter and faster)
    const cardVariants = {
        offscreen: { y: 50, opacity: 0 }, // Simplified initial state
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "tween", // Replaced spring with tween for less computation
                ease: "easeOut",
                duration: 0.5, // Reduced duration for faster execution
            }
        }
    };

    return (
        <section id="services" className="relative py-24 bg-gradient-to-b from-gray-50 via-cyan-50 to-gray-50 overflow-hidden">
            {/* Background Effects - Keep lightweight */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-300/10 rounded-full blur-2xl animate-[orbit_15s_infinite_linear]"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300/10 rounded-full blur-2xl animate-[orbit_20s_infinite_linear_reverse]"></div>
                {/* Removed SVG background to reduce DOM complexity */}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }} // Reduced y movement for performance
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }} // Shortened duration
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-center mb-16" // Reduced margin
                >
                    <h2 className="text-5xl md:text-6xl font-extrabold text-blue-900 relative inline-block">
                        Our Services
                        <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-900/30 rounded-full"></span>
                    </h2>
                    <p className="mt-6 text-xl md:text-2xl text-blue-900/80 max-w-3xl mx-auto">
                        Discover our suite of cybersecurity services designed to protect your organization from phishing threats.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Reduced gap */}
                    {servicesData.map((service) => (
                        <motion.div
                            key={service.id}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                            whileHover={{ y: -10, rotate: 1, transition: { duration: 0.3 } }}
                            className="group relative will-change-transform" // Hint for GPU acceleration
                        >
                            {/* Simplified Glowing Edge */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-3xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

                            <div className="relative h-full bg-white/95 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-cyan-300/20">
                                <div className="overflow-hidden relative">
                                    <img
                                        className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105" // Simplified hover effect
                                        src={service.image}
                                        alt={service.title}
                                        loading="lazy" // Lazy-load images
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800/10 to-transparent" />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-700 mb-5 leading-relaxed text-sm">
                                        {service.description}
                                    </p>
                                    <Link
                                        href={service.link}
                                        className="relative inline-block px-6 py-3 text-white font-semibold rounded-full overflow-hidden group/link transition-all duration-300"
                                    >
                                        {/* Darker Button with Optimized Effects */}
                                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-700 via-blue-800 to-cyan-700 group-hover/link:from-cyan-800 group-hover/link:via-blue-900 group-hover/link:to-cyan-800 transition-colors duration-300" />
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover/link:translate-x-full transition-transform duration-400" />
                                        <span className="relative flex items-center justify-center gap-2 z-10">
                                            Engage Now
                                            <svg
                                                className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Custom Animations */}
            <style>{`
                @keyframes orbit {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    100% { transform: translate(15px, 15px) rotate(360deg); }
                }
            `}</style>
        </section>
    );
});

// Add display name for better debugging
Services.displayName = "Services";

export default Services;