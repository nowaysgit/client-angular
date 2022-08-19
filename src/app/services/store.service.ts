import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../models/category";

@Injectable()
export class StoreService {
  constructor() {
  }

  categories$: Observable<Category[]>
  loading = false;
}
