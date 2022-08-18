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
import {Observable} from "rxjs";
import {StoreService} from "../../services/store.service";

export interface DialogData {
  title: string;
}

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private storeService: StoreService,
              @Optional() public dialogRef: MatDialogRef<CategoryFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData){ }

  form: FormGroup;
  options: string[];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [
        Validators.required, Validators.minLength(1), Validators.maxLength(20), this.alreadyExist()
      ]],
    });
    this.storeService.categories$.subscribe(result => this.options = result.map(x => x.title))
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.form.controls[controlName];

    return control?.invalid && control?.touched;
  }

  close(): void {
    this.dialogRef.close();
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    return absCtrl as FormControl;
  }

  alreadyExist(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }
        let valid = true;
        for(let option of this.options) {
          if (option === value) {
            valid = false;
          }
        }
        return !valid ? {alreadyExist:true} : null;
    }
}
}
