import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { removeItem } from "../../firebase/crud";
import { useAuthContext } from "../../Context/AuthProvider";

interface EventRemoveModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  callback?: () => void;
  eventId: string;
}

export const EventRemoveModal: FC<EventRemoveModalProps> = ({
  open = false,
  setOpen,
  callback,
  eventId,
}) => {
  const { user } = useAuthContext();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (callback) {
      callback();
    }
    removeItem(eventId, user?.uid);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Remove Event</DialogTitle>
      <DialogContent>Are you sure you want to remove this event?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleSubmit}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};
