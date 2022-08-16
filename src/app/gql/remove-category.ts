import {gql} from 'apollo-angular'
import {ICategory} from "../models/category";

export interface IREMOVE_CATEGORY {
  removeCategory: ICategory
}

export const REMOVE_CATEGORY = gql`
  mutation removeCategory($id: Float!){
    removeCategory(id: $id) {
       status
    }
  }
`
