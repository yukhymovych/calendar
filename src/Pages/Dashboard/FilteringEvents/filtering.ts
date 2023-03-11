import { startOfDay } from 'date-fns';
import { EventItem, RecurrenceType } from '../../../types';
import {
  filteringTodayNoRecurrence,
  filteringTodayDaily,
  filteringTodayWeekly,
  filteringTodayMonthly,
  filteringTodayYearly,
  filteringTodayCertainDays,
  filteringUpcomingNoRecurrence,
  filteringUpcomingDaily,
  filteringUpcomingWeekly,
  filteringUpcomingMonthly,
  filteringUpcomingYearly,
  filteringUpcomingCertainDays,
} from './index';

export const filterEventsForToday = (events: EventItem[]) => {
  let start, end;

  return events.filter(({ startDate, endDate, recurrence, recurrenceDays }) => {
    start = startOfDay(new Date(startDate));
    end = startOfDay(new Date(endDate));
    switch (recurrence) {
      case RecurrenceType.NoRecurrence:
        return filteringTodayNoRecurrence(start, end);
      case RecurrenceType.Daily:
        return filteringTodayDaily(start);
      case RecurrenceType.Weekly:
        return filteringTodayWeekly(start);
      case RecurrenceType.Monthly:
        return filteringTodayMonthly(start);
      case RecurrenceType.Yearly:
        return filteringTodayYearly(start);
      case RecurrenceType.CertainDays:
        return filteringTodayCertainDays(start, recurrenceDays);
    }
    return false;
  });
};

// show events for next 7 days
export const filterEventsUpcoming = (events: EventItem[]) => {
  let start, end;

  return events.filter(({ startDate, endDate, recurrence, recurrenceDays }) => {
    start = startOfDay(new Date(startDate));
    end = startOfDay(new Date(endDate));
    switch (recurrence) {
      case RecurrenceType.NoRecurrence:
        return filteringUpcomingNoRecurrence(start, end);
      case RecurrenceType.Daily:
        return filteringUpcomingDaily(start);
      case RecurrenceType.Weekly:
        return filteringUpcomingWeekly(start);
      case RecurrenceType.Monthly:
        return filteringUpcomingMonthly(start);
      case RecurrenceType.Yearly:
        return filteringUpcomingYearly(start);
    }
    if (recurrence === RecurrenceType.CertainDays && recurrenceDays) {
      return filteringUpcomingCertainDays(start);
    }
    return false;
  });
};
