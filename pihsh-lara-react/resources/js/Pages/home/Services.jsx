import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Services() {
    const servicesData = [
        {
            id: 1,
            title: "URL Scanning",
            description: "We scan and analyze URLs to detect phishing and malicious content, ensuring a safer browsing experience.",
            image: "/assets/urlScanning.png",
            link: "/checkUrl",
        },
        {
            id: 2,
            title: "Phishing Email Detection",
            description: "We provide a system to detect phishing attempts in email messages, preventing phishing scams targeting users.",
            image: "/assets/urlScanning.png",
            link: "/checkUrl",
        },
        {
            id: 3,
            title: "Malware Detection",
            description: "We identify and protect against malware threats that may be present in suspicious websites or attachments.",
            image: "/assets/urlScanning.png",
            link: "#",
        },
        {
            id: 4,
            title: "Real-Time Phishing Alerts",
            description: "We provide real-time alerts to users when a phishing attempt is detected, helping users to act quickly and avoid threats.",
            image: "/assets/urlScanning.png",
            link: "#",
        },
        {
            id: 5,
            title: "Phishing Simulation",
            description: "We simulate phishing attacks to train employees and test their response to real-world threats.",
            image: "/assets/urlScanning.png",
            link: "#",
        },
        {
            id: 6,
            title: "Training Content",
            description: "We provide comprehensive training content to help individuals and teams understand and avoid phishing threats.",
            image: "/assets/urlScanning.png",
            link: "#",
        },
    ];

    const cardVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", bounce: 0.4, duration: 0.8 }
        }
    };

    return (
        <section id="services" className="relative py-20 bg-gradient-to-b from-blue-50 to-white">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                        <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text">
                            Our Cybersecurity Solutions
                        </span>
                    </h2>
                    <div className="w-20 h-1 mx-auto bg-blue-500 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={cardVariants}
                            custom={index}
                            className="relative group"
                        >
                            <div className="absolute transition-all duration-300 opacity-0 -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur group-hover:opacity-30"></div>
                            
                            <div className="relative h-full overflow-hidden transition-all duration-300 bg-white shadow-xl rounded-2xl hover:shadow-2xl">
                                <div className="relative overflow-hidden">
                                    <img
                                        className="object-cover w-full h-64 transition-transform duration-500 transform group-hover:scale-110"
                                        src={service.image}
                                        alt={service.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                        {service.title}
                                    </h3>
                                    <p className="mb-4 leading-relaxed text-gray-600">
                                        {service.description}
                                    </p>
                                    <Link
                                        to={service.link}
                                        className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-800"
                                    >
                                        <span>Explore Service</span>
                                        <svg
                                            className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;