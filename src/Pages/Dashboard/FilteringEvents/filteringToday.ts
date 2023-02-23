import {
  isToday,
  format,
  isWithinInterval,
  isPast,
  getDay,
  startOfDay,
} from "date-fns";

const today = startOfDay(new Date());

export const filteringTodayNoRecurrence = (start: Date, end: Date) => {
  return (
    isToday(start) ||
    isToday(end) ||
    isWithinInterval(today, {
      start: start,
      end: end,
    })
  );
};

export const filteringTodayDaily = (start: Date) => {
  return isToday(start) || isPast(start);
};

export const filteringTodayWeekly = (start: Date) => {
  return isPast(start) && getDay(start) === getDay(today);
};

export const filteringTodayMonthly = (start: Date) => {
  return start.getDate() === today.getDate();
};

export const filteringTodayYearly = (start: Date) => {
  return (
    start.getMonth() === today.getMonth() && start.getDate() === today.getDate()
  );
};

export const filteringTodayCertainDays = (
  start: Date,
  recurrenceDays: string[] | undefined
) => {
  return (
    recurrenceDays?.some((day) => day === format(today, "iiii")) &&
    (isToday(start) || isPast(start))
  );
};
