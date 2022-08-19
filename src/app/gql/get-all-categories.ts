import {gql} from 'apollo-angular'
import {Category} from "../models/category";

export interface IGET_ALL_CATEGORIES {
  categories: Category[]
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
