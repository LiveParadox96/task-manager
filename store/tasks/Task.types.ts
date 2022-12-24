export interface ITask {
  uuid: string | number[];
  title: string;
  description?: string;
  date: Date;
  isCompleted: boolean;
}
