import {gql} from 'apollo-angular'
import {Category} from "../models/category";

export interface ICREATE_CATEGORY {
  createCategory: Category
}

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!){
    createCategory(input: $input) {
        id
        title
    }
  }
`
