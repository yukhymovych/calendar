import React, { FC, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { uid } from "uid";
import { addItem, updateItem } from "../../firebase/crud";
import { format, addHours } from "date-fns";
import { EventModalType, EventItem } from "../../types";

interface EventModalProps {
  staticDatePickerValue?: Date;
  open: boolean;
  setOpen: (value: boolean) => void;
  type: EventModalType;
  initialData?: EventItem;
}

export const EventModal: FC<EventModalProps> = ({
  staticDatePickerValue = new Date(),
  open = false,
  setOpen,
  type = EventModalType.Create,
  initialData,
}) => {
  const modalTitleText =
    type === EventModalType.Create ? "Create New Event" : "Edit Event";
  const modalSubmitButtonText =
    type === EventModalType.Create ? "Create" : "Save";
  const formDefaultValue = {
    title: "",
    place: "",
    additional: "",
    startDate: staticDatePickerValue,
    endDate: addHours(staticDatePickerValue, 1),
  };

  const [formData, setFormData] = useState(formDefaultValue);

  const setDefaultData = () => {
    if (initialData) {
      const { id, color, ...data } = initialData;
      setFormData(data as any);
    } else {
      setFormData(formDefaultValue);
    }
  };

  useEffect(() => {
    setDefaultData();
  }, [initialData]);

  const handleClose = () => {
    setOpen(false);
    setDefaultData();
  };

  const handleSubmitButton = () => {
    setOpen(false);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (type === EventModalType.Create) {
      const itemId = uid();
      const newItem = {
        id: itemId,
        title: formData.title,
        place: formData.place || null,
        additional: formData.additional || null,
        startDate: format(formData.startDate, "yyyy-MM-dd HH:mm"),
        endDate: format(formData.endDate, "yyyy-MM-dd HH:mm"),
        color: null,
      };
      addItem(newItem);
    } else {
      const editedItem = {
        ...initialData,
        ...formData,
        id: initialData && initialData.id || "",
        startDate: format(new Date(formData.startDate), "yyyy-MM-dd HH:mm"),
        endDate: format(new Date(formData.endDate), "yyyy-MM-dd HH:mm"),
        color: null,
      };
      console.log(editedItem);
      updateItem(editedItem);
    }
  };

  const handleChange = (data: any) => {
    setFormData({
      ...formData,
      [data.target.name]: data.target.value,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleOnSubmit}>
        <DialogTitle>{modalTitleText}</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            type="text"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.title}
            required
          />
          <TextField
            name="place"
            label="Place"
            type="text"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.place}
          />
          <TextField
            name="additional"
            label="Additional description"
            type="text"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={handleChange}
            value={formData.additional}
          />
          <DateTimePicker
            renderInput={(innerProps) => <TextField {...innerProps} />}
            label="Start Date"
            value={formData.startDate}
            onChange={(data) =>
              setFormData({
                ...formData,
                startDate: data as Date,
              })
            }
            ampm={false}
          />
          <DateTimePicker
            renderInput={(innerProps) => <TextField {...innerProps} />}
            label="End Date"
            value={formData.endDate}
            onChange={(data) =>
              setFormData({
                ...formData,
                endDate: data as Date,
              })
            }
            ampm={false}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmitButton} type="submit">
            {modalSubmitButtonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
