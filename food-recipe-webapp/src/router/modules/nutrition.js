import AdminLayout from '@/layout/admin/AdminLayout'
import { NUTRITION } from '@/utils/constants/route'
import { ROLE } from '@/utils/constants/role'

const nutrition = {
  path: NUTRITION.PATH,
  component: AdminLayout,
  meta: {
    roles: [ROLE.ADMIN]
  },
  children: [
    {
      path: '',
      component: () => import('@/views/nutrition'),
      name: NUTRITION.NAME,
      meta: {
        module: NUTRITION.NAME,
        roles: [ROLE.ADMIN]
      }
    }
  ]
}
export default nutrition
