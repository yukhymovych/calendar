import { useState, useEffect } from "react";
import { firebaseDB } from "./config";
import { set, ref, onValue, remove, update } from "@firebase/database";
import { EventItem, ShortTodo } from "../types";
import { useAuthContext } from "../context/AuthProvider";

export const addItem = (item: EventItem, userId: string) => {
  set(ref(firebaseDB, `/${userId}/events/${item.id}`), {
    ...item,
  });
};

export const addShortTodo = (item: ShortTodo, userId: string) => {
  set(ref(firebaseDB, `/${userId}/todos/${item.id}`), {
    ...item,
  });
};

export const useGetItems = () => {
  const { user } = useAuthContext();
  const [items, setItems] = useState<EventItem[]>([]);

  useEffect(() => {
    onValue(ref(firebaseDB, `/${user?.uid}/events/`), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setItems(data);
      }
      if (!snapshot.exists()) {
        setItems([]);
      }
    });
  }, [user?.uid]);

  return Object.values(items || []).sort(
    (a: EventItem, b: EventItem) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
};

export const useGetShortTodos = () => {
  const { user } = useAuthContext();
  const [items, setItems] = useState<ShortTodo[]>([]);

  useEffect(() => {
    onValue(ref(firebaseDB, `/${user?.uid}/todos/`), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setItems(data);
      }
      if (!snapshot.exists()) {
        setItems([]);
      }
    });
  }, [user?.uid]);

  return Object.values(items || []);
};

export const removeItem = (id: string, userId: string) => {
  remove(ref(firebaseDB, `/${userId}/events/${id}`));
};

export const removeShortTodo = (id: string, userId: string) => {
  remove(ref(firebaseDB, `/${userId}/todos/${id}`));
};

export const updateItem = (item: EventItem, userId: string) => {
  update(ref(firebaseDB, `/${userId}/events/${item.id}`), {
    ...item,
  });
};

export const updateShortTodo = (item: ShortTodo, userId: string) => {
  update(ref(firebaseDB, `/${userId}/todos/${item.id}`), {
    ...item,
  });
};
