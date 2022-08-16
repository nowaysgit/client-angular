import {gql} from 'apollo-angular'
import {ICategory} from "../models/category";

export interface IGET_ALL_CATEGORIES {
  categories: ICategory[]
}

export const GET_ALL_CATEGORIES = gql`
  query gtAllCategories {
    categories {
        id
        title
        todos {
           id
           text
           isCompleted
           categoryId
        }
     }
  }
`
