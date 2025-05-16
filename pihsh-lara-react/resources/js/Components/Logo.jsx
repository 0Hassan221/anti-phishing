import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const Logo = ({ 
    size = 'medium', 
    onClick = null,
    className = '',
    linkClassName = '',
    direction = 'row',
    color = 'light'
}) => {
    // Size configurations
    const sizeClasses = {
        small: 'h-8',
        medium: 'h-12',
        large: 'h-16'
    };

    // Direction configurations
    const directionClasses = {
        row: 'flex-row',
        column: 'flex-col items-center'
    };

    // Handle smooth scroll if provided
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <motion.div
            className={`flex items-center flex-shrink-0 group ${directionClasses[direction]} ${className}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Link
                href="/"
                onClick={handleClick}
                className={`flex items-center ${linkClassName}`}
            >
                <img 
                    src={color === 'dark' ? '/assets/dark logo.png' : '/assets/SecuraLogo.png'} 
                    alt="Secura Logo" 
                    className={`${sizeClasses[size]} w-auto object-contain`}
                />
                
                
            </Link>
        </motion.div>
    );
};

export default Logo;
