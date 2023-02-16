import React, { FC, useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import "./ShortTodos.css";
import { AddShortTodoModal, ItemRemoveModal } from "../../components";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import { ShortTodo } from "../../types";
import { updateShortTodo } from "../../firebase/crud";
import { useAuthContext } from "../../Context/AuthProvider";

interface ShortTodosProps {
  data: ShortTodo[];
}

const ShortTodos: FC<ShortTodosProps> = ({ data }) => {
  const { user } = useAuthContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [removeEventId, setRemoveEventId] = useState("");
  const [shortTodoData, setShortTodoData] = useState<ShortTodo>({
    id: "",
    title: "",
    completed: false,
  });

  const handleRemove = (itemId: string) => {
    setRemoveEventId(itemId);
    setOpenRemoveModal(true);
  };

  const handleCheckbox = (item: ShortTodo, data: any) => {
    setShortTodoData({
      id: item.id,
      title: item.title,
      completed: data.target.checked,
    });
  };

  useEffect(() => {
    if (shortTodoData.title !== "") updateShortTodo(shortTodoData, user?.uid);
  }, [shortTodoData, shortTodoData.completed, user?.uid]);

  const showShortTodos = data.length !== 0;

  return (
    <div className="right-sidebar__short-todo">
      <div className="short-todo__top">
        <h3 className="h3">Short Todos</h3>
        <div
          className="short-todo__add-button"
          onClick={() => setOpenEditModal(true)}
        >
          <AddCircleOutlinedIcon sx={{ color: "#3664da" }} />
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
        <p className="p">
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
