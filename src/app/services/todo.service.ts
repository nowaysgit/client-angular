import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  catchError,
  map,
  retry,
  tap,
  throwError
} from "rxjs";
import {ErrorService} from "./error.service";
import {Apollo} from "apollo-angular";
import {IREMOVE_TODO, REMOVE_TODO} from "../gql/remove-todo";
import {CREATE_TODO, ICREATE_TODO} from "../gql/create-todo";
import {StoreService} from "./store.service";
import {IUPDATE_TODO, UPDATE_TODO} from "../gql/update-todo";

@Injectable()
export class TodoService {
  constructor(
    private readonly store: StoreService,
    private readonly http: HttpClient,
    private readonly errorService: ErrorService,
    private readonly apollo: Apollo
  ) {
  }

  create(categoryName: string, text: string) {
    this.store.loading = true;
    this.apollo.mutate<ICREATE_TODO>({
      mutation: CREATE_TODO,
      variables: {
        input: {
          categoryName: categoryName,
          text: text
        }
      },
      refetchQueries: ['gtAllCategories']
    }).pipe(
        map(({data}) => data?.createTodo),
        retry(3),
        tap(() => this.store.loading = false),
        catchError(this.errorService.handle.bind(this))
      ).subscribe({ error: e => this.errorService.handle(e) });
  }

  remove(id: number) {
    this.store.loading = true;
    this.apollo.mutate<IREMOVE_TODO>({
      mutation: REMOVE_TODO,
      variables: {
        id: +id
      },
      refetchQueries: ['gtAllCategories']
    }).pipe(
        map(({data}) => data?.removeTodo),
        retry(3),
        tap(() => this.store.loading = false),
        catchError(this.errorService.handle.bind(this))
      ).subscribe({ error: e => this.errorService.handle(e) });
  }

  update(id: number, isCompleted: boolean, text: string, categoryId: number) {
    this.store.loading = true;
    this.apollo.mutate<IUPDATE_TODO>({
      mutation: UPDATE_TODO,
      variables: {
        input: {
          id: +id,
          isCompleted: isCompleted,
          text: text,
          categoryId: +categoryId
        }
      },
      refetchQueries: ['gtAllCategories']
    }).pipe(
        map(({data}) => data?.updateTodo),
        retry(3),
        tap(() => this.store.loading = false),
        catchError(this.errorService.handle.bind(this))
      ).subscribe({ error: e => this.errorService.handle(e)});
  }
}
