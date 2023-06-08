import AdminLayout from '@/layout/admin/AdminLayout'
import { RECIPE } from '@/utils/constants/route'
import { ROLE } from '@/utils/constants/role'
import RecipeDetailLayout from '@/views/recipe/detail'

const recipe = {
  path: RECIPE.PATH,
  component: AdminLayout,
  meta: {
    roles: [ROLE.ADMIN]
  },
  children: [
    {
      path: RECIPE.LIST.PATH,
      component: () => import('@/views/recipe/list/index'),
      name: RECIPE.LIST.NAME,
      meta: {
        module: RECIPE.NAME,
        roles: [ROLE.ADMIN]
      }
    },
    {
      path: RECIPE.DETAIL.PATH,
      component: RecipeDetailLayout,
      name: RECIPE.DETAIL.NAME,
      meta: {
        module: RECIPE.NAME
      },
      redirect: to => {
        // the function receives the target route as the argument
        // we return a redirect path/location here.
        return { name: RECIPE.INFO.NAME, params: { recipeId: to.params.recipeId }}
      },
      children: [
        {
          path: RECIPE.INFO.PATH,
          component: () => import('@/views/recipe/detail/info/index'),
          name: RECIPE.INFO.NAME,
          meta: {
            module: RECIPE.NAME
          }
        },
        {
          path: RECIPE.INGREDIENT.PATH,
          component: () => import('@/views/recipe/detail/ingredient/index'),
          name: RECIPE.INGREDIENT.NAME,
          meta: {
            module: RECIPE.NAME
          }
        },
        {
          path: RECIPE.INSTRUCTION.PATH,
          component: () => import('@/views/recipe/detail/instruction/index'),
          name: RECIPE.INSTRUCTION.NAME,
          meta: {
            module: RECIPE.NAME
          }
        },
        {
          path: RECIPE.KEYWORD.PATH,
          component: () => import('@/views/recipe/detail/keyword/index'),
          name: RECIPE.KEYWORD.NAME,
          meta: {
            module: RECIPE.NAME
          }
        },
        {
          path: RECIPE.AD.PATH,
          component: () => import('@/views/recipe/detail/ad/index'),
          name: RECIPE.AD.NAME,
          meta: {
            module: RECIPE.NAME
          }
        }
      ]
    }
  ]
}
export default recipe
