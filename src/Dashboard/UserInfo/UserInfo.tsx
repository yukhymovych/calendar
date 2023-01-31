import React, { FC } from "react";
import { Link } from "react-router-dom";

import "./UserInfo.css";

interface UserInfoProps {
  data: {
    fullDate: string;
    name: string;
    today: number;
    upcoming: number;
  };
}

const UserInfo: FC<UserInfoProps> = ({ data }) => {
  const { fullDate, name, today, upcoming } = data;

  return (
    <div className="user-info">
      <div className="user-info__date">
        <p className="p big-p">{fullDate}</p>
      </div>
      <div className="user-info__greeting">
        <h2 className="h2">Hi, {name}</h2>
      </div>
      <div className="user-info__planned">
        <p className="p">You have:</p>
        <p className="p planned__text">
          {today} meeting{today > 1 && "s"}{" "}
          <span className="today">today</span>
        </p>
        <p className="p planned__text">
          {upcoming} meeting{upcoming > 1 && "s"}{" "}
          <span className="upcoming">in next week</span>
        </p>
      </div>
      <Link to="/calendar">
        <div className="button outlined">View Schedule</div>
      </Link>
    </div>
  );
};

export default UserInfo;
