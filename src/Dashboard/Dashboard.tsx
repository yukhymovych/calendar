import React, { FC } from "react";
import {
  isToday,
  isFuture,
  format,
  isThisWeek,
  isWithinInterval,
  isPast,
} from "date-fns";
import { useAuthContext } from "../Context/AuthProvider";
import UserInfo from "./UserInfo/UserInfo";
import Statistic from "./Statistic/Statistic";
import EventListColumn from "./EventListColumn/EventListColumn";
import Reminder from "./Reminder/Reminder";
import SidebarDatepicker from "./SidebarDatepicker/SidebarDatepicker";
import { useGetItems } from "../firebase/crud";

import "./Dashboard.css";

// const statisticMocks = {
//   scheduled: 24,
//   rescheduled: 41,
//   rejected: 2,
//   completed: 87,
// };

const reminderMocks = [
  {
    title: "Call to Maria",
    time: "13:00",
    completed: true,
  },
  {
    title: "Find september archive",
    time: "14:00",
    completed: false,
  },
];

const Dashboard: FC = () => {
  const data = useGetItems();
  const { user } = useAuthContext();

  const eventListTodays = data.filter(
    (item) =>
      isToday(new Date(item.startDate)) ||
      isToday(new Date(item.endDate)) ||
      isWithinInterval(new Date(), {
        start: new Date(item.startDate),
        end: new Date(item.endDate),
      })
  );
  const eventListThisWeek = data.filter(
    (item) =>
      (!isToday(new Date(item.startDate)) &&
        isFuture(new Date(item.startDate)) &&
        isThisWeek(new Date(item.startDate), { weekStartsOn: 1 })) ||
      (isPast(new Date(item.startDate)) &&
        isFuture(new Date(item.endDate)) &&
        !isToday(new Date(item.endDate)))
  );
  const userInfo = {
    fullDate: format(new Date(), "cccc, MMMM d, H:mm"),
    name: user?.displayName || null,
    today: eventListTodays.length,
    upcoming: eventListThisWeek.length,
  };

  return (
    <div className="content">
      <div className="left-sidebar">
        <UserInfo data={userInfo} />
        {/* <Statistic data={statisticMocks} /> */}
      </div>

      <div className="event-list">
        {eventListTodays.length !== 0 && (
          <EventListColumn
            title="Today's Events"
            data={eventListTodays}
            today
          />
        )}
        {eventListThisWeek.length !== 0 && (
          <EventListColumn title="This week" data={eventListThisWeek} />
        )}
      </div>

      <div className="right-sidebar">
        <SidebarDatepicker />
        <Reminder data={reminderMocks} />
      </div>
    </div>
  );
};

export default Dashboard;
