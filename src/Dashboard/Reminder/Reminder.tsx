import React, { FC } from "react";

import { Checkbox, FormControlLabel } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

import "./Reminder.css";

interface ReminderProps {
  data: {
    title: string;
    time: string;
    completed: boolean;
  }[];
}

const Reminder: FC<ReminderProps> = ({ data }) => {
  return (
    <div className="right-sidebar__reminder">
      <div className="reminder__top">
        <h3 className="h3">Reminders</h3>
        <div>
          <AddCircleOutlinedIcon sx={{ color: "#3664da" }} />
        </div>
      </div>
      {data.map((item) => (
        <div className="reminder__item">
          <FormControlLabel
            label={item.title}
            control={<Checkbox defaultChecked={item.completed} />}
          />
          <p className="p">{item.time}</p>
        </div>
      ))}
    </div>
  );
};

export default Reminder;
