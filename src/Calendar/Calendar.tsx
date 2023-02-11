import React, { FC, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { updateItem, useGetItems } from "../firebase/crud";
import { EventItem, EventModalType } from "../types";
import { EventModal } from "../components";
import "./Calendar.css";
import { format } from "date-fns";

const Calendar: FC = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [eventForEdit, setEventForEdit] = useState<EventItem | undefined>(
    undefined
  );

  const rawData = useGetItems();

  const formattedData = rawData.map((item: EventItem) => {
    return {
      id: item.id,
      title: item.title,
      start: item.startDate,
      end: item.endDate,
    };
  });

  const handleEventClick = (data: any) => {
    const event =
      rawData.find((item: EventItem) => item.id === data.event.id) || undefined;
    setEventForEdit(event);
    setOpenEditModal(true);
  };

  const handleEventDrop = (data: any) => {
    const event =
      rawData.find((item: EventItem) => item.id === data.event.id) || undefined;
    const editedEvent = {
      id: event?.id || "",
      title: event?.title || "",
      place: event?.place || null,
      additional: event?.additional || null,
      startDate: format(data.event.start, "yyyy-MM-dd HH:mm"),
      endDate: format(data.event.end, "yyyy-MM-dd HH:mm"),
      color: event?.color || null,
    };
    updateItem(editedEvent);
  };

  const handleDateClick = (data: any) => {
    console.log("date click", data);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth" //dayGridMonth, timeGridWeek, listWeek, dayGridWeek
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        editable={true}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          meridiem: false,
        }}
        displayEventEnd
        events={formattedData}
      />
      <EventModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        type={EventModalType.Edit}
        initialData={eventForEdit}
        removeButton
      />
    </>
  );
};

export default Calendar;
