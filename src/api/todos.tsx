import { useState, useEffect } from 'react';
import { set, ref, onValue, remove, update } from '@firebase/database';

import { firebaseDB } from './config';
import { useAuthContext } from '../context/auth-provider';
import { ShortTodo } from '../types';

export const addShortTodo = (item: ShortTodo, userId: string) => {
  set(ref(firebaseDB, `/${userId}/todos/${item.id}`), {
    ...item,
  });
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

export const removeShortTodo = (id: string, userId: string) => {
  remove(ref(firebaseDB, `/${userId}/todos/${id}`));
};

export const updateShortTodo = (item: ShortTodo, userId: string) => {
  update(ref(firebaseDB, `/${userId}/todos/${item.id}`), {
    ...item,
  });
};
