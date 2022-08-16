import { Injectable } from '@angular/core';
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
        map(({data}) => data?.categories),
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
      },
      refetchQueries: ['gtAllCategories']
    }).pipe(
        map(({data}) => data?.createCategory),
        retry(3),
        tap(() => this.store.loading = false),
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
      refetchQueries: ['gtAllCategories']
    }).pipe(
        map(({data}) => data?.removeCategory),
        retry(3),
        tap(() => this.store.loading = false),
        catchError(this.errorService.handle.bind(this))
      ).subscribe({ error: e => this.errorService.handle(e) });
  }
}
