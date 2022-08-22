import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormControl,
  ValidatorFn,
  ValidationErrors
} from '@angular/forms';
import {StoreService} from "../../services/store.service";
import {Category} from "../../models/category";

export interface DialogData {
  title: number;
  id: number;
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
  options: Category[];

  ngOnInit(): void {
    this.form = this.fb.group({
      text: ['', [
        Validators.required, Validators.minLength(1), Validators.maxLength(255)
      ]],
      categoryId: [this.data.id, [
        Validators.required
      ]],
      category: ['', [
        Validators.required, Validators.minLength(1), Validators.maxLength(20), this.alreadyExist()
      ]]
    });
    this.storeService.categories$.subscribe(result => {
      this.options = result.map(x => x);
      this.form.controls.category.setValue(this.data.title);
    })
  }

  identify(index: number, item: Category): number {
     return item.id;
  }

  select(value: number) {
     if(value === -1) {
       this.form.controls.category.setValue('');
       if (!this.isControlInvalid('text')) this.form.controls.text.markAsTouched();
       if (!this.isControlInvalid('category')) this.form.controls.category.markAsTouched();
     } else {
       if (!this.isControlInvalid('text')) this.form.controls.text.markAsTouched();
       this.form.controls.category.setValue(this.options.find(x => x.id === value)?.title);
     }
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];

    return control?.invalid && control?.touched;
  }

  alreadyExist(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        if(this.form.value.categoryId != -1) {
            return null;
        }
        let valid = true;
        for(let option of this.options) {
          if (option.title === value) {
            valid = false;
          }
        }
        return !valid ? { alreadyExist: true } : null;
    }
  }

  close(): void {
    this.form.value.text = null;
    this.form.value.categoryId = null;
    this.form.value.category = null;
    this.dialogRef.close();
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    return absCtrl as FormControl;
  }
}
