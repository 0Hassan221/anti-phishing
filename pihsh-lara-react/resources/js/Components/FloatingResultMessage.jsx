import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '@/stores';

const FloatingResultMessage = () => {
    const { notifications, removeNotification } = useUiStore();

    // Filter for scan result notifications
    const scanResultNotifications = notifications.filter(
        notification => notification.category === 'scan-result'
    );

    // Auto-remove scan result notifications after 8 seconds (longer for scan results)
    useEffect(() => {
        scanResultNotifications.forEach(notification => {
            if (!notification.persistent) {
                const timer = setTimeout(() => {
                    removeNotification(notification.id);
                }, 8000);

                return () => clearTimeout(timer);
            }
        });
    }, [scanResultNotifications, removeNotification]);

    const getScanResultStyles = (status) => {
        switch (status) {
            case 'safe':
                return {
                    bg: 'bg-gradient-to-r from-green-900/95 to-green-800/95',
                    border: 'border-green-500/60',
                    text: 'text-green-100',
                    accent: 'text-green-300',
                    glow: 'shadow-green-500/20',
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    statusText: 'SAFE',
                    statusIcon: '🛡️'
                };
            case 'warning':
                return {
                    bg: 'bg-gradient-to-r from-yellow-900/95 to-orange-900/95',
                    border: 'border-yellow-500/60',
                    text: 'text-yellow-100',
                    accent: 'text-yellow-300',
                    glow: 'shadow-yellow-500/20',
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    statusText: 'SUSPICIOUS',
                    statusIcon: '⚠️'
                };
            case 'unsafe':
                return {
                    bg: 'bg-gradient-to-r from-red-900/95 to-red-800/95',
                    border: 'border-red-500/60',
                    text: 'text-red-100',
                    accent: 'text-red-300',
                    glow: 'shadow-red-500/20',
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    statusText: 'MALICIOUS',
                    statusIcon: '🚨'
                };
            default:
                return {
                    bg: 'bg-gradient-to-r from-gray-900/95 to-gray-800/95',
                    border: 'border-gray-500/60',
                    text: 'text-gray-100',
                    accent: 'text-gray-300',
                    glow: 'shadow-gray-500/20',
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    statusText: 'UNKNOWN',
                    statusIcon: '❓'
                };
        }
    };

    return (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 space-y-3 max-w-md w-full px-4">
            <AnimatePresence>
                {scanResultNotifications.map((notification) => {
                    const styles = getScanResultStyles(notification.scanStatus);
                    
                    return (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, y: -50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.9 }}
                            transition={{ 
                                duration: 0.5, 
                                ease: 'easeOut',
                                type: 'spring',
                                stiffness: 300,
                                damping: 30
                            }}
                            className={`${styles.bg} ${styles.border} ${styles.glow} border-2 backdrop-blur-md rounded-xl shadow-2xl p-6 relative overflow-hidden`}
                        >
                            {/* Animated background pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                                />
                            </div>

                            {/* Progress bar for auto-dismiss */}
                            {!notification.persistent && (
                                <motion.div
                                    initial={{ width: '100%' }}
                                    animate={{ width: '0%' }}
                                    transition={{ duration: 8, ease: 'linear' }}
                                    className={`absolute bottom-0 left-0 h-1 ${styles.accent} opacity-60`}
                                />
                            )}
                            
                            <div className="relative z-10">
                                {/* Header with status */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className={`${styles.accent} text-2xl`}>
                                            {styles.statusIcon}
                                        </div>
                                        <div>
                                            <div className={`text-xs font-bold tracking-wider ${styles.accent} opacity-80`}>
                                                SCAN RESULT
                                            </div>
                                            <div className={`text-lg font-bold ${styles.accent}`}>
                                                {styles.statusText}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={() => removeNotification(notification.id)}
                                        className={`${styles.text} opacity-60 hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Main content */}
                                <div className="space-y-3">
                                    {notification.title && (
                                        <h3 className={`text-lg font-semibold ${styles.text}`}>
                                            {notification.title}
                                        </h3>
                                    )}
                                    
                                    <p className={`text-sm leading-relaxed ${styles.text}`}>
                                        {notification.message}
                                    </p>

                                    {/* URL display */}
                                    {notification.url && (
                                        <div className="mt-3 p-3 bg-black/20 rounded-lg border border-white/10">
                                            <div className="text-xs font-medium text-white/60 mb-1">SCANNED URL</div>
                                            <div className={`text-sm font-mono ${styles.accent} break-all`}>
                                                {notification.url}
                                            </div>
                                        </div>
                                    )}

                                    {/* Additional details */}
                                    {notification.details && (
                                        <div className="flex items-center justify-between text-xs">
                                            {notification.scanTime && (
                                                <span className={`${styles.text} opacity-75`}>
                                                    Scan time: {notification.scanTime}s
                                                </span>
                                            )}
                                            {notification.fromCache && (
                                                <span className={`${styles.accent} bg-white/10 px-2 py-1 rounded-full`}>
                                                    From cache
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Action buttons */}
                                {notification.actions && (
                                    <div className="flex space-x-2 mt-4">
                                        {notification.actions.map((action, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    action.onClick();
                                                    removeNotification(notification.id);
                                                }}
                                                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                                                    action.primary 
                                                        ? `${styles.accent} bg-white/20 hover:bg-white/30` 
                                                        : `${styles.text} bg-white/10 hover:bg-white/20`
                                                }`}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default FloatingResultMessage;
