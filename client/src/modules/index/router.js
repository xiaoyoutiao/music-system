import Vue from 'vue'
import router from 'vue-router'
Vue.use(router)

export default new router({
    routes: [ {
        path: '/',
        name: 'home', // 主页
        component: () => import('./views/Home.vue'),
        children: [
            { path: '/', name: 'home', component: () => import('./components/Main') }, // 主页
            { path: 'setting', name: 'setting', component: () => import('./views/Setting/index') }, // 用户设置
            { path: 'favorites', name: 'favorites', component: () => import('./views/favorites/index') }, // 用户歌曲收藏夹
            { path: 'favorites/edit', name: 'favoritesEdit', component: () => import('./views/favorites/edit') }, // 用户歌曲收藏夹
            { path: 'favorites/check', name: 'favoritesCheck', component: () => import('./views/favorites/check') }, // 收藏夹歌曲列表
            { path: 'share/songList', name: 'shareSonglist', component: () => import('./views/share/songList') }, // 分享歌单
            { path: 'share/songs', name: 'shareSong', component: () => import('./views/share/songs') }, // 分享歌曲
            { path: 'share/songlistSongs', name: 'songlistSongs', component: () => import('./views/share/songlistSongs') } // 推荐歌单歌曲
        ]
    },
    {
        path: '/login',
        name: 'login', // 登录页
        component: () =>
            import('./views/login.vue')
    },
    {
        path: '/register',
        name: 'register', // 注册
        component: () =>
            import('./views/register.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import('./views/About.vue')
    },
    {
        path: '*',
        name: 'NotFound',
        component: () =>
            import('../../views/NotFound')
    }
    ]
})
