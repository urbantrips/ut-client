import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = cn(
      'rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden group',
      {
        'bg-primary text-gray-900 hover:bg-primary-600 focus:ring-primary shadow-lg hover:shadow-xl':
          variant === 'primary',
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 shadow-md hover:shadow-lg':
          variant === 'secondary',
        'border-2 border-primary text-primary hover:bg-primary hover:text-gray-900 focus:ring-primary hover:shadow-lg':
          variant === 'outline',
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
      },
      className
    );

    return (
      <motion.button
        ref={ref}
        className={baseStyles}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        {...props}
      >
        {/* Shimmer effect */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
          transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
        />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

