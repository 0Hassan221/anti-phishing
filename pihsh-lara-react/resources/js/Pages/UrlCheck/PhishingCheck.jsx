import { useState } from "react";
import Navbar from "D:/antiphishing platform/Anti_phishing_platform/pihsh-lara-react/resources/js/Components/Navbar.jsx";
import Footer from "D:/antiphishing platform/Anti_phishing_platform/pihsh-lara-react/resources/js/Components/Footer.jsx";

const PhishingCheck = () => {
    const [inputValue, setInputValue] = useState(""); // The value of the entered URL or email
    const [result, setResult] = useState(""); // The result after checking
    const [loading, setLoading] = useState(false); // If the request is in progress
    const [error, setError] = useState(""); // For error handling

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(""); // Reset the result
        setError(""); // Reset the error

        try {
            // Replace this with your actual API endpoint
            const response = await fetch("/api/phishing-check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input: inputValue }),
            });

            if (!response.ok) {
                throw new Error("Failed to check the URL/email. Please try again later.");
            }

            const data = await response.json();
            setResult(data.isPhishing ? "Phishing detected!" : "Safe!");
        } catch (error) {
            setError("Error: " + error.message); // Handle errors
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <section
                id="phishing-check"
                className="bg-gray-100 py-20 px-6 h-screen flex items-center justify-center"
            >
                <div className="max-w-4xl mx-auto text-center w-full sm:w-11/12 md:w-8/12 lg:w-1/2">
                    <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-8">
                        Phishing Detection Tool
                    </h2>
                    <p className="text-lg text-gray-600 mb-12">
                        Enter a URL or email address to check if it is safe or potentially phishing.
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-8 rounded-xl shadow-2xl transform transition-all hover:shadow-3xl"
                    >
                        <div className="mb-6 flex flex-col sm:flex-row items-center">
                            <label
                                htmlFor="url-or-email"
                                className="block text-lg font-semibold text-gray-700 mb-2 sm:mb-0 sm:mr-4"
                            >
                                Enter URL or Email:
                            </label>
                            <div className="flex w-full bg-gray-50 rounded-lg overflow-hidden">
                                <input
                                    type="text"
                                    id="url-or-email"
                                    value={inputValue}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                                    placeholder="https://example.com or user@example.com"
                                />
                                <button
                                    type="submit"
                                    className="py-4 px-6 bg-blue-900 text-white font-semibold rounded-r-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-105"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin h-6 w-6 mr-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Checking...
                                        </div>
                                    ) : (
                                        "Check Now"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Display Result */}
                    {result && (
                        <div
                            className={`mt-8 p-6 rounded-lg text-2xl font-semibold ${
                                result.includes("Phishing")
                                    ? "bg-red-50 text-red-600"
                                    : "bg-green-50 text-green-600"
                            }`}
                        >
                            {result}
                        </div>
                    )}

                    {/* Error Handling */}
                    {error && (
                        <div className="mt-8 p-6 bg-red-50 rounded-lg text-xl font-semibold text-red-600">
                            {error}
                        </div>
                    )}
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default PhishingCheck;
