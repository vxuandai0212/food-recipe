import AdminLayout from '@/layout/admin/AdminLayout'
import { INGREDIENT } from '@/utils/constants/route'
import { ROLE } from '@/utils/constants/role'
import IngredientDetailLayout from '@/views/ingredient/detail'

const ingredient = {
  path: INGREDIENT.PATH,
  component: AdminLayout,
  meta: {
    roles: [ROLE.ADMIN]
  },
  children: [
    {
      path: INGREDIENT.LIST.PATH,
      component: () => import('@/views/ingredient/list/index'),
      name: INGREDIENT.LIST.NAME,
      meta: {
        module: INGREDIENT.NAME,
        roles: [ROLE.ADMIN]
      }
    },
    {
      path: INGREDIENT.DETAIL.PATH,
      component: IngredientDetailLayout,
      name: INGREDIENT.DETAIL.NAME,
      meta: {
        module: INGREDIENT.NAME
      },
      redirect: to => {
        // the function receives the target route as the argument
        // we return a redirect path/location here.
        return { name: INGREDIENT.INFO.NAME, params: { ingredientId: to.params.ingredientId }}
      },
      children: [
        {
          path: INGREDIENT.INFO.PATH,
          component: () => import('@/views/ingredient/detail/info/index'),
          name: INGREDIENT.INFO.NAME,
          meta: {
            module: INGREDIENT.NAME
          }
        },
        {
          path: INGREDIENT.NUTRITION.PATH,
          component: () => import('@/views/ingredient/detail/nutrition/index'),
          name: INGREDIENT.NUTRITION.NAME,
          meta: {
            module: INGREDIENT.NAME
          }
        },
        {
          path: INGREDIENT.BENEFIT.PATH,
          component: () => import('@/views/ingredient/detail/benefit/index'),
          name: INGREDIENT.BENEFIT.NAME,
          meta: {
            module: INGREDIENT.NAME
          }
        },
        {
          path: INGREDIENT.WARNING.PATH,
          component: () => import('@/views/ingredient/detail/warning/index'),
          name: INGREDIENT.WARNING.NAME,
          meta: {
            module: INGREDIENT.NAME
          }
        },
        {
          path: INGREDIENT.TIP.PATH,
          component: () => import('@/views/ingredient/detail/tip/index'),
          name: INGREDIENT.TIP.NAME,
          meta: {
            module: INGREDIENT.NAME
          }
        }
      ]
    }
  ]
}
export default ingredient
