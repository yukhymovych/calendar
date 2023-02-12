import React, { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { EventModal } from "../../components";
import { EventModalType } from "../../types";
import "./SidebarDatepicker.css";

const UserInfo: FC = () => {
  const [defaultStartDate, setDefaultStartDate] = useState<Date>(
    new Date()
  );
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="right-sidebar__datepicker">
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={defaultStartDate}
          onChange={(newValue) => {
            setDefaultStartDate(newValue as Date);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div className="button" onClick={handleClickOpen}>
        Add Event
      </div>
      <EventModal
        open={open}
        setOpen={setOpen}
        defaultStartDate={defaultStartDate}
        type={EventModalType.Create}
      />
    </>
  );
};

export default UserInfo;
