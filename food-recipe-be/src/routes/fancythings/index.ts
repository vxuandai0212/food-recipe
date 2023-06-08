import { Router } from 'express'
import category from 'routes/fancythings/category'
import post from 'routes/fancythings/post'
import { auth } from 'middlewares/index'

const _routes: [string, Router][] = [
  ['/categories', category],
  ['/posts', post]
]

const _allRoutes: Router = Router()

_allRoutes.use(auth)

_routes.forEach((route) => {
  const [url, controller] = route
  _allRoutes.use(url, controller)
})

export default _allRoutes
