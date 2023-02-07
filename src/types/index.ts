export type EventItem = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  place: string;
  additional: string;
  status: EventItemStatus;
  color: string;
};

export enum EventItemStatus {
  Scheduled = "scheduled",
  Rejected = "rejected",
  Completed = "completed",
};

export enum EventModalType {
  Create = "create",
  Edit = "edit"
};