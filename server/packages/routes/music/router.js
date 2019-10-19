// eslint-disable-next-line new-cap
const router = require('express').Router()

router.get('/', (req, res) => {
    res.end(`${ req.method }\t-\t${ req.baseUrl }`)
})
router.use('/search', require('./search/router.js'))
// 获取支持的平台列表
router.get('/platform/list', require('./platform/list'))
// 获取分享的歌曲
router.get('/share/songs', require('./share/songs'))
// 获取分享的歌单
router.get('/share/songlist', require('./share/songlist'))

module.exports = router
