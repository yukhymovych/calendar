import { useState, useEffect } from 'react';
import { set, ref, onValue, remove, update } from '@firebase/database';

import { firebaseDB } from './config';
import { useAuthContext } from '../context/auth-provider';
import { EventItem, ShortTodo, ItemType } from '../types';

export const addItemAdapter = <T extends EventItem | ShortTodo>(
  item: T,
  userId: string,
  path: string
) => {
  set(ref(firebaseDB, `/${userId}/${path}/${item.id}`), {
    ...item,
  });
};

export const updateItemAdapter = <T extends EventItem | ShortTodo>(
  item: T,
  userId: string,
  path: string
) => {
  update(ref(firebaseDB, `/${userId}/${path}/${item.id}`), {
    ...item,
  });
};

export const removeItemAdapter = (id: string, userId: string, path: string) => {
  remove(ref(firebaseDB, `/${userId}/${path}/${id}`));
};

export const useGetItemsAdapter = (path: string) => {
  const { user } = useAuthContext();
  const [items, setItems] = useState<EventItem[] | ShortTodo[]>([]);
  const dataType = path === 'events' ? ItemType.Event : ItemType.Todo;

  useEffect(() => {
    onValue(ref(firebaseDB, `/${user?.uid}/${path}/`), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setItems(data);
      }
      if (!snapshot.exists()) {
        setItems([]);
      }
    });
  }, [user?.uid]);

  return dataType === ItemType.Event
    ? Object.values(items || []).sort(
        (a: EventItem, b: EventItem) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
    : Object.values(items || []);
};
