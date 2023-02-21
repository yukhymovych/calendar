import React, { FC, useState, useRef, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { updateItem, useGetItems } from "../firebase/crud";
import { EventItem, EventModalType, RecurrenceType } from "../types";
import { EventModal } from "../components";
import "./Calendar.css";
import { format, addHours } from "date-fns";
import { useAuthContext } from "../Context/AuthProvider";
import { RRule } from "rrule";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";

const dayMap: Record<string, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

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

  const formattedData = useMemo(
    () =>
      rawData.map((item: EventItem) => {
        let newItem = {
          id: item.id,
          title: item.title,
          start: item.startDate,
          end: item.endDate,
          color: item.color || "",
          allDay: item.isAllDayEvent,
        };
        if (item.recurrence !== RecurrenceType.NoRecurrence) {
          if (
            item.recurrence === RecurrenceType.CertainDays &&
            item?.recurrenceDays
          ) {
            Object.assign(newItem, {
              rrule: {
                freq: RRule.WEEKLY,
                dtstart: item.startDate,
                byweekday: item.recurrenceDays.map(
                  (day: string) => dayMap[day]
                ),
              },
            });
          }
          if (item.recurrence !== RecurrenceType.CertainDays) {
            Object.assign(newItem, {
              rrule: {
                freq: item.recurrence,
                dtstart: item.startDate,
              },
            });
          }
        }
        return newItem;
      }),
    [rawData]
  );

  const handleEventClick = (data: EventClickArg) => {
    setEventModalType(EventModalType.Edit);
    const event =
      rawData.find((item: EventItem) => item.id === data.event.id) || undefined;
    setEventForEdit(event);
    setOpenEditModal(true);
  };

  const handleEventDrop = (data: EventDropArg) => {
    const event = rawData.find((item: EventItem) => item.id === data.event.id);
    const editedEvent = {
      id: event?.id || "",
      title: event?.title || "",
      place: event?.place || null,
      additional: event?.additional || null,
      startDate: format(data.event.start || new Date(), "yyyy-MM-dd HH:mm"),
      endDate: format(
        data.event.end || addHours(data.event.start || new Date(), 1),
        "yyyy-MM-dd HH:mm"
      ),
      color: event?.color || null,
      isAllDayEvent: event?.isAllDayEvent || false,
      recurrence: event?.recurrence || "noRecurrence",
      recurrenceDays: event?.recurrenceDays || [],
    };
    if (user) updateItem(editedEvent, user?.uid);
  };

  const handleDateCellClick = (data: DateClickArg) => {
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
