'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { HiScissors, HiPaintBrush, HiSparkles } from 'react-icons/hi2';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // アイコンマップ
  const iconMap = {
    scissors: HiScissors,
    paintBrush: HiPaintBrush,
    sparkles: HiSparkles,
  };

  const services = [
    {
      id: 1,
      name: 'カット',
      price: '¥8,000〜',
      description: '最新のトレンドから王道スタイルまで、あなたに似合う一本へ。確かな技術と丁寧なカウンセリング。',
      iconKey: 'scissors' as keyof typeof iconMap,
      features: ['頭の形補正', 'トレンド提案', 'ヘアケアアドバイス'],
    },
    {
      id: 2,
      name: 'カラー',
      price: '¥12,000〜',
      description: '肌色に合わせた上質なカラー。褪色を極力抑えた色持ちの良い仕上がりへ。',
      iconKey: 'paintBrush' as keyof typeof iconMap,
      features: ['髪質診断', '色持ち30日保証', 'トリートメント込み'],
    },
    {
      id: 3,
      name: 'トリートメント',
      price: '¥6,000〜',
      description: 'ダメージケアから予防まで。髪本来の輝きと手触りを取り戻す贅沢なケア。',
      iconKey: 'sparkles' as keyof typeof iconMap,
      features: ['厳選成分使用', 'カスタマイズ', '持続効果2週間'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { y: -10, boxShadow: '0 20px 40px rgba(251, 146, 60, 0.2)', transition: { duration: 0.3 } },
  };

  return (
    <section id="services" ref={ref} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-50 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="text-center mb-20">
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6">
            <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.6 }} className="w-12 h-px bg-gradient-to-r from-transparent to-yellow-600"></motion.div>
            <span className="text-yellow-600 text-sm font-light tracking-widest">SERVICES</span>
            <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 0.6 }} className="w-12 h-px bg-gradient-to-l from-transparent to-yellow-600"></motion.div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-light text-black mb-6 tracking-wider" style={{ fontFamily: 'var(--font-cormorant)' }}>
            上質なサービス
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
            確かな技術と上質な材料で、あなたの美しさを最大限に引き出します
          </motion.p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 mb-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.iconKey];
            return (
              <motion.div key={service.id} variants={cardVariants} whileHover="hover" className="group relative bg-white border border-gray-200 p-8 md:p-10 rounded-lg transition-all duration-300">
                <motion.div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300 -z-10"></motion.div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>

                <motion.div className="w-16 h-16 flex items-center justify-center mb-6 text-yellow-600 transform group-hover:scale-110 transition-transform duration-300" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                  <IconComponent size={64} strokeWidth={1} className="drop-shadow-lg" />
                </motion.div>

                <motion.h3 className="text-2xl font-light text-black mb-2 tracking-wide" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  {service.name}
                </motion.h3>
                <motion.p className="text-yellow-600 font-light text-lg mb-4">{service.price}</motion.p>
                <motion.p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">{service.description}</motion.p>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <motion.li key={idx} className="text-sm text-gray-700 flex items-center font-light" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                      <motion.span className="w-1.5 h-1.5 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full mr-3"></motion.span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg"></div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }} className="text-center">
          <p className="text-gray-600 text-sm font-light">
            すべてのメニューは丁寧なカウンセリングと頭皮・髪質診断が含まれます
          </p>
        </motion.div>
      </div>
    </section>
  );
}

