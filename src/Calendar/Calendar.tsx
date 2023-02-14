import React, { FC, useState, useRef } from "react";
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
import { useAuthContext } from "../Context/AuthProvider";

const Calendar: FC = () => {
  const { user } = useAuthContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [eventForEdit, setEventForEdit] = useState<EventItem | undefined>(
    undefined
  );
  const [eventModalType, setEventModalType] = useState(EventModalType.Edit);
  const [createStartDate, setCreateStartDate] = useState(new Date());
  const calendarRef = useRef<FullCalendar | null>(null);

  const rawData = useGetItems();

  const formattedData = rawData.map((item: EventItem) => {
    return {
      id: item.id,
      title: item.title,
      start: item.startDate,
      end: item.endDate,
      color: item.color || "",
    };
  });

  const handleEventClick = (data: any) => {
    setEventModalType(EventModalType.Edit);
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
    updateItem(editedEvent, user?.uid);
  };

  const handleDateCellClick = (data: any) => {
    setCreateStartDate(data.date);
    setEventModalType(EventModalType.Create);
    setOpenEditModal(true);
  };

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={{
          left: "title",
          right: "dayGridMonth,listWeek,dayGridWeek,today,prev,next",
        }}
        initialView="dayGridMonth" //dayGridMonth, timeGridWeek, listWeek, dayGridWeek
        dateClick={handleDateCellClick}
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
        type={eventModalType}
        initialData={
          eventModalType === EventModalType.Edit ? eventForEdit : undefined
        }
        defaultStartDate={
          eventModalType === EventModalType.Create ? createStartDate : undefined
        }
        removeButton={eventModalType === EventModalType.Edit}
      />
    </>
  );
};

export default Calendar;
