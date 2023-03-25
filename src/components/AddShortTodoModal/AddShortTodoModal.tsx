import React, { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { uid } from 'uid';

import { addShortTodo } from '../../firebase/crud';
import { useAuthContext } from '../../context/auth-provider';

interface AddShortTodoModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const AddShortTodoModal: FC<AddShortTodoModalProps> = ({
  open = false,
  setOpen,
}) => {
  const { user } = useAuthContext();
  const [shortTodoTitle, setShortTodoTitle] = useState('');

  const handleClose = () => {
    setOpen(false);
    setShortTodoTitle('');
  };

  const handleSubmitButton = () => {
    setOpen(false);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoItemId = uid();
    const newTodoItem = {
      id: todoItemId,
      title: shortTodoTitle,
      completed: false,
    };
    if (user) addShortTodo(newTodoItem, user?.uid);
    setShortTodoTitle('');
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
