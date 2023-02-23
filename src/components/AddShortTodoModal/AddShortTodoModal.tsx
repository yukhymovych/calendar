import React, { FC, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { uid } from "uid";
import { addShortTodo } from "../../firebase/crud";
import { useAuthContext } from "../../context/AuthProvider";

interface AddShortTodoModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const AddShortTodoModal: FC<AddShortTodoModalProps> = ({
  open = false,
  setOpen,
}) => {
  const { user } = useAuthContext();
  const [shortTodoTitle, setShortTodoTitle] = useState("");

  const handleClose = () => {
    setOpen(false);
    setShortTodoTitle("");
  };

  const handleSubmitButton = () => {
    setOpen(false);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const itemId = uid();
    const newItem = {
      id: itemId,
      title: shortTodoTitle,
      completed: false,
    };
    if (user) addShortTodo(newItem, user?.uid);
    setShortTodoTitle("");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="xs">
      <form onSubmit={handleOnSubmit}>
        <DialogTitle>Add Short Todo</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Todo description"
            type="text"
            margin="dense"
            fullWidth
            variant="standard"
            onChange={(data) => setShortTodoTitle(data.target.value)}
            value={shortTodoTitle}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmitButton} type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
