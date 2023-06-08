import { RecipeDetailQuery, RecipeSearchQuery } from "app/constants/types/data"
import { VIEW_REQUEST } from "app/constants/types/request-body"

export interface SimpleAction {
  type: string
}

export interface DataAction {
  type: string
  data: any
}

export interface QueryAction {
  type: string
  query: RecipeSearchQuery | RecipeDetailQuery | VIEW_REQUEST
}
