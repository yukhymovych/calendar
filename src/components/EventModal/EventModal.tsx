import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextInput, DateTimePickerInput } from "../../components";
import { useForm } from "react-hook-form";
import { uid } from "uid";
import { addItem } from "../../firebase/crud";
import { format } from "date-fns";
import { EventModalType, EventItem } from "../../types";

interface EventModalProps {
  staticDatePickerValue: Date;
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

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleSubmitButton = () => {
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
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{modalTitleText}</DialogTitle>
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
          <Button onClick={handleSubmitButton} type="submit">
            {modalSubmitButtonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
