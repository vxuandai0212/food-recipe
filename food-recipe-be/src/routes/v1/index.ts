import { Router } from 'express'
import adCustomer from 'routes/v1/ad-customer'
import adLocation from 'routes/v1/ad-location'
import ad from 'routes/v1/ad'
import authRoute from 'routes/v1/auth'
import cookEvent from 'routes/v1/cook-event'
import image from 'routes/v1/image'
import ingredientInfo from 'routes/v1/ingredient-info'
import ingredientNutrition from 'routes/v1/ingredient-nutrition'
import ingredient from 'routes/v1/ingredient'
import keyword from 'routes/v1/keyword'
import nutrition from 'routes/v1/nutrition'
import recipeCookEvent from 'routes/v1/recipe-cook-event'
import recipeIngredient from 'routes/v1/recipe-ingredient'
import recipeKeyword from 'routes/v1/recipe-keyword'
import recipe from 'routes/v1/recipe'
import stat from 'routes/v1/stat'
import storage from 'routes/v1/storage'
import view from 'routes/v1/view'
import { auth } from 'middlewares/index'

const _routes: [string, Router][] = [
  ['/ad-customer', adCustomer],
  ['/ad-location', adLocation],
  ['/ads', ad],
  ['/auth', authRoute],
  ['/cook-event', cookEvent],
  ['/images', image],
  ['/ingredient-info', ingredientInfo],
  ['/ingredient-nutrition', ingredientNutrition],
  ['/ingredients', ingredient],
  ['/keywords', keyword],
  ['/nutritions', nutrition],
  ['/recipe-cook-event', recipeCookEvent],
  ['/recipe-ingredient', recipeIngredient],
  ['/recipe-keyword', recipeKeyword],
  ['/recipes', recipe],
  ['/stats', stat],
  ['/storages', storage],
  ['/views', view]
]

const _allRoutes: Router = Router()

_allRoutes.use(auth)

_routes.forEach((route) => {
  const [url, controller] = route
  _allRoutes.use(url, controller)
})

export default _allRoutes
