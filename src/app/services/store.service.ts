import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ICategory} from "../models/category";

@Injectable()
export class StoreService {
  constructor() {
  }

  categories$: Observable<ICategory[]>
  loading = false;
}
