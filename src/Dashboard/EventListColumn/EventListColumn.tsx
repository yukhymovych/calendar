import React, { FC, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { EventItem } from "../../types";
import { format, formatDistanceToNowStrict } from "date-fns";
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
        const startTime = today
          ? "in " + formatDistanceToNowStrict(new Date(item.startDate))
          : format(new Date(item.startDate), "MMMM d");

        return (
          <div className="event-list__item">
            <h2 className="h3">{item.title}</h2>
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
            <div className="event-list__item-bottom">
              {item.additional ? (
                <p className="p">
                  <ApartmentIcon fontSize="small" />
                  {item.additional}
                </p>
              ) : (
                <div></div>
              )}
              <div className="event-list__item-time">{startTime}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventListColumn;
