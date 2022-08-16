import { Injectable } from '@angular/core';
import {Subject, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error$ = new Subject();

  handle(error: HttpErrorResponse) {
    console.log(error);
    this.error$.next(error.message);
    return throwError(() => error.message);
  }

  clear() {
    this.error$.next('');
  }
}
