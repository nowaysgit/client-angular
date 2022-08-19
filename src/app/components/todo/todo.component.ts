import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  constructor(public dialog: MatDialog, private todoService: TodoService) {}

  @Input()
  id: number;
  @Input()
  checked: boolean;
  @Input()
  text: string;
  @Input()
  categoryId: number;

  remove(): void {
    this.todoService.remove(this.id);
  }
  update(): void {
    this.todoService.update(this.id, this.checked, this.text, this.categoryId);
  }
}
