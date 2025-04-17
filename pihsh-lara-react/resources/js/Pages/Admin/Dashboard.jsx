import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { 
    ShieldCheckIcon, 
    ShieldExclamationIcon, 
    UserGroupIcon, 
    LinkIcon,
    DocumentTextIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const StatCard = ({ title, value, icon: Icon, trend, trendValue, trendType }) => (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-cyan-500 transition-colors duration-300">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-400">{title}</p>
                <p className="text-2xl font-semibold text-white mt-1">{value}</p>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-full">
                <Icon className="h-6 w-6 text-cyan-400" />
            </div>
        </div>
        {trend && (
            <div className="mt-4 flex items-center">
                {trendType === 'up' ? (
                    <ArrowTrendingUpIcon className="h-5 w-5 text-green-400" />
                ) : (
                    <ArrowTrendingDownIcon className="h-5 w-5 text-red-400" />
                )}
                <span className={`ml-2 text-sm font-medium ${trendType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {trendValue}% from last month
                </span>
            </div>
        )}
    </div>
);

export default function Dashboard({ 
    totalUsers, 
    totalUrlScans, 
    totalMalwareScans, 
    maliciousUrlScans, 
    maliciousMalwareScans,
    recentUrlScans,
    recentMalwareScans,
    scanTrends
}) {
    const urlScanData = {
        labels: ['Safe', 'Suspicious', 'Malicious'],
        datasets: [
            {
                data: [
                    totalUrlScans - maliciousUrlScans,
                    Math.floor(maliciousUrlScans * 0.3),
                    Math.floor(maliciousUrlScans * 0.7)
                ],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(234, 179, 8, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(234, 179, 8, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const malwareScanData = {
        labels: ['Clean', 'Infected'],
        datasets: [
            {
                data: [
                    totalMalwareScans - maliciousMalwareScans,
                    maliciousMalwareScans
                ],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                borderColor: [
                    'rgba(34, 197, 94, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const scanTrendData = {
        labels: scanTrends.map(trend => trend.date),
        datasets: [
            {
                label: 'URL Scans',
                data: scanTrends.map(trend => trend.url_scans),
                borderColor: 'rgb(34, 211, 238)',
                backgroundColor: 'rgba(34, 211, 238, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Malware Scans',
                data: scanTrends.map(trend => trend.malware_scans),
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'rgba(16, 185, 129, 0.5)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#9CA3AF',
                    font: {
                        size: 12
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                },
                ticks: {
                    color: '#9CA3AF'
                }
            },
            x: {
                grid: {
                    color: 'rgba(75, 85, 99, 0.2)'
                },
                ticks: {
                    color: '#9CA3AF'
                }
            }
        }
    };

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 overflow-hidden shadow-xl sm:rounded-xl border border-gray-700">
                        <div className="p-6 text-gray-300">
                            <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
                            
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <StatCard 
                                    title="Total Users" 
                                    value={totalUsers} 
                                    icon={UserGroupIcon}
                                    trend={true}
                                    trendValue={12}
                                    trendType="up"
                                />
                                <StatCard 
                                    title="URL Scans" 
                                    value={totalUrlScans} 
                                    icon={LinkIcon}
                                    trend={true}
                                    trendValue={8}
                                    trendType="up"
                                />
                                <StatCard 
                                    title="Malware Scans" 
                                    value={totalMalwareScans} 
                                    icon={DocumentTextIcon}
                                    trend={true}
                                    trendValue={5}
                                    trendType="up"
                                />
                                <StatCard 
                                    title="Threats Detected" 
                                    value={maliciousUrlScans + maliciousMalwareScans} 
                                    icon={ShieldExclamationIcon}
                                    trend={true}
                                    trendValue={-3}
                                    trendType="down"
                                />
                            </div>

                            {/* Charts Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                                    <h3 className="text-lg font-medium text-white mb-4">URL Scan Distribution</h3>
                                    <div className="h-64">
                                        <Doughnut 
                                            data={urlScanData}
                                            options={chartOptions}
                                        />
                                    </div>
                                </div>
                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                                    <h3 className="text-lg font-medium text-white mb-4">Malware Scan Results</h3>
                                    <div className="h-64">
                                        <Doughnut 
                                            data={malwareScanData}
                                            options={chartOptions}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Scan Trends */}
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
                                <h3 className="text-lg font-medium text-white mb-4">Scan Trends</h3>
                                <div className="h-80">
                                    <Line 
                                        data={scanTrendData}
                                        options={chartOptions}
                                    />
                                </div>
                            </div>

                            {/* Recent Scans */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                                    <h3 className="text-lg font-medium text-white mb-4">Recent URL Scans</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead className="bg-gray-700/50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">URL</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                                {recentUrlScans.map((scan) => (
                                                    <tr key={scan.id} className="hover:bg-gray-700/50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            {scan.url}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                scan.is_malicious 
                                                                    ? 'bg-red-900/50 text-red-300' 
                                                                    : 'bg-green-900/50 text-green-300'
                                                            }`}>
                                                                {scan.is_malicious ? 'Malicious' : 'Safe'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                            {new Date(scan.created_at).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                                    <h3 className="text-lg font-medium text-white mb-4">Recent Malware Scans</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-700">
                                            <thead className="bg-gray-700/50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">File</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                                {recentMalwareScans.map((scan) => (
                                                    <tr key={scan.id} className="hover:bg-gray-700/50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                            {scan.filename}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                scan.is_malicious 
                                                                    ? 'bg-red-900/50 text-red-300' 
                                                                    : 'bg-green-900/50 text-green-300'
                                                            }`}>
                                                                {scan.is_malicious ? 'Infected' : 'Clean'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                                            {new Date(scan.created_at).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
} 