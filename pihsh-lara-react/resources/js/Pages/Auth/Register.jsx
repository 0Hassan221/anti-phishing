import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useState } from 'react';
import Logo from '@/Components/Logo';

export default function Register() {
    const [agreedToTerms, setAgreedToTerms] = useState(false); // State لتتبع موافقة المستخدم

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            alert("Please agree to the Terms of Use before registering.");
            return;
        }
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="flex flex-col min-h-screen pt-10 bg-gradient-to-b from-gray-50 to-gray-100">
                <Navbar />
                <div className="flex items-center justify-center flex-grow px-4 py-16 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md p-8 transition-all duration-300 transform bg-white shadow-2xl rounded-xl hover:shadow-3xl">
                        {/* Logo Section */}
                        <div className="flex justify-center mb-8">
                            <Logo color='dark'/>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Name"
                                    className="font-medium text-gray-800"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="block w-full mt-2 text-gray-900 transition-all duration-300 border-gray-200 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2 text-xs text-red-600" />
                            </div>

                            {/* Email Field */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="font-medium text-gray-800"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full mt-2 text-gray-900 transition-all duration-300 border-gray-200 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2 text-xs text-red-600" />
                            </div>

                            {/* Password Field */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="font-medium text-gray-800"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full mt-2 text-gray-900 transition-all duration-300 border-gray-200 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2 text-xs text-red-600" />
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className="font-medium text-gray-800"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="block w-full mt-2 text-gray-900 transition-all duration-300 border-gray-200 rounded-lg shadow-sm bg-gray-50 focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2 text-xs text-red-600" />
                            </div>

                            {/* Terms of Use Checkbox */}
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    className="w-5 h-5 mt-1 transition-all duration-200 border-gray-300 rounded text-cyan-600 focus:ring-cyan-500"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-700">
                                    I agree to the{" "}
                                    <Link
                                        href="/terms-of-use"
                                        className="font-medium underline transition-colors duration-200 text-cyan-600 hover:text-cyan-800"
                                    >
                                        Terms of Use
                                    </Link>
                                    . By registering, I confirm that I have read and understood the terms governing the use of AntiPhishing services.
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                <Link
                                    href={route('login')}
                                    className="text-sm underline transition-colors duration-200 rounded-md text-cyan-600 hover:text-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                                >
                                    Already registered?
                                </Link>
                                <PrimaryButton
                                    className={`ml-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all duration-300 ${
                                        processing || !agreedToTerms ? 'opacity-60 cursor-not-allowed' : ''
                                    }`}
                                    disabled={processing || !agreedToTerms} // Disable إذا مفيش موافقة
                                >
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}