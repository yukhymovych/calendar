import React, { FC, useEffect } from "react";

import UserInfo from "./UserInfo/UserInfo";
import Statistic from "./Statistic/Statistic";
import EventListColumn from "./EventListColumn/EventListColumn";
import Reminder from "./Reminder/Reminder";
import SidebarDatepicker from "./SidebarDatepicker/SidebarDatepicker";
import { getItems } from "../firebase/crud";

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

const eventListTodaysMocks = [
  {
    title: "Meeting with John",
    time: "07:30-11:00",
    place: "London, Great Street, 18",
    additional: "Atlant agency",
    status: "in 15 min",
  },
  {
    title: "Meeting with John",
    time: "07:30-11:00",
    place: "London, Great Street, 18",
    additional: "Atlant agency",
    status: "Rejected",
  },
];

const eventListUpcomingMocks = [
  {
    title: "Job Interview",
    time: "07:30-11:00",
    place: "London, Great Street, 18",
    additional: "Atlant agency",
    status: "October 15",
  },
];

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
  const data = getItems();
  
  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className="content">
      <div className="left-sidebar">
        <UserInfo data={userInfoMocks} />
        <Statistic data={statisticMocks} />
      </div>

      <div className="event-list">
        <EventListColumn title="Today's Events" data={eventListTodaysMocks} />
        <EventListColumn title="Upcoming" data={eventListUpcomingMocks} />
      </div>

      <div className="right-sidebar">
        <SidebarDatepicker />
        <Reminder data={reminderMocks} />
      </div>
    </div>
  );
};

export default Dashboard;
