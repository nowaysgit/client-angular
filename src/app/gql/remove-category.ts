import {gql} from 'apollo-angular'

export interface IREMOVE_CATEGORY {
  removeCategory: {
    status: number
  }
}

export const REMOVE_CATEGORY = gql`
  mutation removeCategory($id: Float!){
    removeCategory(id: $id) {
       status
    }
  }
`
