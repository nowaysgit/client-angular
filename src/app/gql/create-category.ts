import {gql} from 'apollo-angular'
import {ICategory} from "../models/category";

export interface ICREATE_CATEGORY {
  createCategory: ICategory
}

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!){
    createCategory(input: $input) {
        id
        title
    }
  }
`
