import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TodoComponent} from "./components/todo/todo.component";
import {CategoryComponent} from "./components/category/category.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CategoryService} from './services/category.service';
import {LoaderComponent} from './components/loader/loader.component';
import {ErrorComponent} from './components/error/error.component';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from '@angular/forms';
import {TodoFormComponent} from "./components/todo-form/todo-form.component";
import {CategoryFormComponent} from './components/category-form/category-form.component';
import { GraphQLModule } from './graphql.module';
import {TodoService} from "./services/todo.service";
import {StoreService} from "./services/store.service";

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TodoComponent,
    TodoFormComponent,
    LoaderComponent,
    ErrorComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    GraphQLModule
  ],
  entryComponents: [TodoFormComponent],
  providers: [CategoryService, TodoService, StoreService,
    { provide: MatDialogRef , useValue:{} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
