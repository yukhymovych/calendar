export type EventItem = {
  id: string;
  title: string;
  startDate: string | Date;
  endDate: string | Date;
  place: string;
  additional: string;
  color: string;
};

export enum EventModalType {
  Create = "create",
  Edit = "edit"
};