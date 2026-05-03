'use client';

import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { getBookedSlots, saveReservation } from '@/lib/reservations';
import type { Reservation } from '@/lib/reservations';

/* ── 定数 ─────────────────────────────────────────── */
const MENUS = [
  'カット',
  'カラー',
  'トリートメント',
  'カット + カラー',
  'カット + トリートメント',
];

const TIME_SLOTS = Array.from({ length: 10 }, (_, i) =>
  `${(10 + i).toString().padStart(2, '0')}:00`
);

/* ── 型 ───────────────────────────────────────────── */
interface FormState {
  name: string;
  phone: string;
  menu: string;
}
type Errors = Partial<Record<'name' | 'phone' | 'date' | 'time', string>>;

/* ── ユーティリティ ────────────────────────────────── */
function toDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function toJapanese(d: Date): string {
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
}

/* ── メインコンポーネント ──────────────────────────── */
export default function ReservationForm() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    menu: MENUS[0],
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [completed, setCompleted] = useState<Reservation | null>(null);

  /* 日付が変わったら予約済み枠をリロード */
  useEffect(() => {
    if (!selectedDate) return;
    setBookedSlots(getBookedSlots(toDateString(selectedDate)));
    setSelectedTime('');
  }, [selectedDate]);

  function validate(): boolean {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'お名前を入力してください';
    if (!form.phone.trim()) e.phone = 'お電話番号を入力してください';
    if (!selectedDate) e.date = '日程を選択してください';
    if (!selectedTime) e.time = '時間枠を選択してください';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate() || !selectedDate) return;

    const saved = saveReservation({
      name: form.name.trim(),
      phone: form.phone.trim(),
      menu: form.menu,
      date: toDateString(selectedDate),
      time: selectedTime,
    });

    setCompleted(saved);
    setBookedSlots(getBookedSlots(toDateString(selectedDate)));
  }

  function handleReset() {
    setForm({ name: '', phone: '', menu: MENUS[0] });
    setSelectedDate(null);
    setSelectedTime('');
    setBookedSlots([]);
    setErrors({});
    setCompleted(null);
  }

  const inputCls = (err?: string) =>
    `w-full bg-gray-900 border ${
      err ? 'border-red-500' : 'border-gray-700'
    } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors placeholder-gray-600`;

  return (
    <section id="reservation" ref={ref} className="py-24 bg-black">
      <div className="max-w-2xl mx-auto px-6">

        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-yellow-400 text-xs tracking-[0.35em] uppercase font-light">
            Reservation
          </span>
          <h2
            className="text-4xl font-light text-white mt-4 mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ご予約
          </h2>
          <div className="w-16 h-px bg-yellow-400 mx-auto" />
          <p className="text-gray-500 text-sm mt-5 leading-relaxed">
            ご希望の日程・時間をお選びください。<br />
            グレーの枠はすでに予約が入っています。
          </p>
        </motion.div>

        {/* フォーム */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
          noValidate
        >
          {/* お名前 / 電話番号 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-400 text-xs tracking-widest mb-2 uppercase">
                お名前 <span className="text-yellow-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="山田 太郎"
                className={inputCls(errors.name)}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-400 text-xs tracking-widest mb-2 uppercase">
                電話番号 <span className="text-yellow-400">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="090-1234-5678"
                className={inputCls(errors.phone)}
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* メニュー */}
          <div>
            <label className="block text-gray-400 text-xs tracking-widest mb-2 uppercase">
              メニュー
            </label>
            <select
              value={form.menu}
              onChange={e => setForm(p => ({ ...p, menu: e.target.value }))}
              className={inputCls()}
            >
              {MENUS.map(m => (
                <option key={m} value={m} className="bg-gray-900">
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* カレンダー */}
          <div>
            <label className="block text-gray-400 text-xs tracking-widest mb-3 uppercase">
              日程を選択 <span className="text-yellow-400">*</span>
            </label>
            <div
              className={`datepicker-wrap inline-block${
                errors.date ? ' ring-1 ring-red-500 rounded-xl' : ''
              }`}
            >
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                inline
                minDate={new Date()}
                dateFormat="yyyy/MM/dd"
                calendarClassName="salon-calendar"
              />
            </div>
            {errors.date && (
              <p className="text-red-400 text-xs mt-2">{errors.date}</p>
            )}
          </div>

          {/* 時間枠 */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div
                key="timeslots"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-gray-400 text-xs tracking-widest mb-3 uppercase">
                  時間枠を選択 <span className="text-yellow-400">*</span>
                  <span className="ml-3 text-gray-600 normal-case tracking-normal font-normal">
                    — {toJapanese(selectedDate)}
                  </span>
                </label>

                <div className="grid grid-cols-5 gap-2">
                  {TIME_SLOTS.map(slot => {
                    const booked = bookedSlots.includes(slot);
                    const active = selectedTime === slot;
                    return (
                      <motion.button
                        key={slot}
                        type="button"
                        disabled={booked}
                        onClick={() => setSelectedTime(slot)}
                        whileHover={booked ? {} : { scale: 1.05 }}
                        whileTap={booked ? {} : { scale: 0.95 }}
                        title={booked ? '予約済み' : `${slot} を選択`}
                        className={[
                          'relative py-3 rounded-lg text-sm font-medium transition-all duration-200',
                          booked
                            ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed line-through decoration-gray-600'
                            : active
                              ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 ring-2 ring-yellow-300/40'
                              : 'bg-gray-900 text-gray-300 border border-gray-700 hover:border-yellow-400/70 hover:text-yellow-300 cursor-pointer',
                        ].join(' ')}
                      >
                        {booked && (
                          <span className="absolute inset-0 flex items-center justify-center text-gray-700 text-base pointer-events-none select-none">
                            ✕
                          </span>
                        )}
                        <span className={booked ? 'opacity-0' : ''}>{slot}</span>
                        {booked && (
                          <span className="sr-only">{slot} 予約済み</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {errors.time && (
                  <p className="text-red-400 text-xs mt-2">{errors.time}</p>
                )}

                {/* 凡例 */}
                <div className="flex flex-wrap gap-5 mt-4 text-xs text-gray-500">
                  {[
                    { color: 'bg-yellow-400', label: '選択中' },
                    { color: 'bg-gray-800/50 border border-gray-700', label: '予約済み' },
                    { color: 'bg-gray-900 border border-gray-700', label: '空き有り' },
                  ].map(({ color, label }) => (
                    <span key={label} className="flex items-center gap-1.5">
                      <span className={`inline-block w-3 h-3 rounded ${color}`} />
                      {label}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 送信ボタン */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="w-full py-4 bg-yellow-400 text-black font-semibold tracking-[0.2em] uppercase text-sm rounded-lg hover:bg-yellow-300 transition-colors"
          >
            予約を確定する
          </motion.button>
        </motion.form>
      </div>

      {/* サンクスモーダル */}
      <AnimatePresence>
        {completed && (
          <ThankYouModal reservation={completed} onClose={handleReset} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── サンクスモーダル ─────────────────────────────── */
function ThankYouModal({
  reservation,
  onClose,
}: {
  reservation: Reservation;
  onClose: () => void;
}) {
  const dateObj = new Date(`${reservation.date}T00:00:00`);

  const rows: [string, string][] = [
    ['お名前', `${reservation.name} 様`],
    ['メニュー', reservation.menu],
    ['日程', toJapanese(dateObj)],
    ['時間', `${reservation.time}〜`],
    ['電話番号', reservation.phone],
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 16 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        onClick={e => e.stopPropagation()}
        className="bg-gray-950 border border-yellow-400/25 rounded-2xl p-8 max-w-md w-full"
      >
        {/* アイコン */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-3xl mb-4"
          >
            ✨
          </motion.div>
          <h3
            className="text-2xl font-light text-white mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ご予約ありがとうございます
          </h3>
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            Booking Confirmed
          </p>
        </div>

        {/* 予約詳細 */}
        <div className="bg-black/40 rounded-xl border border-gray-800 divide-y divide-gray-800 mb-6">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3"
            >
              <span className="text-gray-500 text-xs tracking-widest">
                {label}
              </span>
              <span className="text-white text-sm">{value}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-xs text-center mb-6 leading-relaxed">
          ご来店をスタッフ一同、心よりお待ちしております。<br />
          変更・キャンセルはお電話にてご連絡ください。
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="w-full py-3 bg-yellow-400 text-black font-semibold tracking-[0.15em] uppercase text-sm rounded-xl"
        >
          閉じる
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
