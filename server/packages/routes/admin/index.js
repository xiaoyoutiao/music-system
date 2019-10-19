// root = '/admin'
const express = require('express')
// eslint-disable-next-line new-cap
const router = express.Router()
// 管理员登录
router.post('/login', require('./children/login'))
// 清除登录缓存
router.post('/logout', require('./children/login/logOut'))
// 登录验证
router.use(require('./children/login/validator'))
// 添加管理员
router.post('/user/admin/add', require('./children/user/admin/add'))
// 获取管理员列表
router.get('/user/admin/list', require('./children/user/admin/list'))
// 获取注册用户列表
router.get('/user/list', require('./children/user/list'))
// 获取管理员个人信息
router.get('/user/userInfo', require('./children/user/admin/adminInfoGet'))
// 更改管理员个人信息
router.post('/user/admin/editIshare', require('./children/user/admin/editIshare'))
// 获取平台列表
router.get('/platform/list', require('./children/platform/list'))
// 更新单个平台
router.post('/platform/update', require('./children/platform/update'))
// 添加平台
router.post('/platform/add', require('./children/platform/add'))
//  删除平台
router.post('/platform/delete', require('./children/platform/delete'))
//  添加分享歌单
router.post('/share/songlist/add', require('./children/share/songlist/add'))
// 获取分享歌单
router.get('/share/songlist/list', require('./children/share/songlist/list'))
// 删除分享歌单
router.post('/share/songlist/delete', require('./children/share/songlist/delete'))
// 编辑分享歌单
router.post('/share/songlist/edit', require('./children/share/songlist/edit'))
// 添加歌曲到分享歌单
router.post('/share/songlist/addSong', require('./children/share/songlist/addSong'))
// 获取分享歌单歌单
router.get('/share/songlist/getSongs', require('./children/share/songlist/getSongs'))
// 移除分享歌单歌曲
router.post('/share/songlist/removeSong', require('./children/share/songlist/removeSong'))
// 添加分享歌曲到登录管理员
router.post('/share/songs/add', require('./children/share/songs/add'))
// 获取登录管理员分享歌曲
router.get('/share/songs/list', require('./children/share/songs/list'))
// 删除分享歌曲
router.post('/share/songs/delete', require('./children/share/songs/delete'))

module.exports = router
