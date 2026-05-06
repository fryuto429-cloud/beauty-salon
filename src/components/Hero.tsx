'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 0.5,
    }));
    setParticles(generatedParticles);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  const particleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  const floatingVariants = {
    hidden: { y: 20 },
    visible: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-black via-slate-900 to-black overflow-hidden pt-20">
      {/* 背景グラデーション装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-600 to-yellow-400 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-tr from-yellow-500 to-orange-400 rounded-full opacity-3 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-b from-slate-700 to-transparent rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* パーティクル効果 */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial="hidden"
            animate="visible"
            variants={particleVariants}
            transition={{ delay: particle.delay }}
            className="absolute bg-yellow-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>

      {/* コンテンツ */}
      <motion.div
        className="relative h-full flex flex-col items-center justify-center text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* トップデコレーション */}
        <motion.div variants={itemVariants} className="mb-6 flex items-center justify-center gap-3">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-px bg-gradient-to-r from-transparent to-yellow-500"
          ></motion.div>
          <motion.span className="text-yellow-500 text-sm font-light tracking-widest">
            PREMIUM SALON
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-12 h-px bg-gradient-to-l from-transparent to-yellow-500"
          ></motion.div>
        </motion.div>

        {/* サロン名 */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-light text-white mb-4 tracking-wider"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          ELEGANCE
        </motion.h1>

        {/* キャッチコピー */}
        <motion.p variants={itemVariants} className="text-lg md:text-2xl text-gray-300 font-light mb-12 max-w-2xl leading-relaxed">
          あなたの美しさを引き出す、上質な時間へ
        </motion.p>

        {/* 説明文 */}
        <motion.p variants={itemVariants} className="text-sm md:text-base text-gray-400 mb-12 max-w-xl font-light">
          確かな技術と心からのおもてなしで、あなたをより美しくお導きします
        </motion.p>

        {/* 予約ボタン */}
        <motion.div variants={itemVariants}>
          <motion.a
            href="#reservation"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(251, 146, 60, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 md:px-12 py-4 md:py-5 text-white text-base md:text-lg font-light border border-yellow-500 overflow-hidden transition-all duration-300 inline-block"
          >
            <motion.span
              className="absolute inset-0 bg-yellow-500"
              initial={{ translateY: '100%' }}
              whileHover={{ translateY: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.span>
            <span className="relative block z-10">ご予約はこちら</span>
          </motion.a>
        </motion.div>

        {/* スタッツ */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex items-center gap-8 md:gap-16"
        >
          {[
            { num: '98%', label: '顧客満足度' },
            { num: '3,000+', label: '年間来店数' },
            { num: '10年', label: 'スタイリスト経験' },
          ].map(({ num, label }, i) => (
            <div key={label} className="flex items-center gap-8 md:gap-16">
              {i > 0 && <div className="w-px h-8 bg-gray-700" />}
              <div className="text-center">
                <div
                  className="text-2xl md:text-3xl font-light text-yellow-400"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {num}
                </div>
                <div className="text-xs text-gray-500 mt-1 tracking-wider">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* スクロールインジケーター */}
        <motion.div
          variants={floatingVariants}
          className="absolute bottom-10 flex flex-col items-center"
        >
          <span className="text-xs text-gray-500 mb-3">SCROLL</span>
          <motion.svg
            className="w-5 h-8 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

