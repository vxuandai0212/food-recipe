import { Ad, Thumbnail, Ingredient, RecipeItem, IngredientInfo, Nutrition } from "app/constants/types/data"
import { OVERLAY_STATUS } from "./enum"

export interface AppErrorState {
  connection: boolean
  maintain: boolean
}

export interface RecentQuery {
  page: number
  limit: number
}

export interface RecentState {
  query: RecentQuery
  total?: number
  items?: Array<RecipeItem>
  loading: boolean
}

export interface MostViewQuery {
  page: number
  limit: number
}

export interface MostViewState {
  query: MostViewQuery
  total?: number
  items?: Array<RecipeItem>
  loading: boolean
}

export interface SearchQuery {
  page: number
  limit: number
  searchKeyword: string
}

export interface SearchState {
  query: SearchQuery
  total?: number
  items?: RecipeItem[]
  loading: boolean
}

export interface RecipeDetailItem {
  id?: number
  name?: string
  cookTime?: number
  instruction?: any
  ads?: Array<Ad>
  thumbnails?: Array<Thumbnail>
  cookEvents?: Array<string>
  ingredients?: Array<Ingredient>
}

export interface RecipeAdView {
  instructionTip: any
  ingredient: any
  price: boolean
  nutrition: boolean
}

export interface RecipeDetailState {
  loading: boolean
  item: RecipeDetailItem
  adView: RecipeAdView
  currentIngredient: Ingredient | null
  currentIngredientId: number | null
  benefits: Array<IngredientInfo> | null
  warnings: Array<IngredientInfo> | null
  overuseWarnings: Array<IngredientInfo> | null
  consumerWarnings: Array<IngredientInfo> | null
  combineWarnings: Array<IngredientInfo> | null
  selectTips: Array<IngredientInfo> | null
  preprocessTips: Array<IngredientInfo> | null
  preserveTips: Array<IngredientInfo> | null
  allNutrition: Array<Nutrition> | null
  currentIngredientNutrition: Array<Nutrition> | null
}

export interface UiState {
  splash: boolean,
  listLoading: boolean
  overlay: OVERLAY_STATUS
  viewLoading: boolean
}

export interface AppState {
  appError: AppErrorState
  detail: RecipeDetailState
  mostView: MostViewState
  recent: RecentState
  search: SearchState
  ui: UiState
}
