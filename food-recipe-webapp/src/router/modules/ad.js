import AdminLayout from '@/layout/admin/AdminLayout'
import { AD } from '@/utils/constants/route'
import { ROLE } from '@/utils/constants/role'

const recipe = {
  path: AD.PATH,
  component: AdminLayout,
  meta: {
    roles: [ROLE.ADMIN]
  },
  children: [
    {
      path: AD.CUSTOMER_LIST.PATH,
      component: () => import('@/views/ad/customer/list/index'),
      name: AD.CUSTOMER_LIST.NAME,
      meta: {
        module: AD.NAME,
        roles: [ROLE.ADMIN]
      }
    },
    {
      path: AD.CUSTOMER_DETAIL.PATH,
      component: () => import('@/views/ad/customer/detail/index'),
      name: AD.CUSTOMER_DETAIL.NAME,
      meta: {
        module: AD.NAME,
        roles: [ROLE.ADMIN]
      }
    },
    {
      path: AD.LINK_LIST.PATH,
      component: () => import('@/views/ad/link/list/index'),
      name: AD.LINK_LIST.NAME,
      meta: {
        module: AD.NAME,
        roles: [ROLE.ADMIN]
      }
    },
    {
      path: AD.LINK_DETAIL.PATH,
      component: () => import('@/views/ad/link/detail/index'),
      name: AD.LINK_DETAIL.NAME,
      meta: {
        module: AD.NAME,
        roles: [ROLE.ADMIN]
      }
    },
    {
      path: AD.LINK_LOG.PATH,
      component: () => import('@/views/ad/link/log/index'),
      name: AD.LINK_LOG.NAME,
      meta: {
        module: AD.NAME,
        roles: [ROLE.ADMIN]
      }
    }
  ]
}
export default recipe
