import {
  AdCustomer,
  AdLocation,
  AdView,
  Ad,
  ContentImage,
  CookEvent,
  Image,
  IngredientInfo,
  IngredientNutrition,
  Ingredient,
  IpLocation,
  Keyword,
  Nutrition,
  RecipeCookEvent,
  RecipeIngredient,
  RecipeKeyword,
  Recipe,
  SearchKeyword,
  Storage,
  Token,
  User,
  View
} from 'entity/index'
import { FtCategory, FtPost } from 'entity/fancythings/index'
import { ConnectionOptions } from 'typeorm'

export const MARIADB_CONFIG: ConnectionOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'foodrecipe',
  password: '',
  database: 'food_recipe',
  entities: [
    AdCustomer,
    AdLocation,
    AdView,
    Ad,
    ContentImage,
    CookEvent,
    Image,
    IngredientInfo,
    IngredientNutrition,
    Ingredient,
    IpLocation,
    Keyword,
    Nutrition,
    RecipeCookEvent,
    RecipeIngredient,
    RecipeKeyword,
    Recipe,
    SearchKeyword,
    Storage,
    Token,
    User,
    View,
    FtCategory,
    FtPost
  ],
  extra: {
    charset: 'utf8mb4_general_ci'
  },
  synchronize: true,
  logging: true
}
