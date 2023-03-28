import React, { FC, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg, EventDropArg } from '@fullcalendar/core';
import { RRule } from 'rrule';

import { EventItem, RecurrenceType } from '../../types';

const dayMap: Record<string, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

interface CalendarAdapterProps {
  onDateCellClick: (data: DateClickArg) => void;
  onEventClick: (data: EventClickArg) => void;
  onEventDrop: (data: EventDropArg) => void;
  events: EventItem[];
  is12HourFormat: boolean;
}

const formatData = (events: EventItem[]) => {
  const formattedEvents = events.map((item: EventItem) => {
    const formattedEvent = {
      id: item.id,
      title: item.title,
      start: item.startDate,
      end: item.endDate,
      color: item.color || '',
      allDay: item.isAllDayEvent,
    };
    const isRecurrence = item.recurrence !== RecurrenceType.NoRecurrence;
    const isCertainDaysReccurence =
      item.recurrence === RecurrenceType.CertainDays;
    if (isRecurrence) {
      if (isCertainDaysReccurence) {
        Object.assign(formattedEvent, {
          rrule: {
            freq: RRule.WEEKLY,
            dtstart: item.startDate,
            byweekday:
              item.recurrenceDays &&
              item.recurrenceDays.map((day: string) => dayMap[day]),
          },
        });
      }
      if (!isCertainDaysReccurence) {
        Object.assign(formattedEvent, {
          rrule: {
            freq: item.recurrence,
            dtstart: item.startDate,
          },
        });
      }
    }
    return formattedEvent;
  });
  return formattedEvents;
};

export const CalendarAdapter: FC<CalendarAdapterProps> = ({
  onDateCellClick,
  onEventClick,
  onEventDrop,
  events,
  is12HourFormat,
}) => {
  const formattedEvents = useMemo(() => formatData(events), [events]);
  return (
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
        hour12: is12HourFormat,
        meridiem: is12HourFormat,
      }}
      displayEventEnd
      events={formattedEvents}
    />
  );
};
