import React, { FC, useState, useMemo } from 'react';
import { format, addHours } from 'date-fns';
import { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg, EventDropArg } from '@fullcalendar/core';
import { RRule } from 'rrule';

import { updateItem, useGetItems } from '../../firebase/crud';
import { useAuthContext } from '../../context/auth-provider';
import { EventItem, EventModalType, RecurrenceType } from '../../types';

import { EventModal } from '../../components';
import { CalendarAdapter } from './CalendarAdapter';

const dayMap: Record<string, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

export const Calendar: FC = () => {
  const { user } = useAuthContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [eventForEdit, setEventForEdit] = useState<EventItem | undefined>(
    undefined
  );
  const [eventModalType, setEventModalType] = useState(EventModalType.Edit);
  const [createStartDate, setCreateStartDate] = useState(new Date());
  const formatFullDateTime = 'yyyy-MM-dd HH:mm';

  const rawData = useGetItems();

  const formattedData = useMemo(
    () =>
      rawData.map((item: EventItem) => {
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
      id: event?.id || '',
      title: event?.title || '',
      place: event?.place || '',
      additional: event?.additional || '',
      startDate: format(data.event.start || new Date(), formatFullDateTime),
      endDate: format(
        data.event.end || addHours(data.event.start || new Date(), 1),
        formatFullDateTime
      ),
      color: event?.color || 'none',
      isAllDayEvent: event?.isAllDayEvent || false,
      recurrence: event?.recurrence || 'noRecurrence',
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
      <CalendarAdapter
        onDateCellClick={handleDateCellClick}
        onEventClick={handleEventClick}
        onEventDrop={handleEventDrop}
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
