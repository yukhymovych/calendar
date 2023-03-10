import React, { FC, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  formatDistanceToNowStrict,
  isPast,
  isToday,
  set,
} from 'date-fns';
import { EventModal, ItemRemoveModal } from '../../../components';
import { EventModalType, EventItem, RecurrenceType } from '../../../types';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import { colorOptions } from '../../../components/SelectColor/colors';
import './EventListColumn.css';

interface EventListColumnProps {
  title: string;
  data: EventItem[];
  today?: boolean;
}

const EventListColumn: FC<EventListColumnProps> = ({
  title,
  data,
  today = false,
}) => {
  const [showAll, setShowAll] = useState(false);
  const showSeeAllButton = data.length > 4;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [removeEventId, setRemoveEventId] = useState('');
  const [initialEventData, setInitialEventData] = useState<EventItem>({
    id: '',
    title: '',
    startDate: '',
    endDate: '',
    place: '',
    additional: '',
    color: '',
    isAllDayEvent: false,
    recurrence: 'noRecurrence',
    recurrenceDays: [],
  });
  const formatMonthDay = 'MMMM d';
  const formatHoursMinutes = 'HH:mm';
  const formatMonthDayHoursMinutes = 'MMM.dd, HH:mm';

  const getTodayStartTime = (startDate: string | Date, recurrence: string) => {
    const todayDate = new Date();
    const isPastTime = isPast(new Date(startDate));
    const todayRelativeTime = isPastTime
      ? formatDistanceToNowStrict(
          set(new Date(startDate), {
            year: todayDate.getFullYear(),
            month: todayDate.getMonth(),
            date: todayDate.getDate(),
          })
        ) + ' ago'
      : 'in ' + formatDistanceToNowStrict(new Date(startDate));
    if (!today && recurrence !== RecurrenceType.NoRecurrence) {
      if (recurrence === RecurrenceType.CertainDays) return 'Weekly';
      return recurrence.charAt(0).toUpperCase() + recurrence.slice(1);
    }

    return today
      ? todayRelativeTime
      : format(new Date(startDate), formatMonthDay);
  };

  const getTimeRange = (event: EventItem, daysAmountInRange: number) => {
    if (event.isAllDayEvent) return 'All day';
    if (daysAmountInRange > 1) {
      if (today) {
        if (isToday(new Date(event.startDate)))
          return (
            'from ' + format(new Date(event.startDate), formatHoursMinutes)
          );
        if (isToday(new Date(event.endDate)))
          return 'to ' + format(new Date(event.endDate), formatHoursMinutes);
        return 'All day';
      }
      return (
        format(new Date(event.startDate), formatMonthDayHoursMinutes) +
        ' to ' +
        format(new Date(event.endDate), formatMonthDayHoursMinutes)
      );
    }

    const startEndTimePeriod =
      format(new Date(event.startDate), formatHoursMinutes) +
      '-' +
      format(new Date(event.endDate), formatHoursMinutes);

    return startEndTimePeriod;
  };

  const handleEdit = (item: EventItem) => {
    setInitialEventData(item);
    setOpenEditModal(true);
  };

  const handleRemove = (itemId: string) => {
    setRemoveEventId(itemId);
    setOpenRemoveModal(true);
  };

  return (
    <div className="event-list__column">
      <div className="event-list__top">
        <h2 className="header">{title}</h2>
        {showSeeAllButton && (
          <span className="link active" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Collapse' : 'See All'}
          </span>
        )}
      </div>
      <TransitionGroup>
        {data.slice(0, showAll ? data.length : 4).map((event: EventItem) => {
          const daysAmountInRange = eachDayOfInterval({
            start: new Date(event.startDate),
            end: new Date(event.endDate),
          }).length;
          const dayOfRange =
            differenceInCalendarDays(new Date(), new Date(event.startDate)) + 1;
          const colorPalette = colorOptions.find(
            (color) => color.value === event.color
          );

          return (
            <Collapse key={event.id}>
              <div className="event-list__item">
                <Grid container justifyContent="space-between">
                  <h2
                    className="sub-header"
                    style={{
                      color: colorPalette?.value,
                    }}
                  >
                    {event.title}{' '}
                    {today &&
                      daysAmountInRange > 1 &&
                      `(${dayOfRange} of ${daysAmountInRange} days )`}
                  </h2>
                  <div className="event-list__button-wrapper">
                    <div
                      className="event-list__item-button"
                      onClick={() => handleEdit(event)}
                    >
                      <EditIcon fontSize="small" />
                    </div>
                    <div
                      className="event-list__item-button"
                      onClick={() => handleRemove(event.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </div>
                  </div>
                </Grid>
                <p className="text">
                  <AccessTimeIcon fontSize="small" />
                  {getTimeRange(event, daysAmountInRange)}
                </p>
                {event.place && (
                  <p className="text">
                    <PlaceIcon fontSize="small" />
                    {event.place}
                  </p>
                )}
                {event.additional && (
                  <p className="text">
                    <ApartmentIcon fontSize="small" />
                    {event.additional}
                  </p>
                )}
                {!event.isAllDayEvent && (
                  <div
                    className="event-list__item-time"
                    style={{
                      color: colorPalette?.value,
                      backgroundColor: colorPalette?.secondary,
                    }}
                  >
                    {getTodayStartTime(event.startDate, event.recurrence)}
                  </div>
                )}
              </div>
            </Collapse>
          );
        })}
      </TransitionGroup>
      <EventModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        type={EventModalType.Edit}
        initialData={initialEventData}
      />
      <ItemRemoveModal
        open={openRemoveModal}
        setOpen={setOpenRemoveModal}
        eventId={removeEventId}
        itemName="event"
      />
    </div>
  );
};

export default EventListColumn;
