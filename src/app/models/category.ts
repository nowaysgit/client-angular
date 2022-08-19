import {Todo} from "./todo";
import {Type} from "class-transformer";

export class Category {
  id: number;
  title: string;
  @Type(() => Todo)
  todos?: Todo[] | null;

  constructor(id: number, title: string, todos: Todo[] | null) {
    this.id = id;
    this.title = title;
    this.todos = todos;
  }
}
