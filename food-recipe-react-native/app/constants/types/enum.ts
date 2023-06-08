import { SIZES } from "app/constants"

export enum OVERLAY_STATUS {
  FULL = 'FULL',
  LOADING = 'LOADING'
}

export enum VIEW_TYPE {
  VIEW_RECIPE = 1,
  VIEW_KEYWORD = 2,
  VIEW_NATIVE_AD = 3,
  VIEW_PRICE_AD = 4,
  VIEW_NUTRITION_AD = 5
}

export enum TIP_TYPE {
  SELECT_INGREDIENT = 1,
  PREPROCESS_INGREDIENT = 2,
  PRESERVE_INGREDIENT = 3,
  COOK = 4
}

export enum USAGE_TYPE {
  INGREDIENT = 1,
  NUTRITION = 2
}

export enum CONTRAINDICATION_TYPE {
  INGREDIENT = 1,
  NUTRITION = 2
}

export enum INGREDIENT_WARNING_TYPE {
  OVERUSE = 1,
  CONSUMER = 2,
  COMBINE = 3
}

export enum AD_TYPE {
  EXERCISE_AND_HEALTH = 1, // chăm sóc sức khỏe (đặt ở recipe nutrition)
  FOOD_AND_DRINK = 2, // cửa hàng phục vụ sản phẩm hiện tại (đặt ở recipe detail)
  SHOPPING = 3, // mua sắm thực phẩm hoặc đồ gia dụng (đặt ở recipe detail)
  TOURISM = 4, // du lịch (đặt ở recipe detail)
  MEDICAL = 5 // chăm sóc y tế (đặt ở recipe nutrition)
}

export enum RECIPE_INSTRUCTION_TYPE {
  STEP = 'step',
  NOTE = 'note',
  TIP = 'tip'
}

export enum NUTRITION_TYPE {
  ENERGY = 1,
  CARB = 2,
  PROTEIN = 3,
  FAT = 4,
  WATER = 5,
  MINERAL = 6,
  FIBRE = 7,
  VITAMIN = 8
}

export enum DRAWER_STATE {
  OPEN = SIZES.window.height - 230,
  PEEK = 230,
  CLOSED = 0,
}

export enum INGREDIENT_INFO_TYPE {
  BENEFIT = 1,
  WARNING_OVERUSE = 2,
  WARNING_CONSUMER = 3,
  WARNING_COMBINE = 4,
  TIP_SELECT = 5,
  TIP_PREPROCESS = 6,
  TIP_PRESERVE = 7
}
