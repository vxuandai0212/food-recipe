import AdminLayout from '@/layout/admin/AdminLayout'
import { FT_POST } from '@/utils/constants/route'
import { ROLE } from '@/utils/constants/role'

const route = {
  path: FT_POST.PATH,
  component: AdminLayout,
  meta: {
    roles: [ROLE.ADMIN]
  },
  children: [
    {
      path: FT_POST.LIST.PATH,
      component: () => import('@/views/fancythings/post/list/index'),
      name: FT_POST.LIST.NAME,
      meta: {
        module: FT_POST.NAME,
        roles: [ROLE.ADMIN]
      }
    },
    {
      path: FT_POST.DETAIL.PATH,
      component: () => import('@/views/fancythings/post/detail/index'),
      name: FT_POST.DETAIL.NAME,
      meta: {
        module: FT_POST.NAME,
        roles: [ROLE.ADMIN]
      }
    }
  ]
}
export default route
