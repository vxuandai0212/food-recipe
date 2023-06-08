import AdminLayout from '@/layout/admin/AdminLayout'
import { DASHBOARD } from '@/utils/constants/route'
import { ROLE } from '@/utils/constants/role'

const dashboard = {
  path: DASHBOARD.PATH,
  component: AdminLayout,
  meta: {
    roles: [ROLE.ADMIN]
  },
  children: [
    {
      path: '',
      component: () => import('@/views/dashboard'),
      name: DASHBOARD.NAME,
      meta: {
        module: DASHBOARD.NAME,
        roles: [ROLE.ADMIN]
      }
    }
  ]
}
export default dashboard
