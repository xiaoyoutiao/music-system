var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
/* GET users listing. */
var encode_netease_data = require('../netease/decode/encode').encode_netease_data;
const netease = require('../api/netease');
const qq = require('../api/qq');

router.get('/', (req, res, next) => {
  res.render('seach');
})
router.get('/getLyric', (req, res, next) => {
  let id = req.query.id;
  netease.getLyric(id)
    .then(res => {
      res.end(res.data)
    })
    .catch(error => {
      next(error, req, res, next)
    })
})

router.get('/search', function (req, res, next) {
  let keyWord = req.query.w;
  let station = req.query.s
  switch (station) {
    case 'netease':
      {
        netease.getMusic(keyWord)
        .then((result) => {
          res.json(result)
        })
        .catch((err) => {
          console.log(err);
        })
        
      }
      // netease.seachResult(keyWord)
      //   .then(data => {
      //     let firstSong = data.result.songs[0];
      //     netease.getRadioUrl(firstSong.id)
      //       .then((data) => {
      //         res.json(data)
      //       })
      //       .catch((err) => {
      //         throw err
      //       })

      // res.render('seachMusicResult', {
      //   netease: true,
      //   seachResult: data,
      //   resultStr: data
      // })
      // })
      // .catch((error) => next(error, req, res, next));
      break;
    case 'qq':
      qq.seachMusic(keyWord)
        .then(data => {
            if (typeof data === 'string') {
              res.render('seachMusicResult', {
                qq: true,
                seachResult: JSON.parse(data),
                resultStr: data
              })
            } else {
              res.render('seachMusicResult', {
                qq: true,
                seachResult: data,
                resultStr: JSON.stringify(data)
              })
            }
          }

        )
        .catch((error) => next(error, req, res, next))
      break;
    default:
      res.render('seachMusicResult', {
        error: '没有选择平台'
      })
      break;
  }
})


router.get('/radio', (req, res, next) => {
  let songId = req.query.id;
  netease.getRadioUrl(songId)
    .then((result) => {
      if (result.code === 200) {
        res.render('musicAddress', {
          data: result.data,
        });
      }

    })
    .catch((error) => next(error, req, res, next))
})
module.exports = router;