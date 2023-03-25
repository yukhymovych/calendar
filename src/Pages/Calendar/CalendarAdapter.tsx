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

type FormattedEvents = {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  color: string;
  allDay: boolean;
};

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

export const CalendarAdapter: FC<CalendarAdapterProps> = ({
  onDateCellClick,
  onEventClick,
  onEventDrop,
  events,
  is12HourFormat,
}) => {
  const formattedData: FormattedEvents[] = useMemo(
    () =>
      events.map((item: EventItem) => {
        const formattedItem = {
          id: item.id,
          title: item.title,
          start: item.startDate,
          end: item.endDate,
          color: item.color || '',
          allDay: item.isAllDayEvent,
        };
        if (item.recurrence !== RecurrenceType.NoRecurrence) {
          if (
            item.recurrence === RecurrenceType.CertainDays &&
            item?.recurrenceDays
          ) {
            Object.assign(formattedItem, {
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
            Object.assign(formattedItem, {
              rrule: {
                freq: item.recurrence,
                dtstart: item.startDate,
              },
            });
          }
        }
        return formattedItem;
      }),
    [events]
  );

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
          hour12: is12HourFormat,
          meridiem: is12HourFormat,
        }}
        displayEventEnd
        events={formattedData}
      />
    </>
  );
};
