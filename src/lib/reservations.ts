export interface Reservation {
  id: string;
  name: string;
  phone: string;
  menu: string;
  date: string;   // "YYYY-MM-DD"
  time: string;   // "HH:00"
  createdAt: string;
}

const STORAGE_KEY = 'beauty_salon_reservations';

export function getReservations(): Reservation[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Reservation[]) : [];
  } catch {
    return [];
  }
}

export function saveReservation(
  data: Omit<Reservation, 'id' | 'createdAt'>
): Reservation {
  const reservations = getReservations();
  const newEntry: Reservation = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  reservations.push(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
  return newEntry;
}

/** 指定日の予約済み時間枠一覧を返す */
export function getBookedSlots(date: string): string[] {
  return getReservations()
    .filter((r) => r.date === date)
    .map((r) => r.time);
}
