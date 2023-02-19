export type EventItem = {
  id: string;
  title: string;
  startDate: string | Date;
  endDate: string | Date;
  place?: string | null;
  additional?: string | null;
  color: string | null;
  isAllDayEvent: boolean;
  recurrence: string;
  recurrenceDays?: string[];
};

export type ShortTodo = {
  id: string;
  title: string;
  completed: boolean;
};

export enum EventModalType {
  Create = "create",
  Edit = "edit",
}

export enum ItemType {
  Event = "event",
  Todo = "todo",
}

export enum RecurrenceType {
  NoRecurrence = "noRecurrence",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Yearly = "yearly",
  CertainDays = "certainDays",
}