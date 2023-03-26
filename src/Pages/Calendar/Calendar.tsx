import React, { FC, useState } from 'react';
import { format, addHours } from 'date-fns';
import { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg, EventDropArg } from '@fullcalendar/core';

import { EventModal } from '../../components';
import { CalendarAdapter } from './CalendarAdapter';

import { updateEvent, useGetEvents } from '../../api';
import { useAuthContext } from '../../context';
import { EventItem, EventModalType } from '../../types';
import { fullDateTimeFormat } from '../../constants';

export const Calendar: FC = () => {
  const { user } = useAuthContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [eventForEdit, setEventForEdit] = useState<EventItem | undefined>(
    undefined
  );
  const [eventModalType, setEventModalType] = useState(EventModalType.Edit);
  const [createStartDate, setCreateStartDate] = useState(new Date());

  const eventsData = useGetEvents();

  const handleEventClick = (data: EventClickArg) => {
    setEventModalType(EventModalType.Edit);
    const event =
      eventsData.find((item: EventItem) => item.id === data.event.id) ||
      undefined;
    setEventForEdit(event);
    setOpenEditModal(true);
  };

  const handleEventDrop = (data: EventDropArg) => {
    const event = eventsData.find(
      (item: EventItem) => item.id === data.event.id
    );
    const editedEvent = {
      id: event?.id || '',
      title: event?.title || '',
      place: event?.place || '',
      additional: event?.additional || '',
      startDate: format(data.event.start || new Date(), fullDateTimeFormat),
      endDate: format(
        data.event.end || addHours(data.event.start || new Date(), 1),
        fullDateTimeFormat
      ),
      color: event?.color || 'none',
      isAllDayEvent: event?.isAllDayEvent || false,
      recurrence: event?.recurrence || 'noRecurrence',
      recurrenceDays: event?.recurrenceDays || [],
    };
    if (user) updateEvent(editedEvent, user?.uid);
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
        events={eventsData}
        is12HourFormat={false}
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
