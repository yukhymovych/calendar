import React, { FC, useEffect } from "react";
import { isToday, isFuture } from "date-fns";

import UserInfo from "./UserInfo/UserInfo";
import Statistic from "./Statistic/Statistic";
import EventListColumn from "./EventListColumn/EventListColumn";
import Reminder from "./Reminder/Reminder";
import SidebarDatepicker from "./SidebarDatepicker/SidebarDatepicker";
import { useGetItems } from "../firebase/crud";

import "./Dashboard.css";

const userInfoMocks = {
  fullDate: "Saturday, October 14, 07:00",
  name: "Anatolii",
  today: 1,
  upcoming: 7,
};

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

  return (
    <div className="content">
      <div className="left-sidebar">
        <UserInfo data={userInfoMocks} />
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
