import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    UserGroupIcon,
    LinkIcon,
    DocumentTextIcon,
    BellIcon
} from '@heroicons/react/24/outline';

export default function AdminLayout({ children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { auth } = usePage().props;

    const navigation = [
        {
            name: 'Dashboard',
            href: route('admin.dashboard'),
            current: route().current('admin.dashboard'),
            icon: HomeIcon
        },
        {
            name: 'Users',
            href: route('admin.users.index'),
            current: route().current('admin.users.*'),
            icon: UserGroupIcon
        },
        {
            name: 'URL Scans',
            href: route('admin.scans.urls'),
            current: route().current('admin.scans.urls'),
            icon: LinkIcon
        },
        {
            name: 'Malware Scans',
            href: route('admin.scans.malware'),
            current: route().current('admin.scans.malware'),
            icon: DocumentTextIcon
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Top Navigation Bar */}
            <nav className="bg-gray-800 border-b border-gray-700">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex items-center space-x-2 shrink-0">
                                <Link href="/" className="flex items-center space-x-2 group">
                                    <div className="relative">
                                        <div className="absolute rounded-full -inset-2 bg-cyan-400/30 blur-lg" />
                                        <div className="relative bg-cyan-400 p-1.5 rounded-full">
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">
                                        Anti<span className="font-extrabold">Phishing</span>
                                    </span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        href={item.href}
                                        active={item.current}
                                        className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
                                    >
                                        <item.icon className="inline-block w-5 h-5 mr-2" />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="hidden space-x-4 sm:flex sm:items-center sm:ml-6">
                            {/* Notifications */}
                            <button className="p-2 text-gray-400 rounded-full hover:text-white hover:bg-gray-700">
                                <BellIcon className="w-6 h-6" />
                                <span className="sr-only">View notifications</span>
                            </button>

                            {/* User Menu */}
                            <div className="relative ml-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-300 transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:text-white hover:bg-gray-700 focus:outline-none"
                                            >
                                                <img
                                                    className="w-8 h-8 rounded-full"
                                                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth?.user?.name || 'Guest')}&background=0D8ABC&color=fff`}
                                                    alt=""
                                                />
                                                <span className="ml-2">{auth?.user?.name || 'Guest'}</span>

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('dashboard')} className="text-gray-300 hover:bg-gray-700">
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="text-gray-300 hover:bg-gray-700">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center -mr-2 sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                            >
                                {showingNavigationDropdown ? (
                                    <XMarkIcon className="w-6 h-6" />
                                ) : (
                                    <Bars3Icon className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <ResponsiveNavLink
                                key={item.name}
                                href={item.href}
                                active={item.current}
                                className="block px-3 py-2 text-base font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
                            >
                                <item.icon className="inline-block w-5 h-5 mr-2" />
                                {item.name}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="px-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth?.user?.name || 'Guest')}&background=0D8ABC&color=fff`}
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">
                                        {auth?.user?.name || 'Guest'}
                                    </div>
                                    <div className="text-sm font-medium text-gray-400">
                                        {auth?.user?.email || ''}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-gray-300 hover:text-white hover:bg-gray-700">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-gray-300 hover:text-white hover:bg-gray-700">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
} 