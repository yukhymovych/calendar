import React, { FC } from "react";
import {
  isToday,
  isFuture,
  format,
  isThisWeek,
  isWithinInterval,
  isPast,
  getDay,
  getDaysInMonth,
  getMonth,
} from "date-fns";
import { useAuthContext } from "../Context/AuthProvider";
import UserInfo from "./UserInfo/UserInfo";
// import Statistic from "./Statistic/Statistic";
import EventListColumn from "./EventListColumn/EventListColumn";
import Reminder from "./ShortTodos/ShortTodos";
import SidebarDatepicker from "./SidebarDatepicker/SidebarDatepicker";
import { useGetItems, useGetShortTodos } from "../firebase/crud";

import "./Dashboard.css";
import { RecurrenceType } from "../types";

// const statisticMocks = {
//   scheduled: 24,
//   rescheduled: 41,
//   rejected: 2,
//   completed: 87,
// };

const Dashboard: FC = () => {
  const events = useGetItems();
  const shortTodos = useGetShortTodos();
  const { user } = useAuthContext();
  // console.log(shortTodos)

  const eventListTodays = events.filter(
    (item) =>
      isToday(new Date(item.startDate)) ||
      isToday(new Date(item.endDate)) ||
      isWithinInterval(new Date(), {
        start: new Date(item.startDate),
        end: new Date(item.endDate),
      }) ||
      (item.recurrence === RecurrenceType.Daily &&
        isPast(new Date(item.startDate))) ||
      (item.recurrence === RecurrenceType.Weekly &&
        isPast(new Date(item.startDate)) &&
        getDay(new Date(item.startDate)) === getDay(new Date())) ||
      (item.recurrence === RecurrenceType.Monthly &&
        isPast(new Date(item.startDate)) &&
        new Date(item.startDate).getDate() === new Date().getDate())
  );
  const eventListThisWeek = events.filter(
    (item) =>
      (!isToday(new Date(item.startDate)) &&
        isFuture(new Date(item.startDate)) &&
        isThisWeek(new Date(item.startDate), { weekStartsOn: 1 })) ||
      (isPast(new Date(item.startDate)) &&
        isFuture(new Date(item.endDate)) &&
        !isToday(new Date(item.endDate))) ||
      (item.recurrence === RecurrenceType.Daily &&
        isPast(new Date(item.startDate)))
  );
  const userInfo = {
    fullDate: format(new Date(), "cccc, MMMM d, H:mm"),
    name: user?.displayName || null,
    today: eventListTodays.length,
    upcoming: eventListThisWeek.length,
  };

  const showTodaysEvents = eventListTodays.length !== 0;
  const showThisWeekEvents = eventListThisWeek.length !== 0;
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
              <EventListColumn title="This week" data={eventListThisWeek} />
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
