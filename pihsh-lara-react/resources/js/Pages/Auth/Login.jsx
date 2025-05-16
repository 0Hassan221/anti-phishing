import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Logo from '@/Components/Logo';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <Navbar />
                <div className="flex items-center justify-center flex-grow px-4 py-16 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md p-8 transition-all duration-300 transform bg-white shadow-2xl rounded-xl hover:shadow-3xl">
                        {/* Logo Section */}
                        <div className="flex justify-center mb-8">
                            <Logo color='dark' size='medium'/>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="p-3 mb-6 text-sm font-medium text-center text-green-600 rounded-lg shadow-sm bg-green-50">
                                {status}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
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
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
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
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2 text-xs text-red-600" />
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 border-gray-300 rounded text-cyan-600 focus:ring-cyan-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">
                                    Remember me
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm underline transition-colors duration-200 rounded-md text-cyan-600 hover:text-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                                <PrimaryButton
                                    className={`ml-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-700 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition-all duration-300 ${
                                        processing ? 'opacity-60 cursor-not-allowed' : ''
                                    }`}
                                    disabled={processing}
                                >
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}