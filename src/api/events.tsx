import { EventItem } from '../types';

import {
  addItemAdapter,
  updateItemAdapter,
  removeItemAdapter,
  useGetItemsAdapter,
} from './api-adapter';

const eventsPath = 'events';

export const addEvent = (item: EventItem, userId: string) => {
  addItemAdapter(item, userId, eventsPath);
};

export const updateEvent = (item: EventItem, userId: string) => {
  updateItemAdapter(item, userId, eventsPath);
};

export const removeEvent = (id: string, userId: string) => {
  removeItemAdapter(id, userId, eventsPath);
};

export const useGetEvents = () => {
  return useGetItemsAdapter(eventsPath);
};
