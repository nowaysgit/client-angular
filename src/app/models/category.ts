import { ITodo } from "./todo";

export interface ICategory {
  id: number;
  title: string;
  todos?: ITodo[] | null;
}
