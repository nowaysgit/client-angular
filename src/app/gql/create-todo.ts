import {gql} from 'apollo-angular'
import {ITodo} from "../models/todo";

export interface ICREATE_TODO {
  createTodo: ITodo
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
    }
  }
`
