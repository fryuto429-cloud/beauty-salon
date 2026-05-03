'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'サービス', href: '#services' },
    { label: 'ご予約', href: '#reservation' },
    { label: 'お問い合わせ', href: '#contact' },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/10"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex items-center justify-between h-20">
          {/* ロゴ */}
          <a href="/" className="flex items-center group">
            <span className="text-2xl font-light tracking-widest text-white group-hover:text-yellow-500 transition-colors">
              ELEGANCE
            </span>
            <span className="text-xs text-yellow-500 ml-2 font-light">SALON</span>
          </a>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex items-center gap-12">
            {menuItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="text-sm text-gray-300 hover:text-yellow-500 transition-colors font-light tracking-wide"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* ハンバーガーメニュー */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-yellow-500"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-full h-0.5 bg-yellow-500"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-yellow-500"
            />
          </motion.button>
        </div>

        {/* モバイルメニュー */}
        <motion.div
          initial="hidden"
          animate={isOpen ? 'visible' : 'hidden'}
          variants={mobileMenuVariants}
          className={`md:hidden overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
        >
          <div className="pb-4 space-y-3">
            {menuItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                variants={mobileMenuItemVariants}
                onClick={() => setIsOpen(false)}
                className="block text-sm text-gray-300 hover:text-yellow-500 transition-colors font-light py-2 px-0"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
