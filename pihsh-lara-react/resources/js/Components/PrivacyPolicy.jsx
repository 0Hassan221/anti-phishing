import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col pt-10">
                <Navbar />
                <div className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8 transform transition-all duration-300 hover:shadow-3xl">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-900">
                                Privacy Policy
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
                                    At Secura (AntiPhishing), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our anti-phishing services. Please read this privacy policy carefully to understand our practices regarding your personal data.
                                </p>
                            </section>

                            {/* Information We Collect */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">2.1 Personal Information</h3>
                                        <p className="text-sm leading-relaxed">
                                            We may collect personal information that you voluntarily provide to us when you:
                                        </p>
                                        <ul className="list-disc list-inside text-sm leading-relaxed mt-2 ml-4 space-y-1">
                                            <li>Register for an account</li>
                                            <li>Contact us through our contact forms</li>
                                            <li>Subscribe to our newsletter or updates</li>
                                            <li>Participate in surveys or feedback forms</li>
                                        </ul>
                                        <p className="text-sm leading-relaxed mt-2">
                                            This information may include your name, email address, phone number, and any other information you choose to provide.
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">2.2 Usage Information</h3>
                                        <p className="text-sm leading-relaxed">
                                            We automatically collect certain information about your device and usage of our services, including:
                                        </p>
                                        <ul className="list-disc list-inside text-sm leading-relaxed mt-2 ml-4 space-y-1">
                                            <li>IP address and location data</li>
                                            <li>Browser type and version</li>
                                            <li>Operating system information</li>
                                            <li>Pages visited and time spent on our website</li>
                                            <li>URLs submitted for scanning (anonymized)</li>
                                            <li>Files uploaded for malware detection (processed securely)</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-800 mb-2">2.3 Cookies and Tracking Technologies</h3>
                                        <p className="text-sm leading-relaxed">
                                            We use cookies, web beacons, and similar tracking technologies to enhance your experience on our website. These technologies help us remember your preferences, analyze website traffic, and improve our services.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* How We Use Your Information */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">3. How We Use Your Information</h2>
                                <p className="text-sm leading-relaxed mb-3">
                                    We use the information we collect for the following purposes:
                                </p>
                                <ul className="list-disc list-inside text-sm leading-relaxed space-y-1 ml-4">
                                    <li>To provide and maintain our anti-phishing services</li>
                                    <li>To process URL scans and malware detection requests</li>
                                    <li>To communicate with you about our services</li>
                                    <li>To send you important updates and security notifications</li>
                                    <li>To improve our website and services</li>
                                    <li>To analyze usage patterns and optimize performance</li>
                                    <li>To prevent fraud and enhance security</li>
                                    <li>To comply with legal obligations</li>
                                </ul>
                            </section>

                            {/* Information Sharing */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Information Sharing and Disclosure</h2>
                                <p className="text-sm leading-relaxed mb-3">
                                    We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                                </p>
                                <ul className="list-disc list-inside text-sm leading-relaxed space-y-1 ml-4">
                                    <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and providing our services</li>
                                    <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights, property, or safety</li>
                                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                                    <li><strong>Consent:</strong> We may share information with your explicit consent</li>
                                </ul>
                            </section>

                            {/* Data Security */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Security</h2>
                                <p className="text-sm leading-relaxed">
                                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, access controls, and regular security assessments. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                                </p>
                            </section>

                            {/* Data Retention */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Data Retention</h2>
                                <p className="text-sm leading-relaxed">
                                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Scan results and uploaded files are automatically deleted after a specified period to ensure your privacy and security.
                                </p>
                            </section>

                            {/* Your Rights */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Your Privacy Rights</h2>
                                <p className="text-sm leading-relaxed mb-3">
                                    Depending on your location, you may have the following rights regarding your personal information:
                                </p>
                                <ul className="list-disc list-inside text-sm leading-relaxed space-y-1 ml-4">
                                    <li>Right to access your personal information</li>
                                    <li>Right to correct inaccurate or incomplete information</li>
                                    <li>Right to delete your personal information</li>
                                    <li>Right to restrict or object to processing</li>
                                    <li>Right to data portability</li>
                                    <li>Right to withdraw consent</li>
                                </ul>
                                <p className="text-sm leading-relaxed mt-3">
                                    To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                                </p>
                            </section>

                            {/* Third-Party Services */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Third-Party Services</h2>
                                <p className="text-sm leading-relaxed">
                                    Our services may integrate with third-party APIs and services (such as VirusTotal) to provide comprehensive security analysis. These third parties have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of these third-party services.
                                </p>
                            </section>

                            {/* Children's Privacy */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Children's Privacy</h2>
                                <p className="text-sm leading-relaxed">
                                    Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.
                                </p>
                            </section>

                            {/* Changes to Privacy Policy */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Changes to This Privacy Policy</h2>
                                <p className="text-sm leading-relaxed">
                                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                                </p>
                            </section>

                            {/* Contact Us */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Contact Us</h2>
                                <p className="text-sm leading-relaxed">
                                    If you have any questions about this Privacy Policy or our privacy practices, please contact us at{" "}
                                    <Link
                                        href="/contact"
                                        className="text-cyan-600 hover:text-cyan-800 underline font-medium transition-colors duration-200"
                                    >
                                        Contact Us
                                    </Link>
                                    . We are committed to addressing your concerns and protecting your privacy.
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
                                href="/terms"
                                className="text-sm text-cyan-600 hover:text-cyan-800 underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded-md"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
