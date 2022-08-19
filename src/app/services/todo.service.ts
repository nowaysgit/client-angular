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
import {IREMOVE_TODO, REMOVE_TODO} from "../gql/remove-todo";
import {CREATE_TODO, ICREATE_TODO} from "../gql/create-todo";
import {StoreService} from "./store.service";
import {IUPDATE_TODO, UPDATE_TODO} from "../gql/update-todo";
import {plainToInstance} from "class-transformer";
import {Category} from "../models/category";

@Injectable()
export class TodoService {
  constructor(
    private readonly store: StoreService,
    private readonly http: HttpClient,
    private readonly errorService: ErrorService,
    private readonly apollo: Apollo
  ) {
  }

  async create(categoryName: string, text: string) {
    this.store.loading = true;
    let isCreateCategory = true;
    this.store.categories$.pipe(tap(x => {
      if (x.find(x => x.title === categoryName)) {
        isCreateCategory = false;
      }
    })).subscribe();
    this.apollo.mutate<ICREATE_TODO>({
      mutation: CREATE_TODO,
      variables: {
        input: {
          categoryName: categoryName,
          text: text
        }
      },
    }).pipe(
      map(({data}) => data?.createTodo),
      retry(3),
      tap((todo) => {
          this.store.categories$ = this.store.categories$.pipe(
            map((data) => {
              if(isCreateCategory) {
                return [...data,  plainToInstance(Category,{...data!, todos: [todo]})]
              }
              return data.map((category) => {
                if (category.title !== categoryName) {
                  return category
                }
                return {
                  ...category,
                  todos: [...category.todos!, todo!]
                }
              })
            }),
          );
          this.store.loading = false;
        }
      ),
      catchError(this.errorService.handle.bind(this))
    ).subscribe({error: e => this.errorService.handle(e)});
  }

  remove(id: number) {
    this.store.loading = true;
    this.apollo.mutate<IREMOVE_TODO>({
      mutation: REMOVE_TODO,
      variables: {
        id: +id
      },
    }).pipe(
        map(({data}) => data?.removeTodo),
        retry(3),
        tap((result) => {
            if(result?.status === 1) {
              this.store.categories$ = this.store.categories$.pipe(
                map((data) =>
                  data.map((x) => {
                    return {
                      ...x,
                      todos: x.todos!.filter(x => x.id !== id)
                    }
                  })),
              );
            }
            this.store.loading = false;
          }),
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
    }).pipe(
        map(({data}) => data?.updateTodo),
        retry(3),
        tap((todo) => {
            this.store.categories$ = this.store.categories$.pipe(
              map((data) =>
                  data.map((x) => {
                    return {
                      ...x,
                      todos: x.todos!.map((a) => {
                        if (a.id === todo!.id) {
                          return {
                            ...a,
                            isCompleted: isCompleted
                          }
                        } else {
                          return a
                        }
                      })
                    }
                  })),
            );
            this.store.loading = false;
          }
        ),
        catchError(this.errorService.handle.bind(this))
      ).subscribe({ error: e => this.errorService.handle(e)});
  }
}
