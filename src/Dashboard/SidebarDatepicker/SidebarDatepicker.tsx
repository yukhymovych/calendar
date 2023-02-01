import React, { FC, useState } from "react";

import TextField from "@mui/material/TextField";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import "./SidebarDatepicker.css";

const UserInfo: FC = () => {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <>
      <div className="right-sidebar__datepicker">
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div className="button">Add Event</div>
    </>
  );
};

export default UserInfo;
