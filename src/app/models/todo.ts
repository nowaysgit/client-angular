import { ICategory } from "./category";

export interface ITodo {
  id: number;
  text: string;
  isCompleted: boolean;
  categoryId: number;
  category?: ICategory | null;
}
