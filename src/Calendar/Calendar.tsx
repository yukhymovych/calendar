import React, { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

const Calendar: FC = () => {
  const handleClick = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth" //dayGridMonth, timeGridWeek, listWeek, dayGridWeek
        dateClick={handleClick}
        eventClick={handleClick}
        editable={true}
        events={[
          { title: "event 1", date: "2023-02-01" },
          { title: "event 2", date: "2023-02-02" },
        ]}
      />
    </>
  );
};

export default Calendar;
