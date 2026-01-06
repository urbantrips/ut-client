'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/user-store';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const user = useUserStore((state) => state.user);
  const accessToken = useUserStore((state) => state.accessToken);
  const isLoggedIn = !!(user || accessToken);

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
        className={`px-3 sm:px-4 py-3 sm:py-4 transition-all duration-300 ${isScrolled
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
            {isLoggedIn ? (
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link
                  href="/my-trips"
                  className="text-sm font-bold text-black border-b-2 border-transparent hover:border-black transition-all whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  My Trips
                </Link>
              </motion.div>
            ) : (
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link
                  href="/signin"
                  className="text-sm font-bold text-black border-b-2 border-transparent hover:border-black transition-all whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                >
                  Sign In
                </Link>
              </motion.div>
            )}
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
              {isLoggedIn ? (
                <Link
                  href="/trips"
                  className="block text-sm font-bold text-black py-2"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Trips
                </Link>
              ) : (
                <Link
                  href="/signin"
                  className="block text-sm font-bold text-black py-2"
                  style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </motion.div>
          </div>
        </motion.nav>
      </motion.div>
    </motion.header>
  );
}

