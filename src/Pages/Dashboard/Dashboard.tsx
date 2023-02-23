import React, { FC, useMemo } from "react";
import { format } from "date-fns";
import UserInfo from "./UserInfo/UserInfo";
import EventListColumn from "./EventListColumn/EventListColumn";
import Reminder from "./ShortTodos/ShortTodos";
import SidebarDatepicker from "./SidebarDatepicker/SidebarDatepicker";
import { useGetItems, useGetShortTodos } from "../../firebase/crud";
import { filterEventsForToday, filterEventsUpcoming } from "./FilteringEvents";
import "./Dashboard.css";

export const Dashboard: FC = () => {
  const events = useGetItems();
  const shortTodos = useGetShortTodos();
  const eventListTodays = useMemo(() => filterEventsForToday(events), [events]);
  const eventListUpcoming = useMemo(
    () => filterEventsUpcoming(events),
    [events]
  );

  const userInfoDateFormat = "cccc, MMMM d, H:mm";
  const userInfo = {
    fullDate: format(new Date(), userInfoDateFormat),
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
              <EventListColumn
                title="Upcoming Events"
                data={eventListUpcoming}
              />
            )}
          </>
        ) : (
          <h2 className="sub-header">
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
