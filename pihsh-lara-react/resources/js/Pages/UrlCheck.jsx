import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function UrlCheck() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [scanData, setScanData] = useState(null);
    const [fromCache, setFromCache] = useState(false);
    const [generatingReport, setGeneratingReport] = useState(false);
    const [scanTime, setScanTime] = useState(null);
    const [jobId, setJobId] = useState(null);
    const [progress, setProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const urlInputRef = useRef(null);
    const statusCheckIntervalRef = useRef(null);

    // Clear interval on unmount
    useEffect(() => {
        return () => {
            if (statusCheckIntervalRef.current) {
                clearInterval(statusCheckIntervalRef.current);
            }
        };
    }, []);

    const handleUrlCheck = async () => {
        if (!url.trim()) {
            setResult({ status: 'error', message: 'Please enter a valid URL to scan.' });
            return;
        }

        setLoading(true);
        setResult(null);
        setScanData(null);
        setFromCache(false);
        setProgress(0);
        setStatusMessage('');
        
        // Clear any existing interval
        if (statusCheckIntervalRef.current) {
            clearInterval(statusCheckIntervalRef.current);
            statusCheckIntervalRef.current = null;
        }
        
        const startTime = performance.now();

        try {
            const response = await axios.post('/url-scan', { url });
            
            if (response.data.success) {
                // If the results are immediately available (from cache)
                if (response.data.completed) {
                    const endTime = performance.now();
                    const timeElapsed = ((endTime - startTime) / 1000).toFixed(2);
                    setScanTime(timeElapsed);
                    
                    const scanResults = response.data.results;
                    setScanData(scanResults);
                    setFromCache(response.data.fromCache || false);
                    
                    // Determine if URL is safe based on scan results
                    handleScanResults(scanResults);
                    setLoading(false);
                } else {
                    // Job was queued, start polling for status
                    setJobId(response.data.jobId);
                    setStatusMessage('Analysis queued, starting soon...');
                    setProgress(5);
                    
                    // Start polling for job status
                    statusCheckIntervalRef.current = setInterval(() => {
                        checkJobStatus(response.data.jobId, startTime);
                    }, 2000); // Check every 2 seconds
                }
            } else {
                setResult({
                    status: 'error',
                    message: response.data.message || 'Failed to scan URL. Please try again later.'
                });
                setLoading(false);
            }
        } catch (error) {
            console.error('URL scan error:', error);
            
            if (error.response?.status === 429) {
                // Rate limit error
                setResult({
                    status: 'error',
                    message: 'Rate limit exceeded. Please try again in a few moments.'
                });
            } else {
                setResult({
                    status: 'error',
                    message: error.response?.data?.message || 'An error occurred while scanning the URL.'
                });
            }
            setLoading(false);
        }
    };
    
    const checkJobStatus = async (jobId, startTime) => {
        try {
            const response = await axios.post('/url-status', { jobId });
            
            if (response.data.success) {
                const status = response.data.status;
                
                // Update progress
                setProgress(status.progress || 0);
                setStatusMessage(status.message || 'Processing...');
                
                if (response.data.completed) {
                    // Stop polling
                    if (statusCheckIntervalRef.current) {
                        clearInterval(statusCheckIntervalRef.current);
                        statusCheckIntervalRef.current = null;
                    }
                    
                    const endTime = performance.now();
                    const timeElapsed = ((endTime - startTime) / 1000).toFixed(2);
                    setScanTime(timeElapsed);
                    
                    // Handle completed status
                    if (status.status === 'completed') {
                        setFromCache(status.fromCache || false);
                        setScanData(status.results);
                        handleScanResults(status.results);
                    } else {
                        // Failed
                        setResult({
                            status: 'error',
                            message: status.message || 'Scan failed. Please try again.'
                        });
                    }
                    
                    setLoading(false);
                }
            } else {
                // Error getting status
                if (statusCheckIntervalRef.current) {
                    clearInterval(statusCheckIntervalRef.current);
                    statusCheckIntervalRef.current = null;
                }
                
                setResult({
                    status: 'error',
                    message: 'Failed to get scan status. Please try again.'
                });
                setLoading(false);
            }
        } catch (error) {
            console.error('Status check error:', error);
            
            // Stop polling on error
            if (statusCheckIntervalRef.current) {
                clearInterval(statusCheckIntervalRef.current);
                statusCheckIntervalRef.current = null;
            }
            
            setResult({
                status: 'error',
                message: 'Failed to check scan status. Please try again.'
            });
            setLoading(false);
        }
    };
    
    const handleScanResults = (scanResults) => {
        const maliciousEngines = scanResults.stats.malicious || 0;
        const suspiciousEngines = scanResults.stats.suspicious || 0;
        const totalEngines = scanResults.stats.total_engines || 0;
        
        if (maliciousEngines > 0) {
            setResult({
                status: 'unsafe',
                message: `Alert: Potential phishing threat detected! ${maliciousEngines} security vendors flagged this URL as malicious.`,
                details: {
                    threatLevel: scanResults.threat_level,
                    reputation: scanResults.reputation,
                    categories: scanResults.categories,
                    engineResults: scanResults.engine_results,
                    lastAnalysisDate: scanResults.last_analysis_date,
                    stats: scanResults.stats
                }
            });
        } else if (suspiciousEngines > 0) {
            setResult({
                status: 'warning',
                message: `Caution: ${suspiciousEngines} security vendors flagged this URL as suspicious.`,
                details: {
                    threatLevel: scanResults.threat_level,
                    reputation: scanResults.reputation,
                    categories: scanResults.categories,
                    engineResults: scanResults.engine_results,
                    lastAnalysisDate: scanResults.last_analysis_date,
                    stats: scanResults.stats
                }
            });
        } else {
            setResult({
                status: 'safe',
                message: `This URL appears to be safe. No security vendors flagged this URL out of ${totalEngines} checked.`,
                details: {
                    threatLevel: scanResults.threat_level,
                    reputation: scanResults.reputation,
                    categories: scanResults.categories,
                    engineResults: scanResults.engine_results,
                    lastAnalysisDate: scanResults.last_analysis_date,
                    stats: scanResults.stats
                }
            });
        }
    };
    
    const handleGenerateReport = async () => {
        if (!url.trim() || !scanData) return;
        
        setGeneratingReport(true);
        
        try {
            // Direct approach - open report URL in a new window/tab
            // This is more reliable than form submission for file downloads
            window.open(`/url-report?url=${encodeURIComponent(url)}`, '_blank');
            
            // Set timeout to reset the generating state
            setTimeout(() => {
                setGeneratingReport(false);
            }, 1000);
            
        } catch (error) {
            console.error('Report generation error:', error);
            alert('An error occurred while generating the report.');
            setGeneratingReport(false);
        }
    };
    
    // Handle keyboard shortcut (Ctrl+Enter) to scan
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                handleUrlCheck();
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [url]); // Re-add event listener if url changes

    // Animation Variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const resultVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Head title="URL Scanner - AntiPhishing Command" />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="pt-20 pb-16 min-h-screen bg-gradient-to-br from-gray-900 via-cyan-950 to-blue-900 flex items-center justify-center relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="w-96 h-96 bg-cyan-500/10 rounded-full absolute top-0 left-0 blur-3xl animate-pulse"></div>
                    <div className="w-80 h-80 bg-blue-500/10 rounded-full absolute bottom-0 right-0 blur-3xl animate-pulse delay-1000"></div>
                </div>

                <motion.div
                    className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                >
                    <div className="bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-2xl border border-cyan-500/30 p-8">
                        {/* Top Accent Bar */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-600 to-blue-900" />

                        {/* Header */}
                        <div className="flex items-center space-x-6 mb-8">
                            <svg
                                className="w-14 h-14 text-cyan-400"
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
                            <h1 className="text-4xl font-extrabold text-white tracking-tight">
                                URL Scanner
                            </h1>
                        </div>

                        {/* Description */}
                        <p className="mt-4 text-lg text-cyan-200 leading-relaxed max-w-prose font-mono">
                            Deploy our state-of-the-art scanner powered by VirusTotal to analyze URLs and neutralize phishing threats in real-time. Enter a link below to secure your digital perimeter.
                        </p>

                        {/* Input and Button */}
                        <div className="mt-10 space-y-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="https://example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="w-full p-5 text-white bg-gray-700/50 border border-cyan-500/50 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent transition-all duration-300 placeholder-cyan-400/70 disabled:bg-gray-600/50 disabled:cursor-not-allowed"
                                    disabled={loading}
                                    ref={urlInputRef}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleUrlCheck();
                                        }
                                    }}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-cyan-400/70">
                                    Ctrl+Enter to scan
                                </div>
                            </div>
                            
                            {/* Progress bar for background job */}
                            {loading && (
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div 
                                        className="bg-cyan-600 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                    {statusMessage && (
                                        <p className="text-sm text-cyan-400 mt-1">{statusMessage}</p>
                                    )}
                                </div>
                            )}
                            
                            <button
                                onClick={handleUrlCheck}
                                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed relative overflow-hidden"
                                disabled={loading}
                            >
                                <span className="relative z-10">
                                    {loading ? 'Scanning...' : 'Scan URL'}
                                </span>
                                {loading && (
                                    <div className="absolute inset-0 bg-cyan-500/20 animate-[scan_1.5s_infinite]" />
                                )}
                                <style>{`
                                    @keyframes scan {
                                        0% { transform: translateX(-100%); }
                                        100% { transform: translateX(100%); }
                                    }
                                `}</style>
                            </button>
                        </div>

                        {/* Result Display */}
                        {result && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={resultVariants}
                                className={`mt-8 p-6 rounded-xl border shadow-md ${
                                    result.status === 'safe'
                                        ? 'bg-green-900/30 border-green-500/50'
                                        : result.status === 'unsafe'
                                        ? 'bg-red-900/30 border-red-500/50'
                                        : result.status === 'warning' 
                                        ? 'bg-yellow-900/30 border-yellow-500/50'
                                        : 'bg-gray-700/30 border-gray-500/50'
                                }`}
                            >
                                <div className="flex items-center space-x-4">
                                    <svg
                                        className={`w-8 h-8 ${
                                            result.status === 'safe'
                                                ? 'text-green-400'
                                                : result.status === 'unsafe'
                                                ? 'text-red-400'
                                                : result.status === 'warning'
                                                ? 'text-yellow-400'
                                                : 'text-gray-400'
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={
                                                result.status === 'safe'
                                                    ? 'M5 13l4 4L19 7'
                                                    : result.status === 'unsafe'
                                                    ? 'M6 18L18 6M6 6l12 12'
                                                    : 'M12 9v3m0 3h.01'
                                            }
                                        />
                                    </svg>
                                    <div>
                                        <p
                                            className={`text-lg font-semibold ${
                                                result.status === 'safe'
                                                    ? 'text-green-300'
                                                    : result.status === 'unsafe'
                                                    ? 'text-red-300'
                                                    : result.status === 'warning'
                                                    ? 'text-yellow-300'
                                                    : 'text-gray-300'
                                            }`}
                                        >
                                            {result.message}
                                        </p>
                                        <div className="flex items-center mt-2 space-x-3">
                                            {scanTime && (
                                                <span className="text-sm text-cyan-300">
                                                    Scan completed in {scanTime}s
                                                </span>
                                            )}
                                            {fromCache && (
                                                <span className="text-sm bg-cyan-900/50 text-cyan-300 px-2 py-0.5 rounded-full">
                                                    From cache
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Scan Results */}
                                {result.details && (
                                    <div className="mt-6 space-y-6">
                                        {/* Basic Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Threat Level</h3>
                                                <p className="text-xl font-bold capitalize">{result.details.threatLevel}</p>
                                            </div>
                                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Reputation Score</h3>
                                                <p className="text-xl font-bold">{result.details.reputation}</p>
                                            </div>
                                        </div>

                                        {/* Categories */}
                                        {result.details.categories && Object.keys(result.details.categories).length > 0 && (
                                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Categories</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {Object.entries(result.details.categories).map(([category, value]) => (
                                                        <span
                                                            key={category}
                                                            className="px-3 py-1 bg-cyan-900/50 text-cyan-300 rounded-full text-sm"
                                                        >
                                                            {category}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Scan Statistics */}
                                        <div className="bg-gray-800/50 p-4 rounded-lg">
                                            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Scan Statistics</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold">{result.details.stats.total_engines}</p>
                                                    <p className="text-sm text-gray-400">Total Engines</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-red-400">{result.details.stats.malicious}</p>
                                                    <p className="text-sm text-gray-400">Malicious</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-yellow-400">{result.details.stats.suspicious}</p>
                                                    <p className="text-sm text-gray-400">Suspicious</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-green-400">{result.details.stats.harmless}</p>
                                                    <p className="text-sm text-gray-400">Harmless</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold">{result.details.stats.undetected}</p>
                                                    <p className="text-sm text-gray-400">Undetected</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold">{result.details.stats.timeout}</p>
                                                    <p className="text-sm text-gray-400">Timeout</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Engine Results */}
                                        {result.details.engineResults && Object.keys(result.details.engineResults).length > 0 && (
                                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                                <h3 className="text-lg font-semibold text-cyan-300 mb-4">Detailed Engine Results</h3>
                                                <div className="space-y-3">
                                                    {Object.entries(result.details.engineResults).map(([engine, data]) => (
                                                        <div
                                                            key={engine}
                                                            className={`p-4 rounded-lg ${
                                                                data.category === 'malicious'
                                                                    ? 'bg-red-900/30 border border-red-500/50'
                                                                    : data.category === 'suspicious'
                                                                    ? 'bg-yellow-900/30 border border-yellow-500/50'
                                                                    : 'bg-green-900/30 border border-green-500/50'
                                                            }`}
                                                        >
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="font-medium text-lg">{engine}</span>
                                                                <span className={`px-3 py-1 rounded-full text-sm ${
                                                                    data.category === 'malicious'
                                                                        ? 'bg-red-900 text-red-300'
                                                                        : data.category === 'suspicious'
                                                                        ? 'bg-yellow-900 text-yellow-300'
                                                                        : 'bg-green-900 text-green-300'
                                                                }`}>
                                                                    {data.category}
                                                                </span>
                                                            </div>
                                                            {data.result && (
                                                                <p className="text-gray-300">
                                                                    <span className="text-cyan-300">Result:</span> {data.result}
                                                                </p>
                                                            )}
                                                            {data.method && (
                                                                <p className="text-gray-300">
                                                                    <span className="text-cyan-300">Method:</span> {data.method}
                                                                </p>
                                                            )}
                                                            {data.engine_version && (
                                                                <p className="text-gray-300">
                                                                    <span className="text-cyan-300">Engine Version:</span> {data.engine_version}
                                                                </p>
                                                            )}
                                                            {data.engine_update && (
                                                                <p className="text-gray-300">
                                                                    <span className="text-cyan-300">Last Update:</span> {data.engine_update}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Last Analysis */}
                                        {result.details.lastAnalysisDate && (
                                            <div className="bg-gray-800/50 p-4 rounded-lg">
                                                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Last Analysis</h3>
                                                <p className="text-gray-300">
                                                    {new Date(result.details.lastAnalysisDate).toLocaleString()}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Generate Report Button */}
                                {scanData && (
                                    <div className="mt-6 flex justify-center">
                                        <button
                                            onClick={handleGenerateReport}
                                            disabled={generatingReport}
                                            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors flex items-center space-x-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <span>{generatingReport ? 'Generating...' : 'Generate Report'}</span>
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Scan Details */}
                        {scanData && (
                            <motion.div
                                className="mt-8 p-6 rounded-xl border border-cyan-500/30 bg-gray-800/50 shadow-md"
                                initial="hidden"
                                animate="visible"
                                variants={resultVariants}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-cyan-300">Scan Details</h2>
                                    <button
                                        onClick={handleGenerateReport}
                                        disabled={generatingReport}
                                        className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 disabled:bg-gray-600 disabled:cursor-not-allowed"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span>{generatingReport ? 'Generating...' : 'Generate Report'}</span>
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-700/30 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-white mb-2">Stats</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-green-300">Harmless:</span>
                                                <span className="font-mono">{scanData.stats.harmless || 0}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-yellow-300">Suspicious:</span>
                                                <span className="font-mono">{scanData.stats.suspicious || 0}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-red-300">Malicious:</span>
                                                <span className="font-mono">{scanData.stats.malicious || 0}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-300">Undetected:</span>
                                                <span className="font-mono">{scanData.stats.undetected || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-700/30 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-white mb-2">Analysis Info</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-cyan-300">Status:</span>
                                                <span className="font-mono capitalize">{scanData.status}</span>
                                            </div>
                                            {scanData.scanned_at && (
                                                <div className="flex justify-between">
                                                    <span className="text-cyan-300">Scanned:</span>
                                                    <span className="font-mono">{new Date(scanData.scanned_at).toLocaleString()}</span>
                                                </div>
                                            )}
                                            {scanData.meta && scanData.meta.url && (
                                                <div className="flex justify-between">
                                                    <span className="text-cyan-300">URL:</span>
                                                    <span className="font-mono truncate max-w-[180px]">{scanData.meta.url}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {scanData.meta && scanData.meta.scan_id && (
                                    <div className="mt-4 text-xs text-gray-400">
                                        Scan ID: {scanData.meta.scan_id}
                                    </div>
                                )}
                                
                                {jobId && (
                                    <div className="mt-2 text-xs text-gray-400">
                                        Job ID: {jobId}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}