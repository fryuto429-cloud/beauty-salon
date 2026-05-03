import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ReservationForm from '@/components/ReservationForm';

export default function Home() {
  return (
    <main className="w-full">
      {/* ナビゲーションバー */}
      <Navbar />

      {/* ヒーローセクション */}
      <Hero />

      {/* サービスメニューセクション */}
      <Services />

      {/* 予約フォームセクション */}
      <ReservationForm />

      {/* フッター */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* ブランド情報 */}
            <div>
              <h3 className="text-white text-lg font-light tracking-wider mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                ELEGANCE
              </h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                上質な美の時間をお約束するプレミアムサロン
              </p>
            </div>

            {/* 営業情報 */}
            <div>
              <h4 className="text-white text-sm font-light tracking-widest mb-4 uppercase" style={{ fontFamily: 'var(--font-cormorant)' }}>
                営業時間
              </h4>
              <ul className="space-y-2 text-gray-500 text-sm font-light">
                <li>平日: 10:00 - 20:00</li>
                <li>土日祝: 10:00 - 19:00</li>
                <li className="text-yellow-500 mt-3">定休日: 月曜日</li>
              </ul>
            </div>

            {/* コンタクト */}
            <div>
              <h4 className="text-white text-sm font-light tracking-widest mb-4 uppercase" style={{ fontFamily: 'var(--font-cormorant)' }}>
                お問い合わせ
              </h4>
              <ul className="space-y-2 text-gray-500 text-sm font-light">
                <li>📞 090-XXXX-XXXX</li>
                <li>📍 東京都渋谷区...</li>
                <li className="mt-3">
                  <a href="#reservation" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                    ご予約はこちら →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 区切り線 */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-600 text-xs font-light">
                © 2026 ELEGANCE. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-500 text-xs font-light transition-colors"
                >
                  プライバシーポリシー
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-yellow-500 text-xs font-light transition-colors"
                >
                  利用規約
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
