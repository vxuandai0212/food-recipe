export const AD = {
  PATH: '/ads',
  NAME: 'AD',
  CUSTOMER_LIST: { PATH: 'customers', NAME: 'AD_CUSTOMER_LIST' },
  CUSTOMER_DETAIL: { PATH: 'customers/:customerId(\\d+)', NAME: 'AD_CUSTOMER_DETAIL' },
  LINK_LIST: { PATH: '', NAME: 'AD_LINK_LIST' },
  LINK_DETAIL: { PATH: ':adId(\\d+)', NAME: 'AD_LINK_DETAIL' },
  LINK_LOG: { PATH: ':adId(\\d+)/logs/:recipeId(\\d+)', NAME: 'AD_LINK_LOG' }
}

export const DASHBOARD = {
  PATH: '/dashboard',
  NAME: 'DASHBOARD'
}

export const EVENT = {
  PATH: '/events',
  NAME: 'EVENT'
}

export const INGREDIENT = {
  PATH: '/ingredients',
  NAME: 'INGREDIENT',
  LIST: { PATH: '', NAME: 'INGREDIENT_LIST' },
  DETAIL: { PATH: ':ingredientId(\\d+)', NAME: 'INGREDIENT_DETAIL' },
  INFO: { PATH: 'info', NAME: 'INGREDIENT_INFO' },
  NUTRITION: { PATH: 'nutritions', NAME: 'INGREDIENT_NUTRITION' },
  BENEFIT: { PATH: 'benefits', NAME: 'INGREDIENT_BENEFIT' },
  WARNING: { PATH: 'warnings', NAME: 'INGREDIENT_WARNING' },
  TIP: { PATH: 'tips', NAME: 'INGREDIENT_TIP' }
}

export const NUTRITION = {
  PATH: '/nutritions',
  NAME: 'NUTRITION'
}

export const RECIPE = {
  PATH: '/recipes',
  NAME: 'RECIPE',
  LIST: { PATH: '', NAME: 'RECIPE_LIST' },
  DETAIL: { PATH: ':recipeId(\\d+)', NAME: 'RECIPE_DETAIL' },
  INFO: { PATH: 'info', NAME: 'RECIPE_INFO' },
  INGREDIENT: { PATH: 'ingredients', NAME: 'RECIPE_INGREDIENT' },
  INSTRUCTION: { PATH: 'instruction', NAME: 'RECIPE_INSTRUCTION' },
  KEYWORD: { PATH: 'keywords', NAME: 'RECIPE_KEWORD' },
  AD: { PATH: 'ads', NAME: 'RECIPE_AD' }
}

export const STORAGE = {
  PATH: '/storages',
  NAME: 'STORAGE'
}

// fancythings.io
export const FT_CATEGORY = {
  PATH: '/ft/categories',
  NAME: 'FT_CATEGORY'
}

export const FT_POST = {
  PATH: '/ft/posts',
  NAME: 'FT_POST',
  LIST: { PATH: '', NAME: 'FT_POST_LIST' },
  DETAIL: { PATH: ':postId(\\d+)', NAME: 'FT_POST_DETAIL' }
}
