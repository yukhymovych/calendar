import {
  isToday,
  isWithinInterval,
  isPast,
  isFuture,
  addDays,
  addMonths,
  set,
  startOfDay,
  startOfTomorrow,
} from "date-fns";

const today = startOfDay(new Date());
const firstUpcomingDay = startOfTomorrow();
const lastUpcomingDay = addDays(today, 6);

export const filteringUpcomingNoRecurrence = (start: Date, end: Date) => {
  return (
    (!isToday(start) &&
      isFuture(start) &&
      isWithinInterval(start, {
        start: firstUpcomingDay,
        end: lastUpcomingDay,
      })) ||
    (isPast(start) && isFuture(end) && !isToday(end))
  );
};

export const filteringUpcomingDaily = (start: Date) => {
  if (
    isWithinInterval(start, {
      start: firstUpcomingDay,
      end: lastUpcomingDay,
    })
  ) {
    return true;
  }
  return isPast(start);
};

export const filteringUpcomingWeekly = (start: Date) => {
  let recurrenceTempDay = start;
  while (recurrenceTempDay <= lastUpcomingDay) {
    if (
      isWithinInterval(recurrenceTempDay, {
        start: firstUpcomingDay,
        end: lastUpcomingDay,
      })
    ) {
      return true;
    }
    recurrenceTempDay = addDays(recurrenceTempDay, 7);
  }
};

export const filteringUpcomingMonthly = (start: Date) => {
  let recurrenceTempDay = today;
  recurrenceTempDay.setDate(start.getDate());
  if (today >= start) {
    addMonths(recurrenceTempDay, 1);
  }
  if (
    isWithinInterval(recurrenceTempDay, {
      start: firstUpcomingDay,
      end: lastUpcomingDay,
    })
  ) {
    return true;
  }
};

export const filteringUpcomingYearly = (start: Date) => {
  let recurrenceTempDay = set(start, { year: today.getFullYear() });

  if (
    isWithinInterval(recurrenceTempDay, {
      start: firstUpcomingDay,
      end: lastUpcomingDay,
    })
  ) {
    return true;
  }
};

export const filteringUpcomingCertainDays = (start: Date) => {
  if (
    isWithinInterval(start, {
      start: firstUpcomingDay,
      end: lastUpcomingDay,
    }) ||
    isPast(start)
  ) {
    return true;
  }
};
