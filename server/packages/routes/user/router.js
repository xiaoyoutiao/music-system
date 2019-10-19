/**  root = '/user' */
const express = require('express')
// eslint-disable-next-line new-cap
const router = express.Router()

// 用户登录验证
router.use(require('./handlers/isLogin'))
// 获取用户个人信息
router.get('/userInfo', require('./handlers/getUserInfo'))
// 更新用户个人信息
router.post('/userInfo', require('./handlers/updateUserInfo'))
// 查询播放历史记录
router.get('/history', require('./handlers/historyGet'))
// 添加播放历史记录
router.post('/addHistory', require('./handlers/historyAdd'))
// 清空历史记录
router.post('/history/clearAll', require('./handlers/historyClearAll'))
// 获取用户歌曲收藏夹列表
router.get('/favorites/list', require('./handlers/favoritesListGet'))
// 添加歌曲到歌曲收藏夹
router.post('/favorites/add', require('./handlers/favoritesAdd'))
// 删除收藏夹
router.post('/favorites/delete', require('./handlers/favoritesDelete'))
// 获取收藏夹歌曲
router.get('/favorites/get', require('./handlers/favoritesGetById'))
// 更新收藏夹信息
router.post('/favorites/update', require('./handlers/favoritesUpdate'))
// 添加歌曲到收藏夹
router.post('/favorites/add/song', require('./handlers/favoritesAddSong'))

module.exports = router
