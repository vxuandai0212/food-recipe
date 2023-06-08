import AdminLayout from '@/layout/admin/AdminLayout'
import { EVENT } from '@/utils/constants/route'
import { ROLE } from '@/utils/constants/role'

const event = {
  path: EVENT.PATH,
  component: AdminLayout,
  meta: {
    roles: [ROLE.ADMIN]
  },
  children: [
    {
      path: '',
      component: () => import('@/views/event'),
      name: EVENT.NAME,
      meta: {
        module: EVENT.NAME,
        roles: [ROLE.ADMIN]
      }
    }
  ]
}
export default event
