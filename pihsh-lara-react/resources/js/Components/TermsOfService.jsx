import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function TermsOfService() {
    return (
        <>
            <Head title="Terms of Service" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col pt-10">
                <Navbar />
                <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8 transform transition-all duration-300 hover:shadow-3xl">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-900">
                                Terms of Service
                            </h1>
                            <p className="mt-4 text-lg text-gray-600">
                                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>

                        {/* Content */}
                        <div className="space-y-8 text-gray-700">
                            {/* Introduction */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
                                <p className="text-sm leading-relaxed">
                                    Welcome to Secura (AntiPhishing)! These Terms of Service ("Terms") govern your use of our website, applications, and services (collectively, the "Service") operated by Secura. By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
                                </p>
                            </section>

                            {/* Acceptance of Terms */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Acceptance of Terms</h2>
                                <p className="text-sm leading-relaxed">
                                    By creating an account, accessing, or using our Service, you confirm that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. You also represent that you have the legal authority to enter into these Terms on behalf of yourself or the organization you represent.
                                </p>
                            </section>

                            {/* Description of Service */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Description of Service</h2>
                                <p className="text-sm leading-relaxed mb-3">
                                    Secura provides comprehensive anti-phishing and cybersecurity services, including but not limited to:
                                </p>
                                <ul className="list-disc list-inside text-sm leading-relaxed space-y-1 ml-4">
                                    <li>URL scanning and phishing detection</li>
                                    <li>Malware detection and file analysis</li>
                                    <li>Security awareness training and education</li>
                                    <li>Phishing simulation and testing</li>
                                    <li>Real-time threat intelligence and alerts</li>
                                    <li>Security reporting and analytics</li>
                                </ul>
                            </section>

                            {/* User Accounts and Registration */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">4. User Accounts and Registration</h2>
                                <div className="space-y-3">
                                    <p className="text-sm leading-relaxed">
                                        To access certain features of our Service, you may be required to register for an account. When you create an account, you must provide accurate, complete, and current information.
                                    </p>
                                    <p className="text-sm leading-relaxed">
                                        You are responsible for safeguarding your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account or any other breach of security.
                                    </p>
                                    <p className="text-sm leading-relaxed">
                                        We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.
                                    </p>
                                </div>
                            </section>

                            {/* Acceptable Use Policy */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Acceptable Use Policy</h2>
                                <p className="text-sm leading-relaxed mb-3">
                                    You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
                                </p>
                                <ul className="list-disc list-inside text-sm leading-relaxed space-y-1 ml-4">
                                    <li>To violate any applicable local, state, national, or international law or regulation</li>
                                    <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                                    <li>To attempt to gain unauthorized access to any portion of the Service or any other systems or networks</li>
                                    <li>To upload, post, or transmit any content that contains viruses, malware, or other harmful code</li>
                                    <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
                                    <li>To use the Service for any commercial purpose without our express written consent</li>
                                </ul>
                            </section>

                            {/* Intellectual Property Rights */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Intellectual Property Rights</h2>
                                <p className="text-sm leading-relaxed">
                                    The Service and its original content, features, and functionality are and will remain the exclusive property of Secura and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                                </p>
                            </section>

                            {/* User Content */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">7. User Content</h2>
                                <p className="text-sm leading-relaxed">
                                    Our Service may allow you to submit, upload, or share content such as URLs for scanning, files for analysis, or feedback. You retain ownership of any intellectual property rights that you hold in that content. By submitting content to our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content solely for the purpose of providing our services.
                                </p>
                            </section>

                            {/* Privacy and Data Protection */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Privacy and Data Protection</h2>
                                <p className="text-sm leading-relaxed">
                                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection, use, and disclosure of your personal information.
                                </p>
                            </section>

                            {/* Service Availability */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Service Availability</h2>
                                <p className="text-sm leading-relaxed">
                                    We strive to provide reliable and continuous service, but we do not guarantee that the Service will be available at all times. The Service may be subject to limitations, delays, and other problems inherent in the use of the internet and electronic communications. We may suspend or restrict access to the Service for maintenance, updates, or other operational reasons.
                                </p>
                            </section>

                            {/* Disclaimers and Limitation of Liability */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Disclaimers and Limitation of Liability</h2>
                                <div className="space-y-3">
                                    <p className="text-sm leading-relaxed">
                                        <strong>Disclaimer:</strong> The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the use or results of the Service in terms of correctness, accuracy, reliability, or otherwise.
                                    </p>
                                    <p className="text-sm leading-relaxed">
                                        <strong>Limitation of Liability:</strong> To the fullest extent permitted by applicable law, in no event shall Secura be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                                    </p>
                                </div>
                            </section>

                            {/* Indemnification */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Indemnification</h2>
                                <p className="text-sm leading-relaxed">
                                    You agree to defend, indemnify, and hold harmless Secura and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
                                </p>
                            </section>

                            {/* Termination */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">12. Termination</h2>
                                <p className="text-sm leading-relaxed">
                                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If you wish to terminate your account, you may simply discontinue using the Service.
                                </p>
                            </section>

                            {/* Governing Law */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">13. Governing Law</h2>
                                <p className="text-sm leading-relaxed">
                                    These Terms shall be interpreted and governed by the laws of the jurisdiction in which Secura operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                                </p>
                            </section>

                            {/* Changes to Terms */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">14. Changes to Terms</h2>
                                <p className="text-sm leading-relaxed">
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                                </p>
                            </section>

                            {/* Contact Information */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">15. Contact Information</h2>
                                <p className="text-sm leading-relaxed">
                                    If you have any questions about these Terms of Service, please contact us at{" "}
                                    <Link
                                        href="/contact"
                                        className="text-cyan-600 hover:text-cyan-800 underline font-medium transition-colors duration-200"
                                    >
                                        Contact Us
                                    </Link>
                                    . We are here to help and address any concerns you may have.
                                </p>
                            </section>
                        </div>

                        {/* Navigation Links */}
                        <div className="mt-10 flex justify-center space-x-6">
                            <Link
                                href="/"
                                className="text-sm text-cyan-600 hover:text-cyan-800 underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded-md"
                            >
                                Back to Home
                            </Link>
                            <span className="text-gray-400">|</span>
                            <Link
                                href="/privacy"
                                className="text-sm text-cyan-600 hover:text-cyan-800 underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded-md"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
