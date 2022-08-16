import {Component, Input, OnInit} from '@angular/core';
import {ITodo} from '../../models/todo';
import {MatDialog} from "@angular/material/dialog";
import {TodoFormComponent} from "../todo-form/todo-form.component";
import {TodoService} from "../../services/todo.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  constructor(public dialog: MatDialog, private todoService: TodoService, private categoryService: CategoryService) {}

  @Input()
  id: number;
  @Input()
  title: string;
  @Input()
  todos: ITodo[] = [];

  progress: number;

  add(): void {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      data: {text: '', category: this.title},
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });

    dialogRef.afterClosed().subscribe(result => this.todoService.create(result.category, result.text));
  }

  remove(): void {
    this.categoryService.remove(this.id);
  }

  ngOnInit(): void {
    const count = this.todos.length
    const isCompleted = this.todos.reduce(function (completed, current) {
      return completed + (current.isCompleted ? 1 : 0);
    }, 0)
    this.progress = (isCompleted/count)*100;
  }
}
