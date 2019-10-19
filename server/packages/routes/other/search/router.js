const router = require('express').Router();
const music = require('./handlers/music');

/**处理函数 */
const byKeyword = require('./handlers/bykeyword');

router.get('/', (req, res, next) => {
    res.end('search api');
})
router.get('/bykeyword', byKeyword);
router.get('/music', music);


module.exports = router