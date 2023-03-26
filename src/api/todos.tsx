import { ShortTodo } from '../types';

import {
  addItemAdapter,
  updateItemAdapter,
  removeItemAdapter,
  useGetItemsAdapter,
} from './apiAdapter';

const todosPath = 'todos';

export const addShortTodo = (item: ShortTodo, userId: string) => {
  addItemAdapter(item, userId, todosPath);
};

export const updateShortTodo = (item: ShortTodo, userId: string) => {
  updateItemAdapter(item, userId, todosPath);
};

export const removeShortTodo = (id: string, userId: string) => {
  removeItemAdapter(id, userId, todosPath);
};

export const useGetShortTodos = () => {
  return useGetItemsAdapter(todosPath);
};
