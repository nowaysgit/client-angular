import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  catchError,
  map,
  retry,
  tap,
} from "rxjs";
import {ErrorService} from "./error.service";
import {Apollo} from "apollo-angular";
import {GET_ALL_CATEGORIES, IGET_ALL_CATEGORIES} from "../gql/get-all-categories";
import {CREATE_CATEGORY, ICREATE_CATEGORY} from "../gql/create-category";
import {IREMOVE_CATEGORY, REMOVE_CATEGORY} from "../gql/remove-category";
import {StoreService} from "./store.service";
import {Category} from "../models/category";
import {plainToInstance} from "class-transformer";

@Injectable()
export class CategoryService {
  constructor(
    private readonly store: StoreService,
    private readonly http: HttpClient,
    private readonly errorService: ErrorService,
    private readonly apollo: Apollo
  ) {
  }

  updateAll() {
    this.store.loading = true;
    this.store.categories$ = this.apollo.watchQuery<IGET_ALL_CATEGORIES>({
      query: GET_ALL_CATEGORIES
    }).valueChanges
      .pipe(
        map(({data}) => data?.categories.map(x => plainToInstance(Category, x))),
        retry(3),
        tap(() => this.store.loading = false),
        catchError(this.errorService.handle.bind(this))
      );
  }

  create(title: string) {
    this.store.loading = true;
    this.apollo.mutate<ICREATE_CATEGORY>({
      mutation: CREATE_CATEGORY,
      variables: {
        input: {
          title: title,
        }
      }
    }).pipe(
        map(({data}) => data?.createCategory),
        retry(3),
        tap((category) => {
          this.store.categories$ = this.store.categories$.pipe(
            map((data) => {
                return [...data, plainToInstance(Category,{...category!, todos: []})]
              }
            )
          );
          this.store.loading = false
        }),
        catchError(this.errorService.handle.bind(this))
      ).subscribe({ error: e => this.errorService.handle(e) });
  }

  remove(id: number) {
    this.store.loading = true;
    this.apollo.mutate<IREMOVE_CATEGORY>({
      mutation: REMOVE_CATEGORY,
      variables: {
        id: +id
      },
    }).pipe(
        map(({data}) => data?.removeCategory),
        retry(3),
        tap((result) => {
            if(result?.status === 1) {
              this.store.categories$ = this.store.categories$.pipe(
                map((x) => x.filter(x => x.id !== id)),
              )
            }
            this.store.loading = false;
          }),
        catchError(this.errorService.handle.bind(this))
      ).subscribe({ error: e => this.errorService.handle(e) });
  }
}
