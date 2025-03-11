import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
        <footer className="bg-gray-700 text-white text-center py-4 text-sm">
            <div className="container flex flex-col lg:flex-row justify-between items-center lg:items-center px-4">
                <p className="mb-2 lg:mb-0">© 2025 UntiPhishing. All rights reserved.</p>
                
                <nav className="flex flex-wrap justify-center space-x-4 mb-4 lg:mb-0">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/about" className="hover:underline">About</Link>
                    <Link href="/services" className="hover:underline">Services</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </nav>

                <p className="text-center">
                    <Link href="/privacy" className="hover:underline">Privacy Policy</Link> | 
                    <Link href="/terms" className="hover:underline"> Terms of Service</Link>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
