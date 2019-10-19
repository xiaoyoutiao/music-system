import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/share',
    component: Layout,
    name: 'Share',
    meta: { title: '分享相关', icon: 'link' },
    children: [
      {
        path: 'songList',
        name: 'ShareSongList',
        component: () => import('@/views/share/songlist'),
        redirect: '/share/songList/list',
        children: [
          {
            path: 'list',
            name: 'ShareSongListList',
            component: () => import('@/views/share/songlist/list'),
            meta: { title: '分享歌单', icon: 'list' }
          },
          {
            path: 'songList/add',
            name: 'ShareSongListAdd',
            component: () => import('@/views/share/songlist/add'),
            meta: { title: '分享歌单 / 添加' },
            hidden: true
          },
          {
            path: 'songList/check',
            name: 'ShareSongListCheck',
            component: () => import('@/views/share/songlist/check'),
            meta: { title: '分享歌单 / 歌曲' },
            hidden: true
          },
          {
            path: 'songList/edit',
            name: 'ShareSongListEdit',
            component: () => import('@/views/share/songlist/edit'),
            meta: { title: '分享歌单 / 编辑' },
            hidden: true
          }
        ]
      },
      {
        path: 'songs',
        name: 'ShareSongs',
        component: () => import('@/views/share/songs'),
        redirect: '/share/songs/list',
        children: [
          {
            path: 'list',
            name: 'ShareSongsList',
            component: () => import('@/views/share/songs/list'),
            meta: { title: '分享歌曲', icon: 'music' }
          },
          {
            path: 'add',
            name: 'ShareSongsAdd',
            component: () => import('@/views/share/songs/add'),
            meta: { title: '分享歌曲 / 添加' },
            hidden: true
          }
        ]
      }
    ]
  },

  {
    path: '/search',
    name: 'Search',
    component: Layout,
    redirect: '/search/platform/list',
    meta: { title: '搜索相关', icon: 'search' },
    children: [
      // {
      //   path: 'index',
      //   name: 'Search',
      //   component: () => import('@/views/search/songs'),
      //   meta: { title: '搜索歌曲', icon: 'list' }
      // },
      {
        path: 'platform',
        name: 'Platform',
        component: () => import('@/views/search/platform'),
        redirect: '/search/index/platform/list',
        children: [
          {
            path: 'list',
            name: 'PlatformList',
            component: () => import('@/views/search/platform/list'),
            meta: { title: '平台', icon: 'platform' }
          },
          {
            path: 'add',
            name: 'PlatformAdd',
            component: () => import('@/views/search/platform/add'),
            meta: { title: '添加' },
            hidden: true
          },
          {
            path: 'edit',
            name: 'PlatformEdit',
            component: () => import('@/views/search/platform/edit'),
            meta: { title: '编辑' },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    name: 'Search',
    component: Layout,
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: '/user/list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'list' }
      },
      {
        path: '/user/admin/list',
        name: 'UserAdminList',
        component: () => import('@/views/user/admin/list'),
        meta: { title: '管理员列表', icon: 'list' }
      },
      {
        path: '/user/admin/add',
        name: 'UserAdminAdd',
        component: () => import('@/views/user/admin/add'),
        meta: { title: '添加管理员', icon: 'add' }
      },
      {
        path: '/user/admin/edit',
        name: 'UserAdminEdit',
        component: () => import('@/views/user/admin/edit'),
        meta: { title: '添加管理员', icon: 'add' },
        hidden: true
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://localhost:8080',
        meta: { title: '返回前台', icon: 'link' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
