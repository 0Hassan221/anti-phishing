const Footer = () => {
    return (
        <footer className="bg-gray-700 text-white text-center py-4 text-sm">
            <div className="container flex flex-col lg:flex-row justify-between items-center lg:items-center px-4">
                <p className="mb-2 lg:mb-0">© 2025 UntiPhishing. All rights reserved.</p>
                
                <nav className="flex flex-wrap justify-center space-x-4 mb-4 lg:mb-0">
                    <a href="/" className="hover:underline">Home</a>
                    <a href="/about" className="hover:underline">About</a>
                    <a href="/services" className="hover:underline">Services</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                </nav>

                <p className="text-center">
                    <a href="/privacy" className="hover:underline">Privacy Policy</a> | 
                    <a href="/terms" className="hover:underline"> Terms of Service</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
