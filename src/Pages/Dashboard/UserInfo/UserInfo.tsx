import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './UserInfo.css';

interface UserInfoProps {
  data: {
    fullDate: string;
    today: number;
    upcoming: number;
  };
}

const UserInfo: FC<UserInfoProps> = ({ data }) => {
  const { fullDate, today, upcoming } = data;

  return (
    <div className="user-info">
      <div className="user-info__date">
        <p className="text big-text">{fullDate}</p>
      </div>
      <div className="user-info__greeting">
        <h2 className="header">Hi there!</h2>
      </div>
      <div className="user-info__planned">
        <p className="text">You have:</p>
        <p className="text planned__text">
          {today} event{today > 1 && 's'} <span className="today">today</span>
        </p>
        <p className="text planned__text">
          {upcoming} event{upcoming > 1 && 's'}{' '}
          <span className="upcoming">this week</span>
        </p>
      </div>
      <Link to="/calendar">
        <div className="button outlined">View Schedule</div>
      </Link>
    </div>
  );
};

export default UserInfo;
