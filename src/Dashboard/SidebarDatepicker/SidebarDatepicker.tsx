import React, { FC, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import "./SidebarDatepicker.css";

const UserInfo: FC = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      <div className="button" onClick={handleClickOpen}>
        Add Event
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="place"
            label="Place"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="additional"
            label="Additional description"
            type="text"
            fullWidth
            variant="standard"
          />
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Start Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            ampm={false}
          />
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="End Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            ampm={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserInfo;
