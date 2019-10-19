var express = require('express');
var router = express.Router();
var http = require('http');
/* GET users listing. */
router.get('/', function (req, res, next) {
  var _req = http.request('http://c.y.qq.com', {
    method: 'GET',
    headers: {
      'referer': 'http://m.y.qq.com',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    },
    path: '/soso/fcgi-bin/search_for_qq_cp?w=夜笙歌&p=10&n=10&format=json'
  })
  var data = '';
  _req.on('error', (e) => {
    console.error(e);
  })
  _req.on('data', (chunk) => {
    data += chunk;
  })
  _req.on('end', () => {
    console.log(data);
    
    res.end(data)
  })
});

module.exports = router;