import React, { FC } from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import ApartmentIcon from "@mui/icons-material/Apartment";

import "./EventListColumn.css";

interface EventListColumnProps {
  title: string;
  data: {
    title: string;
    time: string;
    place: string;
    additional: string;
    status: string;
  }[];
}

const EventListColumn: FC<EventListColumnProps> = ({ title, data }) => {
  return (
    <div className="event-list__column">
      <div className="event-list__top">
        <h2 className="h2">{title}</h2>
        <a className="link active" href="#">
          See All
        </a>
      </div>
      {data.map((item) => (
        <div className="event-list__item">
          <h2 className="h3">{item.title}</h2>
          <p className="p">
            <AccessTimeIcon fontSize="small" />
            {item.time}
          </p>
          <p className="p">
            <PlaceIcon fontSize="small" />
            {item.place}
          </p>
          <div className="event-list__item-bottom">
            <p className="p">
              <ApartmentIcon fontSize="small" />
              {item.additional}
            </p>
            <div className="event-list__item-time">{item.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventListColumn;
