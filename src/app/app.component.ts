import {Component, OnInit} from '@angular/core';
import {CategoryService} from "./services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {CategoryFormComponent} from "./components/category-form/category-form.component";
import {StoreService} from "./services/store.service";
import {Category} from "./models/category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public storeService: StoreService,
    private categoryService: CategoryService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.categoryService.updateAll();
  }

   identify(index: number, item: Category): number {
     return item.id;
  }

  add(): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {title: ''},
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined || result.category === null || result.text === null) return;
      this.categoryService.create(result.title);
    });
  }
}
