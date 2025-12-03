'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = {
  Company: ['About Us', 'Careers', 'Blog', 'Press'],
  Support: ['Help Center', 'Contact Us', 'FAQs', 'Travel Guides'],
  Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Disclaimer'],
  Social: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <button className="bg-primary text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 transition-colors">
            Explore More
          </button>
        </motion.div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Urban Trips. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

