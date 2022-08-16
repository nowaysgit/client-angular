import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup, Validators, FormBuilder, AbstractControl, FormControl} from '@angular/forms';
import {Observable} from "rxjs";
import {map, startWith} from 'rxjs/operators';
import {StoreService} from "../../services/store.service";

export interface DialogData {
  text: string;
  category: string;
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private storeService: StoreService,
              @Optional() public dialogRef: MatDialogRef<TodoFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData){ }

  form: FormGroup;
  options: string[];
  filteredOptions: Observable<string[]>;

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];

    return control?.invalid && control?.touched;
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: ['', [
        Validators.required, Validators.minLength(1), Validators.maxLength(255)
      ]],
      category: [this.data.category, [
        Validators.required, Validators.minLength(1), Validators.maxLength(20)
      ]]
    });
    this.storeService.categories$.subscribe(result => this.options = result.map(x => x.title))
    this.filteredOptions = this.form.controls.category.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options?.filter(option => option.toLowerCase().includes(filterValue));
  }
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    return absCtrl as FormControl;
  }
}
