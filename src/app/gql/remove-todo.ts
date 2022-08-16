import {gql} from 'apollo-angular'
import {ITodo} from "../models/todo";

export interface IREMOVE_TODO {
  removeTodo: ITodo
}

export const REMOVE_TODO = gql`
  mutation removeTodo($id: Float!){
    removeTodo(id: $id) {
       status
    }
  }
`
