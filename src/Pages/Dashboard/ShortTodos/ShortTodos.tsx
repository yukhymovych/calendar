import React, { FC, useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, FormControlLabel, Collapse } from '@mui/material';

import { updateShortTodo } from '../../../firebase/crud';
import { useAuthContext } from '../../../context/auth-provider';
import { ShortTodo } from '../../../types';

import { AddShortTodoModal, ItemRemoveModal } from '../../../components';

import './ShortTodos.css';

interface ShortTodosProps {
  data: ShortTodo[];
}

const ShortTodos: FC<ShortTodosProps> = ({ data }) => {
  const { user } = useAuthContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [removeEventId, setRemoveEventId] = useState('');
  const [shortTodoData, setShortTodoData] = useState<ShortTodo>({
    id: '',
    title: '',
    completed: false,
  });

  const handleRemove = (itemId: string) => {
    setRemoveEventId(itemId);
    setOpenRemoveModal(true);
  };

  const handleCheckbox = (
    item: ShortTodo,
    data: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShortTodoData({
      id: item.id,
      title: item.title,
      completed: data.target.checked,
    });
  };

  useEffect(() => {
    if (shortTodoData.title !== '' && user)
      updateShortTodo(shortTodoData, user?.uid);
  }, [shortTodoData, shortTodoData.completed, user, user?.uid]);

  const showShortTodos = data.length !== 0;

  return (
    <div className="right-sidebar__short-todo">
      <div className="short-todo__top">
        <h3 className="sub-header">Short Todos</h3>
        <div
          className="short-todo__add-button"
          onClick={() => setOpenEditModal(true)}
        >
          <AddCircleOutlinedIcon sx={{ color: '#3664da' }} />
        </div>
      </div>
      <TransitionGroup>
        {showShortTodos &&
          data.map((item) => (
            <Collapse key={item.id}>
              <div className="short-todo__item">
                <FormControlLabel
                  label={item.title}
                  control={
                    <Checkbox
                      onChange={(data) => handleCheckbox(item, data)}
                      defaultChecked={item.completed}
                    />
                  }
                />
                <div
                  className="event-list__item-button"
                  onClick={() => handleRemove(item.id)}
                >
                  <DeleteIcon fontSize="small" />
                </div>
              </div>
            </Collapse>
          ))}
      </TransitionGroup>
      {!showShortTodos && (
        <p className="text">
          You don't have any Short Todos yet. Add new todos to see them
        </p>
      )}
      <AddShortTodoModal open={openEditModal} setOpen={setOpenEditModal} />
      <ItemRemoveModal
        open={openRemoveModal}
        setOpen={setOpenRemoveModal}
        eventId={removeEventId}
        itemName="todo"
      />
    </div>
  );
};

export default ShortTodos;
