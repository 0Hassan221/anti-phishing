import React from 'react';
import { motion } from 'framer-motion';

// Data for "Why It Matters" with detailed descriptions
const mattersData = [
    {
        icon: (
            <svg className="w-14 h-14 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857a5.002 5.002 0 009.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'Targets Everyone',
        description: 'Phishing doesn’t discriminate—whether you’re an individual checking emails or a massive corporation handling sensitive data, attackers are after you. No one’s off their radar.',
    },
    {
        icon: (
            <svg className="w-14 h-14 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.66 0 3-1.34 3-3V5a3 3 0 00-6 0v3c0 1.66 1.34 3 3 3zm-1 2h2v6H9v2h6v-2h-2v-6z" />
            </svg>
        ),
        title: 'Steals Data',
        description: 'One wrong click can hand over your passwords, financial details, or company secrets to cybercriminals. Phishing emails are designed to trick you into giving up what matters most.',
    },
    {
        icon: (
            <svg className="w-14 h-14 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Costs Billions',
        description: 'Phishing attacks drain billions from economies annually—businesses lose revenue, individuals lose savings, and recovery costs pile up fast. It’s a global financial nightmare.',
    },
];

const WhyMatters = () => {
    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section className="w-full py-16 bg-white text-blue-900 px-4">
            <motion.div
                className="max-w-5xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={sectionVariants}
            >
                {/* Header with Accent Line */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-blue-900 relative inline-block">
                        Why Phishing Matters
                        <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-blue-900/30 rounded-full"></span>
                    </h2>
                    <p className="mt-6 text-xl md:text-2xl text-blue-900/80 max-w-3xl mx-auto">
                        Discover why phishing is a threat you can’t ignore in today’s digital world.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {mattersData.map((item, index) => (
                        <motion.div
                            key={index}
                            className="bg-white border border-blue-900/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                            variants={cardVariants}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="mb-4 p-3 bg-blue-900/5 rounded-full">{item.icon}</div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-2">{item.title}</h3>
                            <p className="text-blue-900/80 leading-relaxed">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default WhyMatters;