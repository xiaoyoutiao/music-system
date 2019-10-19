const router = require('express').Router()
// const music = require('./handlers/music');

router.get('/', async (req, res) => {
    res.end(`${ req.method }\t-\t${ req.baseUrl }`)
})
//符合 { code, data }格式的歌曲搜索
router.get('/songs_list', require('./handlers/songsList'))
router.get('/by_keyword', require('./handlers/by_keyword'))
router.get('/get_radio_url', require('./handlers/get_radio_url'))
router.get('/get_lyric', require('./handlers/get_lyric'))
router.get('/lyric', require('./handlers/lyric'))
router.get('/radio', require('./handlers/radio.js'))
// router.get('/music', music);

module.exports = router
