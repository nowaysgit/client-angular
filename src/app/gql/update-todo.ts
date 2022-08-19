import {gql} from 'apollo-angular'
import {Todo} from "../models/todo";

export interface IUPDATE_TODO {
  updateTodo: Todo
}

export const UPDATE_TODO = gql`
  mutation updateTodo($input: UpdateTodoInput!){
    updateTodo(input: $input) {
       id
    }
  }
`
