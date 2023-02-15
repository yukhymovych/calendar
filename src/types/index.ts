export type EventItem = {
  id: string;
  title: string;
  startDate: string | Date;
  endDate: string | Date;
  place?: string | null;
  additional?: string | null;
  color: string | null;
  isAllDayEvent: boolean;
};

export enum EventModalType {
  Create = "create",
  Edit = "edit"
};