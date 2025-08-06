import { Holidays, Vacations } from "@prisma/client";

export type Day = {
  date: Date;
  dayOfMonth: number;
  dayOfWeek: number;
  isWeekend: boolean;
  isVacation: boolean;
  title?: string;
};

export type Month = {
  year: number;
  month: number;
  days: Day[];
};

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const isDateInList = (
  holidays: (Holidays | Vacations)[],
  date: Date,
): boolean => {
  return !!holidays.find((h) => isSameDate(h.date, date));
};

export const generateMonth = (
  bankHolidays: Holidays[],
  vacations: Vacations[],
  year: number,
  month: number,
): Month => {
  const days: Day[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(Date.UTC(year, month, day));
    const dayOfWeek = date.getDay(); // 0 - Sunday
    days.push({
      date,
      dayOfMonth: day,
      dayOfWeek,
      isWeekend:
        dayOfWeek === 0 || dayOfWeek === 6 || isDateInList(bankHolidays, date),
      isVacation: isDateInList(vacations, date),
      title:
        [...vacations, ...bankHolidays].find((h) => isSameDate(h.date, date))
          ?.name ??
        (dayOfWeek === 0 || dayOfWeek === 6 ? "Day off" : undefined),
    });
  }

  return {
    year,
    month,
    days,
  };
};

export const getMonthName = (
  monthIndex: number,
  locale: string = navigator.language,
): string =>
  new Intl.DateTimeFormat(locale ?? "en-GB", { month: "long" }).format(
    new Date(2025, monthIndex),
  );

export const getWeekdayName = (
  weekdayIndex: number,
  locale: string = navigator.language,
): string =>
  new Intl.DateTimeFormat(locale ?? "en-GB", { weekday: "narrow" }).format(
    new Date(2025, 0, weekdayIndex + 6),
  );

export const formatDate = (date: Date): string =>
  date.toISOString().slice(0, 10);

export const prettyFormatDate = (dateStr: string): string => {
  const date = new Date(dateStr);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};
