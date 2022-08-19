import {gql} from 'apollo-angular'

export interface IREMOVE_TODO {
  removeTodo: {
    status: number
  }
}

export const REMOVE_TODO = gql`
  mutation removeTodo($id: Float!){
    removeTodo(id: $id) {
       status
    }
  }
`
