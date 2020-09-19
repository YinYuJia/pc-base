// eslint-disable-next-line


/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  
  {
    path: '/',
    name: 'ddlogin',
    component: () => import('@/views/ddlogin'),
    meta: {
      title: '旦电首页',
      keepAlive: false,
      permission: ['user']
    }
  },
  {
    path: '/ddlogin',
    name: 'ddlogin',
    component: () => import('@/views/ddlogin'),
    meta: {
      title: '登录',
      keepAlive: false,
      permission: ['user']
    }
  },

  {
    path: '/ddindex',
    name: '首页',
    component: () => import('@/views/dd/ddindex'),
    meta: {
      title: '首页',
      keepAlive: false,
      permission: ['user']
    }
  },


  {
    path: '/sys',
    name: '系统管理',
    component: () => import('@/views/sys/system'),
    meta: {
      title: '系统管理',
      keepAlive: false,
      permission: ['user']
    },
    children: [
      {
        path: '/sys/user',
        name: '用户管理',
        component: () => import('@/views/sys/user'),
        meta: {
          title: '用户管理',
          keepAlive: false,
          permission: ['user']
        }
      },
      {
        path: '/sys/role',
        name: '用户管理',
        component: () => import('@/views/sys/role'),
        meta: {
          title: '角色管理',
          keepAlive: false,
          permission: ['user']
        }
      },
      {
        path: '/sys/group',
        name: '部门管理',
        component: () => import('@/views/sys/group'),
        meta: {
          title: '部门管理',
          keepAlive: false,
          permission: ['user']
        }
      },
      {
        path: '/sys/config',
        name: '参数管理 ',
        component: () => import('@/views/sys/config'),
        meta: {
          title: '参数管理',
          keepAlive: false,
          permission: ['user']
        }
      },
      {
        path: '/sys/menu',
        name: '菜单管理 ',
        component: () => import('@/views/sys/menu'),
        meta: {
          title: '菜单管理',
          keepAlive: false,
          permission: ['user']
        }
      },
    ]
  },


  {
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/500',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/500')
  },
]