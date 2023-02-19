import React, { FC } from "react";
import {
  isToday,
  isFuture,
  format,
  isThisWeek,
  isWithinInterval,
  isPast,
  getDay,
  startOfTomorrow,
  addDays,
} from "date-fns";
import { useAuthContext } from "../Context/AuthProvider";
import UserInfo from "./UserInfo/UserInfo";
// import Statistic from "./Statistic/Statistic";
import EventListColumn from "./EventListColumn/EventListColumn";
import Reminder from "./ShortTodos/ShortTodos";
import SidebarDatepicker from "./SidebarDatepicker/SidebarDatepicker";
import { useGetItems, useGetShortTodos } from "../firebase/crud";

import "./Dashboard.css";
import { EventItem, RecurrenceType } from "../types";

// const statisticMocks = {
//   scheduled: 24,
//   rescheduled: 41,
//   rejected: 2,
//   completed: 87,
// };

const filterEventsForToday = (events: EventItem[]) => {
  const today = new Date();
  let start;
  let end;

  return events.filter(({ startDate, endDate, recurrence, recurrenceDays }) => {
    start = new Date(startDate);
    end = new Date(endDate);
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

const filterEventsUpcoming = (events: EventItem[]) => {
  const today = new Date();
  const tomorrow = startOfTomorrow();
  const lastUpcomingDay = addDays(today, 6);
  let start;
  let end;

  return events.filter(({ startDate, endDate, recurrence, recurrenceDays }) => {
    start = new Date(startDate);
    end = new Date(endDate);
    if (recurrence === RecurrenceType.NoRecurrence) {
      return (
        (!isToday(start) &&
          isFuture(start) &&
          isWithinInterval(start, {
            start: tomorrow,
            end: lastUpcomingDay,
          })) ||
        (isPast(start) && isFuture(end) && !isToday(end))
      );
    }
    if (recurrence === RecurrenceType.Daily) {
      return isPast(start);
    }
    if (recurrence === RecurrenceType.Weekly) {
    }
    if (recurrence === RecurrenceType.Monthly) {
    }
    if (recurrence === RecurrenceType.Yearly) {
    }
    if (recurrence === RecurrenceType.CertainDays) {
    }
    return false;
  });
};

const Dashboard: FC = () => {
  const events = useGetItems();
  const shortTodos = useGetShortTodos();
  const { user } = useAuthContext();
  // console.log(shortTodos)
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
        {/* <Statistic data={statisticMocks} /> */}
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
              <EventListColumn title="This week" data={eventListUpcoming} />
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
