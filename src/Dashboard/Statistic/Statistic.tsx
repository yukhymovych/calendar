import React, { FC } from "react";

import "./Statistic.css";

interface StatisticProps {
  data: {
    scheduled: number;
    rescheduled: number;
    rejected: number;
    completed: number;
  };
}

const Statistic: FC<StatisticProps> = ({ data }) => {
  const { scheduled, rescheduled, rejected, completed } = data;

  return (
    <div className="statistic">
      <div className="statistic__box staticstic__box-color-1">
        <div className="statistic__icon">
          <img src="/" alt="" />
        </div>
        <p className="statistic__number">{scheduled}</p>
        <p className="statistic__name">Scheduled</p>
      </div>
      <div className="statistic__box staticstic__box-color-2">
        <div className="statistic__icon">
          <img src="/" alt="" />
        </div>
        <p className="statistic__number">{rescheduled}</p>
        <p className="statistic__name">Rescheduled</p>
      </div>
      <div className="statistic__box staticstic__box-color-3">
        <div className="statistic__icon">
          <img src="/" alt="" />
        </div>
        <p className="statistic__number">{rejected}</p>
        <p className="statistic__name">Rejected</p>
      </div>
      <div className="statistic__box staticstic__box-color-4">
        <div className="statistic__icon">
          <img src="/" alt="" />
        </div>
        <p className="statistic__number">{completed}</p>
        <p className="statistic__name">Completed</p>
      </div>
    </div>
  );
};

export default Statistic;
