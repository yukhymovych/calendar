import { useState, useEffect } from "react";
import { firebaseDB } from "./config";
import { set, ref, onValue, remove, update } from "@firebase/database";
import { uid } from "uid";

export const addItem = () => {
  const id = uid();
  set(ref(firebaseDB, `/${id}`), {
    todo: "test",
    id: id,
  });
};

export const getItems = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    onValue(ref(firebaseDB), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setItems(data);
      }
    });
  }, []);

  return Object.values(items || []);
};

export const removeItem = (item: any) => {
  remove(ref(firebaseDB, `/${item.id}`));
};

export const updateItem = (item: any) => {
  update(ref(firebaseDB, `/${item.id}`), {
    ...item,
  });
};
