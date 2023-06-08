export const AD_CUSTOMER = {
  UPSERT: '/ad-customer',
  GET: '/ad-customer/get',
  GET_ALL: '/ad-customer/get-all',
  DELETE: '/ad-customer/delete'
}

export const AD_LOCATION = {
  INSERT: '/ad-location/add',
  GET_ALL: '/ad-location/get-all',
  DELETE: '/ad-location/delete'
}

export const AD = {
  UPSERT: '/ads',
  GET: '/ads/get',
  GET_ALL: '/ads/get-all',
  DELETE: '/ads/delete',
  AD_VIEW: '/ads/ad-view',
  AD_VIEW_GET: '/ads/ad-view/get',
  AD_VIEW_LOG: '/ads/ad-view-log'
}

export const AUTHORIZE = {
  INFO: '/auth/info',
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password'
}

export const COOK_EVENT = {
  UPSERT: '/cook-event',
  GET_ALL: '/cook-event/get-all',
  DELETE: '/cook-event/delete'
}

export const IMAGE = {
  UPLOAD: '/images/upload',
  GET_ALL: '/images/get-all',
  SET_COVER: '/images/set-cover',
  DELETE: '/images/delete'
}

export const INGREDIENT_INFO = {
  UPSERT: '/ingredient-info',
  GET_ALL: '/ingredient-info/get-all',
  DELETE: '/ingredient-info/delete'
}

export const INGREDIENT_NUTRITION = {
  UPSERT: '/ingredient-nutrition',
  GET_ALL: '/ingredient-nutrition/get-all',
  DELETE: '/ingredient-nutrition/delete'
}

export const INGREDIENT = {
  UPSERT: '/ingredients',
  GET_ALL: '/ingredients/get-all',
  GET: '/ingredients/get',
  DELETE: '/ingredients/delete'
}

export const KEYWORD = {
  INSERT: '/keywords/add',
  GET_ALL: '/keywords/get-all'
}

export const NUTRITION = {
  UPSERT: '/nutritions',
  GET_ALL: '/nutritions/get-all',
  DELETE: '/nutritions/delete'
}

export const RECIPE_COOK_EVENT = {
  GET_ALL: '/recipe-cook-event/get-all',
  UPSERT: '/recipe-cook-event',
  DELETE: '/recipe-cook-event/delete'
}

export const RECIPE_INGREDIENT = {
  GET_ALL: '/recipe-ingredient/get-all',
  UPSERT: '/recipe-ingredient',
  DELETE: '/recipe-ingredient/delete'
}

export const RECIPE_KEYWORD = {
  INSERT: '/recipe-keyword/add',
  GET_ALL: '/recipe-keyword/get-all',
  DELETE: '/recipe-keyword/delete'
}

export const RECIPE = {
  UPSERT: '/recipes',
  GET_ALL: '/recipes/get-all',
  GET: '/recipes/get',
  DELETE: '/recipes/delete'
}

export const STAT = {
  OVERVIEW: '/stats/overview'
}

export const STORAGE = {
  UPSERT: '/storages',
  GET_ALL: '/storages/get-all',
  DELETE: '/storages/delete'
}

export const VIEW = {
  RECIPE_VIEW: '/views/recipes/get-all',
  KEYWORD_VIEW: '/views/keywords/get-all',
  NATIVE_AD_VIEW: '/views/native-ad/get-all',
  ADMOB_VIEW: '/views/admob/get-all'
}

// fancythings.io
export const FT_CATEGORY = {
  UPSERT: '/fancythings/categories',
  GET_ALL: '/fancythings/categories/get-all',
  DELETE: '/fancythings/categories/delete'
}

export const FT_POST = {
  UPSERT: '/fancythings/posts',
  GET: '/fancythings/posts/get',
  GET_ALL: '/fancythings/posts/get-all',
  DELETE: '/fancythings/posts/delete'
}
