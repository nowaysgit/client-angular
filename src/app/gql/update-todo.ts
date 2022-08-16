import {gql} from 'apollo-angular'
import {ITodo} from "../models/todo";

export interface IUPDATE_TODO {
  updateTodo: ITodo
}

export const UPDATE_TODO = gql`
  mutation updateTodo($input: UpdateTodoInput!){
    updateTodo(input: $input) {
       id
    }
  }
`
