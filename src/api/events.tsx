import { useState, useEffect } from 'react';
import { set, ref, onValue, remove, update } from '@firebase/database';

import { firebaseDB } from './config';
import { useAuthContext } from '../context/auth-provider';
import { EventItem } from '../types';

export const addEvent = (item: EventItem, userId: string) => {
  set(ref(firebaseDB, `/${userId}/events/${item.id}`), {
    ...item,
  });
};

export const useGetEvents = () => {
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

export const removeEvent = (id: string, userId: string) => {
  remove(ref(firebaseDB, `/${userId}/events/${id}`));
};

export const updateEvent = (item: EventItem, userId: string) => {
  update(ref(firebaseDB, `/${userId}/events/${item.id}`), {
    ...item,
  });
};
