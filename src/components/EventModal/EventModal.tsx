import React, { FC, useState, useEffect, useMemo } from "react";
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
import { EventRemoveModal } from "../EventRemoveModal/EventRemoveModal";

interface EventModalProps {
  defaultStartDate?: Date;
  open: boolean;
  setOpen: (value: boolean) => void;
  type: EventModalType;
  initialData?: EventItem;
  removeButton?: boolean;
}

export const EventModal: FC<EventModalProps> = ({
  defaultStartDate = new Date(),
  open = false,
  setOpen,
  type = EventModalType.Create,
  initialData,
  removeButton = false,
}) => {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const modalTitleText =
    type === EventModalType.Create ? "Create New Event" : "Edit Event";
  const modalSubmitButtonText =
    type === EventModalType.Create ? "Create" : "Save";
  const formDefaultValue = useMemo(() => {
    return {
      title: "",
      place: "",
      additional: "",
      startDate: defaultStartDate,
      endDate: addHours(defaultStartDate, 1),
    };
  }, [defaultStartDate]);

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
    if (initialData) {
      const { id, color, ...data } = initialData;
      setFormData(data as any);
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData && type === EventModalType.Create) {
      setFormData(formDefaultValue);
    }
  }, [type, formDefaultValue, initialData]);

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
        id: initialData?.id || "",
        startDate: format(new Date(formData.startDate), "yyyy-MM-dd HH:mm"),
        endDate: format(new Date(formData.endDate), "yyyy-MM-dd HH:mm"),
        color: null,
      };
      updateItem(editedItem);
    }
  };

  const handleChange = (data: any) => {
    setFormData({
      ...formData,
      [data.target.name]: data.target.value,
    });
  };

  const handleRemove = () => {
    setOpenRemoveModal(true);
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
          {removeButton && <Button onClick={handleRemove}>Remove event</Button>}
          <Button onClick={handleSubmitButton} type="submit">
            {modalSubmitButtonText}
          </Button>
        </DialogActions>
      </form>
      {removeButton && (
        <EventRemoveModal
          open={openRemoveModal}
          setOpen={setOpenRemoveModal}
          eventId={initialData?.id || ""}
          callback={() => setOpen(false)}
        />
      )}
    </Dialog>
  );
};
