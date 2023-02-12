import React, { FC, useEffect } from "react";
import { isToday, isFuture } from "date-fns";

import UserInfo from "./UserInfo/UserInfo";
import Statistic from "./Statistic/Statistic";
import EventListColumn from "./EventListColumn/EventListColumn";
import Reminder from "./Reminder/Reminder";
import SidebarDatepicker from "./SidebarDatepicker/SidebarDatepicker";
import { useGetItems } from "../firebase/crud";

import "./Dashboard.css";
import { format } from "date-fns";

const statisticMocks = {
  scheduled: 24,
  rescheduled: 41,
  rejected: 2,
  completed: 87,
};

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

  const eventListTodays = data.filter((item) =>
    isToday(new Date(item.startDate))
  );
  const eventListUpcoming = data.filter(
    (item) =>
      !isToday(new Date(item.startDate)) && isFuture(new Date(item.startDate))
  );
  const userInfo = {
    fullDate: format(new Date(), "cccc, MMMM d, H:mm"),
    name: "Anatolii",
    today: eventListTodays.length,
    upcoming: eventListUpcoming.length,
  };

  return (
    <div className="content">
      <div className="left-sidebar">
        <UserInfo data={userInfo} />
        <Statistic data={statisticMocks} />
      </div>

      <div className="event-list">
        {eventListTodays.length !== 0 && (
          <EventListColumn
            title="Today's Events"
            data={eventListTodays}
            today
          />
        )}
        {eventListUpcoming.length !== 0 && (
          <EventListColumn title="Upcoming" data={eventListUpcoming} />
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
