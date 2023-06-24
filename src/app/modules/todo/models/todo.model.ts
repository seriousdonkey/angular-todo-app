export interface Todo {
  id?: string;
  todo: string;
  done: boolean;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
}
