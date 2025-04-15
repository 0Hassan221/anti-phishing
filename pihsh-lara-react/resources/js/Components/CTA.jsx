import { Link } from "@inertiajs/react";

const CTA = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-100 py-16 px-6 text-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-80 h-80 bg-blue-400/10 rounded-full absolute -top-20 -left-20 blur-3xl animate-pulse"></div>
        <div className="w-96 h-96 bg-cyan-400/10 rounded-full absolute -bottom-20 -right-20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 animate-fadeInUp">
          Stay Secure with <span className="text-blue-600">AntiPhishing</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto animate-fadeInUp delay-200">
          Defend against phishing threats with cutting-edge security tools. Join now and scan your links in real-time!
        </p>
        <Link
          href="/services"
          className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 animate-fadeInUp delay-400"
        >
          Get Started Now
        </Link>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default CTA;