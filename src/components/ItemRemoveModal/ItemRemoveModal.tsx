import React, { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { removeItem, removeShortTodo } from "../../firebase/crud";
import { useAuthContext } from "../../Context/AuthProvider";
import { ItemType } from "../../types";

interface ItemRemoveModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  callback?: () => void;
  eventId: string;
  itemName: string;
}

export const ItemRemoveModal: FC<ItemRemoveModalProps> = ({
  open = false,
  setOpen,
  callback,
  eventId,
  itemName,
}) => {
  const { user } = useAuthContext();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (callback) {
      callback();
    }
    if (user) {
      if (ItemType.Event === itemName) removeItem(eventId, user?.uid);
      if (ItemType.Todo === itemName) removeShortTodo(eventId, user?.uid);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Removing {itemName}</DialogTitle>
      <DialogContent>
        Are you sure you want to remove this {itemName}?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleSubmit}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};
