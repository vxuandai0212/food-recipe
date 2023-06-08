import { SCREEN } from "app/constants/types/screen"
import { TIP_TYPE } from "app/constants/types/enum"

export interface ConnectionErrorMetadata {
  screen: SCREEN
  query?: any
}

export interface RecipeItem {
  id: number
  name: string
  cookTime: number
  imagePublicId: string
  imageCloudName: string
}

export interface RecipeList {
  total: number
  items: RecipeItem[]
}

export interface Ad {
  id?: number
  name?: string
  link?: string
  type?: number
}

export interface Thumbnail {
  publicId: string
  cloudName: string
  url: string
}

export interface InitAppData {
  recent: Array<RecipeItem>
  mostView: RecipeList
  nativeAd: Ad[]
}

export interface RecipeListQuery {
  page: number
  limit: number
}

export interface RecipeSearchQuery {
  page: number
  limit: number
  searchKeyword: string
}

export interface IngredientInfo {
  title?: string
  description?: string
  type: number
}

export interface Ingredient {
  id: number
  name: string
  imagePublicId: string
  imageCloudName: string
  url: string
  quantity: number
  displayQuantity: string
  displayQuantityUnit: string
  price: number
  displayPrice: string
  displayPriceUnit: string
  info: Array<IngredientInfo>
  nutritions: Array<Nutrition>
}

export interface Tip {
  id: number
  objectId: number
  instruction: string
  type: TIP_TYPE
}

export interface RecipeDetailQuery {
  id: number
}

export interface IngredientPrice {
  thumbnail: string
  name: string
  quantity: number
  unit: string
  price: number
}

export interface RecipePrice {
  ingredients: Array<IngredientPrice>
}

export interface Nutrition {
  id: number
  name: string
  value: number
}

export interface RecipeNutritionItem {
  thumbnail: string
  name: string
  nutritions: Array<Nutrition>
}

export interface RecipeNutrition {
  ingredients: Array<RecipeNutritionItem>
}

export interface RecipeDetail {
  id: number
  thumbnails: Array<string>
  name: string
  events: Array<string>
  ingredients: Array<Ingredient>
  cookTime: number
  instruction: any // bước làm, chú ý, mẹo-phải xem quảng cáo, nơi nổi tiếng bởi món ăn-thành phố + đất nước
}
