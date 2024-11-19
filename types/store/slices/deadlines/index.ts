export interface Deadline {
  color: string;
  createdAt: string;
  description: string;
  due: string;
  groupIds: string[];
  id: string;
  title: string;
}
export interface DeadlinesState {
  deadlines: Deadline[];
}
