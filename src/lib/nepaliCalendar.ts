// Bikram Sambat (BS) calendar conversion utility
// Covers BS years 2000-2090

const bsMonthDays: number[][] = [
  // 2000-2009
  [30,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [30,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  // 2010-2019
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [31,31,31,32,31,31,29,30,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [31,31,31,32,31,31,29,30,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,30,29,31],
  // 2020-2029
  [31,31,31,32,31,31,30,29,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,30],
  [31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,30,29,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [30,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,31,32,30,30,29,30,29,30,30],
  // 2030-2039
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [30,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [30,32,31,32,31,31,29,30,30,29,29,31],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [30,32,31,32,31,31,29,30,30,29,30,30],
  // 2040-2049
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [31,31,31,32,31,31,29,30,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [31,31,31,32,31,31,29,30,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,29,30,29,30,30],
  // 2050-2059
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [31,31,31,32,31,31,30,29,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,30],
  [31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,31,32,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [30,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  // 2060-2069
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [30,32,31,32,31,31,29,30,29,30,29,31],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [31,31,31,32,31,31,29,30,30,29,29,31],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  // 2070-2079
  [31,31,31,32,31,31,29,30,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
  [31,31,31,32,31,31,30,29,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,30],
  [31,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,31,32,31,31,30,29,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  // 2080-2090
  [31,32,31,32,31,30,30,30,29,29,30,30],
  [31,31,32,32,31,30,30,30,29,29,30,31],
  [30,32,31,32,31,30,30,30,29,30,29,31],
  [31,31,32,31,31,30,30,30,29,30,29,31],
  [31,31,32,31,31,30,30,30,29,30,30,30],
  [30,32,31,32,31,30,30,30,29,30,30,30],
  [31,31,32,31,31,31,30,30,29,30,29,31],
  [31,31,31,32,31,31,29,30,30,29,30,30],
  [31,31,32,31,31,31,30,29,30,29,30,30],
  [31,31,32,32,31,30,30,29,30,29,30,30],
  [31,32,31,32,31,30,30,30,29,29,30,31],
];

// Reference date: BS 2000/01/01 = AD 1943/04/14
const BS_EPOCH_YEAR = 2000;
const AD_EPOCH = new Date(1943, 3, 14); // April 14, 1943

export const bsMonthNames = [
  "बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज",
  "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत"
];

export const bsDayNames = [
  "आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"
];

const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function toNepaliDigits(num: number): string {
  return num.toString().split("").map(d => nepaliDigits[parseInt(d)] || d).join("");
}

export interface BSDate {
  year: number;
  month: number; // 1-12
  day: number;
}

export function adToBS(adDate: Date): BSDate {
  // Calculate total days from epoch
  const diffMs = adDate.getTime() - AD_EPOCH.getTime();
  let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let bsYear = BS_EPOCH_YEAR;
  let bsMonth = 0;
  let bsDay = 1;

  // Find year
  while (totalDays > 0) {
    const yearIdx = bsYear - BS_EPOCH_YEAR;
    if (yearIdx >= bsMonthDays.length) break;
    const yearDays = bsMonthDays[yearIdx].reduce((a, b) => a + b, 0);
    if (totalDays < yearDays) break;
    totalDays -= yearDays;
    bsYear++;
  }

  // Find month
  const yearIdx = bsYear - BS_EPOCH_YEAR;
  if (yearIdx < bsMonthDays.length) {
    for (let m = 0; m < 12; m++) {
      if (totalDays < bsMonthDays[yearIdx][m]) {
        bsMonth = m;
        bsDay = totalDays + 1;
        break;
      }
      totalDays -= bsMonthDays[yearIdx][m];
    }
  }

  return { year: bsYear, month: bsMonth + 1, day: bsDay };
}

export function bsToAD(bs: BSDate): Date {
  let totalDays = 0;

  // Add days for complete years
  for (let y = BS_EPOCH_YEAR; y < bs.year; y++) {
    const idx = y - BS_EPOCH_YEAR;
    if (idx < bsMonthDays.length) {
      totalDays += bsMonthDays[idx].reduce((a, b) => a + b, 0);
    }
  }

  // Add days for complete months
  const yearIdx = bs.year - BS_EPOCH_YEAR;
  if (yearIdx < bsMonthDays.length) {
    for (let m = 0; m < bs.month - 1; m++) {
      totalDays += bsMonthDays[yearIdx][m];
    }
  }

  // Add remaining days
  totalDays += bs.day - 1;

  return new Date(AD_EPOCH.getTime() + totalDays * 24 * 60 * 60 * 1000);
}

export function getBSDaysInMonth(year: number, month: number): number {
  const idx = year - BS_EPOCH_YEAR;
  if (idx >= 0 && idx < bsMonthDays.length && month >= 1 && month <= 12) {
    return bsMonthDays[idx][month - 1];
  }
  return 30;
}

export function formatBSDate(bs: BSDate): string {
  return `${toNepaliDigits(bs.day)} ${bsMonthNames[bs.month - 1]} ${toNepaliDigits(bs.year)}`;
}

export function formatBSDateFull(bs: BSDate, dayOfWeek: number): string {
  return `${bsDayNames[dayOfWeek]}, ${toNepaliDigits(bs.day)} ${bsMonthNames[bs.month - 1]} ${toNepaliDigits(bs.year)} | NST`;
}

export function calculateBSAge(birthBS: BSDate, currentBS: BSDate): { years: number; months: number; days: number } {
  let years = currentBS.year - birthBS.year;
  let months = currentBS.month - birthBS.month;
  let days = currentBS.day - birthBS.day;

  if (days < 0) {
    months--;
    // Days in prev month of current BS date
    const prevMonth = currentBS.month === 1 ? 12 : currentBS.month - 1;
    const prevYear = currentBS.month === 1 ? currentBS.year - 1 : currentBS.year;
    days += getBSDaysInMonth(prevYear, prevMonth);
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days) };
}
