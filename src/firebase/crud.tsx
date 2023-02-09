import { useState, useEffect } from "react";
import { firebaseDB } from "./config";
import { set, ref, onValue, remove, update } from "@firebase/database";
import { EventItem } from "../types";

export const addItem = (item: EventItem) => {
  set(ref(firebaseDB, `/events/${item.id}`), {
    ...item,
  });
};

export const useGetItems = () => {
  const [items, setItems] = useState<EventItem[]>([]);

  useEffect(() => {
    onValue(ref(firebaseDB, "/events/"), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setItems(data);
      }
    });
  }, []);

  return Object.values(items || []).sort(
    (a: any, b: any) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
};

export const removeItem = (id: string) => {
  remove(ref(firebaseDB, `/events/${id}`));
};

export const updateItem = (item: EventItem) => {
  update(ref(firebaseDB, `/events/${item.id}`), {
    ...item,
  });
};
