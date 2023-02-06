import React, { FC, useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useForm } from "react-hook-form";
import { uid } from "uid";
import { addItem } from "../../firebase/crud";
import { format } from "date-fns";
import { TextInput, DateTimePickerInput } from "../../components";

import "./SidebarDatepicker.css";

const UserInfo: FC = () => {
  const [
    staticDatePickerValue,
    setStaticDatepickerValue,
  ] = useState<Date | null>(new Date());
  const [open, setOpen] = useState(false);
  const formDefaultValues = {
    title: null,
    place: null,
    additional: null,
    startDate: staticDatePickerValue,
    endDate: null,
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: formDefaultValues,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleCreate = () => {
    if (isValid) {
      setOpen(false);
    }
  };

  const onSubmit = (data: any) => {
    const itemId = uid();
    const newItem = {
      ...data,
      id: itemId,
      startDate: format(data.startDate, "yyyy-MM-dd HH:mm"),
      endDate: format(data.endDate, "yyyy-MM-dd HH:mm"),
      color: null,
      status: "scheduled",
    };
    addItem(newItem);
    reset();
  };

  return (
    <>
      <div className="right-sidebar__datepicker">
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={staticDatePickerValue}
          onChange={(newValue) => {
            setStaticDatepickerValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div className="button" onClick={handleClickOpen}>
        Add Event
      </div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogContent>
            <TextInput
              name="title"
              label="Title"
              control={control}
              type="text"
              margin="dense"
              fullWidth
              variant="standard"
              isRequired
              autoFocus
            />
            {errors.title && errors.title.type === "required" && (
              <p>Title is required</p>
            )}
            <TextInput
              name="place"
              label="Place"
              control={control}
              type="text"
              margin="dense"
              fullWidth
              variant="standard"
              autoFocus
            />
            <TextInput
              name="additional"
              label="Additional description"
              control={control}
              type="text"
              margin="dense"
              fullWidth
              variant="standard"
              autoFocus
            />
            <DateTimePickerInput
              name="startDate"
              label="Start Date"
              control={control}
              ampm={false}
              isRequired
            />
            {errors.startDate && errors.startDate.type === "required" && (
              <p>Start date is required</p>
            )}
            <DateTimePickerInput
              name="endDate"
              label="End Date"
              control={control}
              ampm={false}
              isRequired
            />
            {errors.endDate && errors.endDate.type === "required" && (
              <p>End date is required</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleCreate} type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UserInfo;
