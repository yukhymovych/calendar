import React, { FC } from "react";
import {
  isToday,
  isFuture,
  format,
  isWithinInterval,
  isPast,
  getDay,
  startOfTomorrow,
  addDays,
  addMonths,
  set,
  startOfDay,
} from "date-fns";
import { useAuthContext } from "../Context/AuthProvider";
import UserInfo from "./UserInfo/UserInfo";
import EventListColumn from "./EventListColumn/EventListColumn";
import Reminder from "./ShortTodos/ShortTodos";
import SidebarDatepicker from "./SidebarDatepicker/SidebarDatepicker";
import { useGetItems, useGetShortTodos } from "../firebase/crud";
import "./Dashboard.css";
import { EventItem, RecurrenceType } from "../types";

const filterEventsForToday = (events: EventItem[]) => {
  const today = startOfDay(new Date());
  let start, end;

  return events.filter(({ startDate, endDate, recurrence, recurrenceDays }) => {
    start = startOfDay(new Date(startDate));
    end = startOfDay(new Date(endDate));
    if (recurrence === RecurrenceType.NoRecurrence) {
      return (
        isToday(start) ||
        isToday(end) ||
        isWithinInterval(today, {
          start: start,
          end: end,
        })
      );
    }
    if (recurrence === RecurrenceType.Daily) {
      return isToday(start) || isPast(start);
    }
    if (recurrence === RecurrenceType.Weekly) {
      return isPast(start) && getDay(start) === getDay(today);
    }
    if (recurrence === RecurrenceType.Monthly) {
      return start.getDate() === today.getDate();
    }
    if (recurrence === RecurrenceType.Yearly) {
      return (
        start.getMonth() === today.getMonth() &&
        start.getDate() === today.getDate()
      );
    }
    if (recurrence === RecurrenceType.CertainDays) {
      return (
        recurrenceDays?.some((day) => day === format(today, "iiii")) &&
        (isToday(start) || isPast(start))
      );
    }
    return false;
  });
};

// show events for next 7 days
const filterEventsUpcoming = (events: EventItem[]) => {
  const today = startOfDay(new Date());
  const firstUpcomingDay = startOfTomorrow();
  const lastUpcomingDay = addDays(today, 6);
  let start, end, recurrenceTempDay;

  return events.filter(({ startDate, endDate, recurrence }) => {
    start = startOfDay(new Date(startDate));
    end = startOfDay(new Date(endDate));
    if (recurrence === RecurrenceType.NoRecurrence) {
      return (
        (!isToday(start) &&
          isFuture(start) &&
          isWithinInterval(start, {
            start: firstUpcomingDay,
            end: lastUpcomingDay,
          })) ||
        (isPast(start) && isFuture(end) && !isToday(end))
      );
    }
    if (recurrence === RecurrenceType.Daily) {
      if (
        isWithinInterval(start, {
          start: firstUpcomingDay,
          end: lastUpcomingDay,
        })
      ) {
        return true;
      }
      return isPast(start);
    }
    if (recurrence === RecurrenceType.Weekly) {
      recurrenceTempDay = start;
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
    }
    if (recurrence === RecurrenceType.Monthly) {
      recurrenceTempDay = today;
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
    }
    if (recurrence === RecurrenceType.Yearly) {
      let recurrenceTempDay = set(start, { year: today.getFullYear() });

      if (
        isWithinInterval(recurrenceTempDay, {
          start: firstUpcomingDay,
          end: lastUpcomingDay,
        })
      ) {
        return true;
      }
    }
    if (recurrence === RecurrenceType.CertainDays) {
      if (
        isWithinInterval(start, {
          start: firstUpcomingDay,
          end: lastUpcomingDay,
        }) ||
        isPast(start)
      ) {
        return true;
      }
    }
    return false;
  });
};

const Dashboard: FC = () => {
  const events = useGetItems();
  const shortTodos = useGetShortTodos();
  const { user } = useAuthContext();
  const eventListTodays = filterEventsForToday(events);
  const eventListUpcoming = filterEventsUpcoming(events);

  const userInfo = {
    fullDate: format(new Date(), "cccc, MMMM d, H:mm"),
    name: user?.displayName || null,
    today: eventListTodays.length,
    upcoming: eventListUpcoming.length,
  };

  const showTodaysEvents = eventListTodays.length !== 0;
  const showThisWeekEvents = eventListUpcoming.length !== 0;
  const showEvents = showTodaysEvents || showThisWeekEvents;

  return (
    <div className="content">
      <div className="left-sidebar">
        <UserInfo data={userInfo} />
      </div>

      <div className="event-list">
        {showEvents ? (
          <>
            {showTodaysEvents && (
              <EventListColumn
                title="Today's Events"
                data={eventListTodays}
                today
              />
            )}
            {showThisWeekEvents && (
              <EventListColumn title="Upcoming Events" data={eventListUpcoming} />
            )}
          </>
        ) : (
          <h2 className="h3">
            You don't have any events yet. After you add them you will see it
            here
          </h2>
        )}
      </div>

      <div className="right-sidebar">
        <SidebarDatepicker />
        <Reminder data={shortTodos} />
      </div>
    </div>
  );
};

export default Dashboard;
