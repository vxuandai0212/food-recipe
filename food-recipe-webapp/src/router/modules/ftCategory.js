import AdminLayout from '@/layout/admin/AdminLayout'
import { FT_CATEGORY } from '@/utils/constants/route'
import { ROLE } from '@/utils/constants/role'

const route = {
  path: FT_CATEGORY.PATH,
  component: AdminLayout,
  meta: {
    roles: [ROLE.ADMIN]
  },
  children: [
    {
      path: '',
      component: () => import('@/views/fancythings/category/index'),
      name: FT_CATEGORY.NAME,
      meta: {
        module: FT_CATEGORY.NAME,
        roles: [ROLE.ADMIN]
      }
    }
  ]
}
export default route
