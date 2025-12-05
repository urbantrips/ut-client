'use client';

import Link from 'next/link';
import { Star, Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      className="w-full fixed top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top border */}
      <motion.div 
        className="h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      
      {/* Main header content */}
      <motion.div
        className={`px-3 sm:px-4 py-3 sm:py-4 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white'
        }`}
        animate={{
          boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-xl sm:text-2xl font-bold text-black relative group">
              <span className="relative z-10">Urbantrips</span>
              <motion.span
                className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
          
          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link 
                href="/account" 
                className="flex items-center gap-2 text-black hover:text-primary transition-colors relative group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Star className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </motion.div>
                <span className="relative">
                  My Account
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                  />
                </span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <Link 
                href="/trips" 
                className="flex items-center gap-2 text-black hover:text-primary transition-colors relative group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Star className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                </motion.div>
                <span className="relative">
                  My Trips
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                  />
                </span>
              </Link>
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <motion.nav
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 pb-2 space-y-3">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: isMobileMenuOpen ? 0 : -20, opacity: isMobileMenuOpen ? 1 : 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link 
                href="/account" 
                className="flex items-center gap-2 text-black hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Star className="w-4 h-4 text-gray-400" />
                <span>My Account</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: isMobileMenuOpen ? 0 : -20, opacity: isMobileMenuOpen ? 1 : 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                href="/trips" 
                className="flex items-center gap-2 text-black hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Star className="w-4 h-4 text-gray-400" />
                <span>My Trips</span>
              </Link>
            </motion.div>
          </div>
        </motion.nav>
      </motion.div>
    </motion.header>
  );
}

