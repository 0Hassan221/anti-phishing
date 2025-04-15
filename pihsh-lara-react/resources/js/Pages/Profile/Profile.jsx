import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';

export default function Profile({ auth }) { // auth هو البيانات اللي بتيجي من Inertia
    const { props } = usePage(); // نجيب البيانات كلها من الصفحة
    const user = auth.user; // بيانات المستخدم من الـ auth

    // البيانات دي المفروض تيجي من الـ Backend، لكن لو مش موجودة هنستخدم افتراضي
    const [userData, setUserData] = useState({
        name: user.name || "Sarah Johnson",
        role: props.role || "Security Analyst",
        email: user.email || "s.johnson@cybersec.org",
        lastLogin: props.lastLogin || "2024-02-15 14:30 UTC",
        twoFactorEnabled: props.twoFactorEnabled || true,
        phishingStats: props.phishingStats || {
            detected: 42,
            reported: 35,
            trainingCompleted: 8,
            simulationsParticipated: 5,
            successRate: "85%"
        },
        recentActivity: props.recentActivity || [
            { date: "2024-02-15", action: "Password changed", location: "New York, US" },
            { date: "2024-02-14", action: "2FA enabled", location: "London, UK" }
        ],
        profilePhoto: props.profilePhoto || "assets/person.jpg"
    });

    const [startAnimations, setStartAnimations] = useState(false);

    useEffect(() => {
        setStartAnimations(true);
    }, []);

    const handlePhotoUpdate = () => {
        alert("Feature to update photo coming soon!");
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // بنجيب بيانات المستخدم من الـ auth
            header={
                <h2 className="text-xl font-semibold leading-tight text-blue-900">
                    Security Profile
                </h2>
            }
        >
            <Head title="Security Profile" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-blue-900 mb-2">Security Profile</h1>
                        <p className="text-gray-600">Account Overview & Security Settings</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-1 flex flex-col items-center">
                                <div className="relative mb-4">
                                    <img 
                                        src={userData.profilePhoto} 
                                        alt="Profile photo" 
                                        className="w-32 h-32 rounded-full border-4 border-blue-100 object-cover"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-6 h-6 border-2 border-white"></div>
                                </div>
                                <button 
                                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    onClick={handlePhotoUpdate}
                                >
                                    Update Photo
                                </button>
                                <h2 className="text-xl font-semibold text-gray-800 mt-3">{userData.name}</h2>
                                <p className="text-blue-600 text-sm">{userData.role}</p>
                            </div>

                            <div className="md:col-span-2 space-y-6">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        {startAnimations && (
                                            <CountUp
                                                end={userData.phishingStats.detected}
                                                duration={2.5}
                                                className="text-2xl font-bold text-blue-900"
                                            />
                                        )}
                                        <p className="text-xs text-gray-600">Phishing Detected</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        {startAnimations && (
                                            <CountUp
                                                end={userData.phishingStats.reported}
                                                duration={2.5}
                                                className="text-2xl font-bold text-blue-900"
                                            />
                                        )}
                                        <p className="text-xs text-gray-600">Cases Reported</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        {startAnimations && (
                                            <CountUp
                                                end={userData.phishingStats.simulationsParticipated}
                                                duration={2.5}
                                                className="text-2xl font-bold text-blue-900"
                                            />
                                        )}
                                        <p className="text-xs text-gray-600">Simulations Participated</p>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        {startAnimations && (
                                            <CountUp
                                                end={parseInt(userData.phishingStats.successRate)}
                                                duration={2.5}
                                                suffix="%"
                                                className="text-2xl font-bold text-blue-900"
                                            />
                                        )}
                                        <p className="text-xs text-gray-600">Simulation Success Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t p-6 bg-gray-50">
                            <h3 className="font-medium text-gray-800 mb-4">Recent Security Activity</h3>
                            <div className="space-y-3">
                                {userData.recentActivity.map((activity, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">{activity.action}</p>
                                            <p className="text-xs text-gray-500">{activity.date}</p>
                                        </div>
                                        <p className="text-xs text-gray-500">{activity.location}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="text-sm font-medium text-yellow-800 mb-2">Security Recommendations</h4>
                        <ul className="list-disc list-inside text-xs text-yellow-700 space-y-1">
                            <li>Change your password every 90 days</li>
                            <li>Never share your authentication codes</li>
                            <li>Verify suspicious emails through official channels</li>
                            <li>Participate in phishing simulations to improve awareness</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}