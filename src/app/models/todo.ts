import {Category} from "./category";
import {Type} from "class-transformer";

export class Todo {
  id: number;
  text: string;
  isCompleted: boolean;
  categoryId: number;
  @Type(() => Category)
  category?: Category | null;

  constructor(id: number, text: string, isCompleted: boolean, categoryId: number, category: Category | null) {
    this.id = id;
    this.text = text;
    this.isCompleted = isCompleted;
    this.categoryId = categoryId;
    this.category = category;
  }
}
