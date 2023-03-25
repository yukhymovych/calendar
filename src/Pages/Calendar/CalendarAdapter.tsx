import React, { FC } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg, EventDropArg } from '@fullcalendar/core';

interface CalendarAdapterProps {
  onDateCellClick: (data: DateClickArg) => void;
  onEventClick: (data: EventClickArg) => void;
  onEventDrop: (data: EventDropArg) => void;
  events: any;
}

export const CalendarAdapter: FC<CalendarAdapterProps> = ({
  onDateCellClick,
  onEventClick,
  onEventDrop,
  events,
}) => {
  return (
    <>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          interactionPlugin,
          rrulePlugin,
        ]}
        headerToolbar={{
          left: 'title',
          right: 'dayGridMonth,listWeek,dayGridWeek,today,prev,next',
        }}
        initialView="dayGridMonth"
        dateClick={onDateCellClick}
        eventClick={onEventClick}
        eventDrop={onEventDrop}
        editable={true}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          meridiem: false,
        }}
        displayEventEnd
        events={events}
      />
    </>
  );
};
