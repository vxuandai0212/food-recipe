import AdminLayout from '@/layout/admin/AdminLayout'
import { STORAGE } from '@/utils/constants/route'
import { ROLE } from '@/utils/constants/role'

const storage = {
  path: STORAGE.PATH,
  component: AdminLayout,
  meta: {
    roles: [ROLE.ADMIN]
  },
  children: [
    {
      path: '',
      component: () => import('@/views/storage'),
      name: STORAGE.NAME,
      meta: {
        module: STORAGE.NAME,
        roles: [ROLE.ADMIN]
      }
    }
  ]
}
export default storage
