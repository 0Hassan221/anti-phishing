import { Link } from "@inertiajs/react";

const CTA = () => {
  return (
    <div className="bg-gray-100 text-black py-16 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Stay Safe with <span className="text-blue-600">AntiPhishing</span>
      </h2>
      <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
        Protect yourself from phishing attacks with our advanced security solutions.
        Join us today and scan your links instantly!
      </p>
      <Link
        href="/services"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-all"
      >
        Get Started Now
      </Link>
    </div>
  );
};

export default CTA;
