/**
 * Çalışma saatleri ayrıştırıcısı — tek doğruluk kaynağı.
 *
 * config.json'daki serbest metin satırlarını ("Pazartesi — Cumartesi" / "09:00 — 19:00")
 * yapılandırılmış gün/saat bilgisine çevirir. Hem canlı Açık/Kapalı rozeti (tarayıcı)
 * hem JSON-LD ve llms.txt (build) bu modülü kullanır; böylece site ile yapay zeka
 * motorlarına verilen saatler birbirinden ayrışamaz.
 */

export interface WorkingHoursRow {
  days: string;
  hours: string;
}

export interface DaySchedule {
  /** 0 = Pazar … 6 = Cumartesi (Date#getDay ile aynı) */
  days: number[];
  closed: boolean;
  /** "HH:MM" — kapalı günlerde boş */
  opens: string;
  closes: string;
  opensMins: number;
  closesMins: number;
}

export const SCHEMA_DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

// Anahtarlar Türkçe karakterleri katlanmış (ASCII) hâlde; tam kelime eşleşmesi yapılır.
// ("pazartesi".includes("pazar") tuzağına düşmemek için alt dize araması kullanılmaz.)
const DAY_ALIASES: Record<string, number> = {
  pazar: 0, paz: 0,
  pazartesi: 1, pzt: 1, pts: 1,
  sali: 2, sal: 2,
  carsamba: 3, car: 3, crs: 3,
  persembe: 4, per: 4, prs: 4,
  cuma: 5, cum: 5,
  cumartesi: 6, cmt: 6, cts: 6,
};

const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

function fold(text: string): string {
  return String(text || '')
    .toLocaleLowerCase('tr-TR')
    .replace(/̇/g, '')
    .replace(/ı/g, 'i')
    .replace(/ç/g, 'c')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u');
}

function dayOf(token: string): number | undefined {
  return DAY_ALIASES[token.replace(/[^a-z]/g, '')];
}

/** "Pazartesi — Cumartesi", "Hafta içi", "Salı, Perşembe", "Cuma - Pazartesi" → gün indeksleri */
export function parseDays(daysText: string): number[] {
  const s = fold(daysText);
  if (/her\s*gun/.test(s)) return [...ALL_DAYS];
  if (/hafta\s*ici/.test(s)) return [1, 2, 3, 4, 5];
  if (/hafta\s*sonu/.test(s)) return [6, 0];

  const result: number[] = [];
  for (const part of s.split(/,|\/|&|\bve\b/)) {
    const ends = part.split(/\s*[-—–]\s*/).map(dayOf);
    if (ends.length === 2 && ends[0] !== undefined && ends[1] !== undefined) {
      // Aralık; "Cuma — Pazartesi" gibi haftayı saran aralıklar da desteklenir.
      for (let d = ends[0]; ; d = (d + 1) % 7) {
        result.push(d);
        if (d === ends[1]) break;
      }
      continue;
    }
    for (const word of part.split(/\s+/)) {
      const d = dayOf(word);
      if (d !== undefined) result.push(d);
    }
  }
  return [...new Set(result)];
}

function toMins(h: string, m: string): number {
  return parseInt(h, 10) * 60 + parseInt(m, 10);
}

function pad(h: string, m: string): string {
  return `${h.padStart(2, '0')}:${m}`;
}

export function parseRow(row: WorkingHoursRow): DaySchedule {
  const days = parseDays(row.days);
  const hours = fold(row.hours);
  const m = hours.match(/(\d{1,2})[:.](\d{2})\s*[-—–]\s*(\d{1,2})[:.](\d{2})/);
  if (!m || /kapali|closed/.test(hours)) {
    return { days, closed: true, opens: '', closes: '', opensMins: 0, closesMins: 0 };
  }
  return {
    days,
    closed: false,
    opens: pad(m[1], m[2]),
    closes: pad(m[3], m[4]),
    opensMins: toMins(m[1], m[2]),
    closesMins: toMins(m[3], m[4]),
  };
}

export function parseWorkingHours(rows: WorkingHoursRow[] | undefined): DaySchedule[] {
  return (rows || []).map(parseRow).filter((s) => s.days.length > 0);
}

/** Verilen gün için ilk eşleşen satır; hiç satır yoksa undefined (= kapalı). */
export function scheduleForDay(rows: WorkingHoursRow[] | undefined, day: number): DaySchedule | undefined {
  return parseWorkingHours(rows).find((s) => s.days.includes(day));
}

/** Gece yarısını aşan kapanışı da hesaba katar (ör. 18:00 — 02:00). */
export function isOpenAt(schedule: DaySchedule | undefined, minutes: number): boolean {
  if (!schedule || schedule.closed) return false;
  const o = schedule.opensMins;
  const c = schedule.closesMins;
  return c > o ? minutes >= o && minutes < c : minutes >= o || minutes < c;
}
