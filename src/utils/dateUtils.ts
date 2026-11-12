const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

function parseLocalDate(dateStr: string): Date | null {
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return null;
  }
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

function getOrdinalSuffix(day: number): string {
  const mod100 = day % 100;
  if (mod100 >= 11 && mod100 <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

/** Formats "2026-11-26" as "26.11.26". */
export function formatShortDate(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  if (!d) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}

/** Formats "2026-11-25" as "November 25th, 2026". */
export function formatEventDate(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  if (!d) return '';
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
}

/** Formats "2026-11-26" as "THURSDAY". */
export function formatWeekdayUpper(dateStr: string): string {
  const d = parseLocalDate(dateStr);
  if (!d) return '';
  return WEEKDAYS[d.getDay()];
}

/** Returns local timestamp for dateStr ("YYYY-MM-DD") and timeStr ("HH:mm"). */
export function getTargetTimestamp(dateStr: string, timeStr = '23:59'): number {
  const dateParts = dateStr.split('-').map(Number);
  const timeParts = timeStr.split(':').map(Number);
  if (dateParts.length !== 3 || dateParts.some(Number.isNaN)) {
    return 0;
  }
  const [year, month, day] = dateParts;
  const hours = !Number.isNaN(timeParts[0]) ? timeParts[0] : 23;
  const minutes = !Number.isNaN(timeParts[1]) ? timeParts[1] : 59;
  return new Date(year, month - 1, day, hours, minutes, 0, 0).getTime();
}
