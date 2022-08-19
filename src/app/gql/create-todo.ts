import {gql} from 'apollo-angular'
import {Todo} from "../models/todo";

export interface ICREATE_TODO {
  createTodo: Todo
}

export const CREATE_TODO = gql`
  mutation createTodo($input: CreateTodoInput!){
    createTodo(input: $input) {
       category {
          id
          title
       }
       id
       text
       isCompleted
       categoryId
    }
  }
`
