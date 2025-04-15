import { Link } from 'react-router-dom';

function Header() {
    console.log('header rendered')
    return (
        <>
            <div id='header' className="mx-auto lg:w-[85%] lg:h-auto sm:h-auto">
                <div className="header h-screen container mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12 py-10">
                    {/* Image Section - Appears first on small screens, second on larger screens */}
                    <div className="flex justify-center md:justify-end order-first md:order-last">
                        <img
                            src="/assets/header1.webp"
                            alt="header1"
                            className="max-w-full h-auto rounded-lg object-cover"
                        />
                    </div>

                    {/* Text Section - Appears second on small screens, first on larger screens */}
                    <div className="header-info text-center md:text-left flex flex-col items-center md:items-start order-last md:order-first">
                        <p className="text-4xl sm:text-5xl md:text-6xl font-bold">
                            Stay Safe...<br />
                            <span className="text-blue-600">Stay Here...</span>
                        </p>
                        
                        {/* Updated Link with navigation */}
                        <Link
                            to="/login" // Navigate to the login page
                            className="inline-flex mt-6 items-center justify-center gap-2 py-3 px-16 font-semibold text-white bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl shadow-lg hover:from-blue-800 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-400 dark:from-blue-600 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-blue-400 dark:focus:ring-blue-700 transition-all duration-300 transform hover:scale-105 text-2xl lg:text-xl md:text-lg"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 10a7 7 0 1114 0A7 7 0 013 10zm7-5a5 5 0 100 10A5 5 0 0010 5zm1 7a1 1 0 11-2 0 1 1 0 012 0zm-1-4a1 1 0 00-1 1v2a1 1 0 102 0V9a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Login Now
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
