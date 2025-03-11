import { useForm } from "@inertiajs/react";
import { useState } from "react";

const ContactUs = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/contact", {
            onSuccess: () => alert("Message sent successfully!"),
        });
    };

    return (
        <div id="contact" className="bg-white text-black py-16 px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Have questions or need support? Reach out to us and we’ll get back to you as soon as possible!
            </p>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="mb-4 text-left">
                    <label className="block text-lg font-medium mb-2">Your Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4 text-left">
                    <label className="block text-lg font-medium mb-2">Your Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-6 text-left">
                    <label className="block text-lg font-medium mb-2">Message</label>
                    <textarea
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Write your message..."
                        value={data.message}
                        onChange={(e) => setData("message", e.target.value)}
                        required
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-all disabled:opacity-50"
                    disabled={processing}
                >
                    {processing ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
