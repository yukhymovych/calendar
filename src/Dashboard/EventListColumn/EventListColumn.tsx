import React, { FC, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import { format, formatDistanceToNowStrict, isPast } from "date-fns";
import { EventModal, EventRemoveModal } from "../../components";
import { EventModalType, EventItem } from "../../types";
import "./EventListColumn.css";

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
  const [removeEventId, setRemoveEventId] = useState("");
  const [initialEventData, setInitialEventData] = useState<EventItem>({
    id: "",
    title: "",
    startDate: "",
    endDate: "",
    place: "",
    additional: "",
    color: "",
  });

  const getTodayStartTime = (startDate: string | Date) => {
    const isPastTime = isPast(new Date(startDate));
    const todayTime = isPastTime
      ? formatDistanceToNowStrict(new Date(startDate)) + " ago"
      : "in " + formatDistanceToNowStrict(new Date(startDate));
    return today ? todayTime : format(new Date(startDate), "MMMM d");
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
        <h2 className="h2">{title}</h2>
        {showSeeAllButton && (
          <a
            className="link active"
            href="#"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Collapse" : "See All"}
          </a>
        )}
      </div>
      {data.slice(0, showAll ? data.length : 4).map((item) => {
        const startEndTimePeriod =
          format(new Date(item.startDate), "HH:mm") +
          "-" +
          format(new Date(item.endDate), "HH:mm");

        return (
          <div className="event-list__item">
            <Grid container justifyContent="space-between">
              <h2 className="h3">{item.title}</h2>
              <div className="event-list__button-wrapper">
                <div
                  className="event-list__item-button"
                  onClick={() => handleEdit(item)}
                >
                  <EditIcon fontSize="small" />
                </div>
                <div
                  className="event-list__item-button"
                  onClick={() => handleRemove(item.id)}
                >
                  <DeleteIcon fontSize="small" />
                </div>
              </div>
            </Grid>
            <p className="p">
              <AccessTimeIcon fontSize="small" />
              {startEndTimePeriod}
            </p>
            {item.place && (
              <p className="p">
                <PlaceIcon fontSize="small" />
                {item.place}
              </p>
            )}
            {item.additional && (
              <p className="p">
                <ApartmentIcon fontSize="small" />
                {item.additional}
              </p>
            )}
            <div className="event-list__item-time">
              {getTodayStartTime(item.startDate)}
            </div>
          </div>
        );
      })}
      <EventModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        type={EventModalType.Edit}
        initialData={initialEventData}
      />
      <EventRemoveModal
        open={openRemoveModal}
        setOpen={setOpenRemoveModal}
        eventId={removeEventId}
      />
    </div>
  );
};

export default EventListColumn;
