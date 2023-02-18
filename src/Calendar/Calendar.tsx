import React, { FC, useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { updateItem, useGetItems } from "../firebase/crud";
import { EventItem, EventModalType, RecurrenceType } from "../types";
import { EventModal } from "../components";
import "./Calendar.css";
import { format, addHours } from "date-fns";
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
    let newItem = {
      id: item.id,
      title: item.title,
      start: item.startDate,
      end: item.endDate,
      color: item.color || "",
      allDay: item.isAllDayEvent,
    };
    if (item.recurrence !== RecurrenceType.NoRecurrence) {
      Object.assign(newItem, {
        rrule: {
          freq: item.recurrence,
          dtstart: item.startDate,
        },
      });
    }
    return newItem;
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
      rawData.find((item: EventItem) => item.id === data.event.id);
    const editedEvent = {
      id: event?.id || "",
      title: event?.title || "",
      place: event?.place || null,
      additional: event?.additional || null,
      startDate: format(data.event.start, "yyyy-MM-dd HH:mm"),
      endDate: format(
        data.event.end || addHours(data.event.start, 1),
        "yyyy-MM-dd HH:mm"
      ),
      color: event?.color || null,
      isAllDayEvent: event?.isAllDayEvent || false,
      recurrence: event?.recurrence || "noRecurrence",
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
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
          rrulePlugin,
        ]}
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
        firstDay={1}
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
