const router = require('express').Router()

/* GET home page. */

router.get('/', function (req, res, next) {
  if (!req.session.uid) {
    res.redirect('/login')
  } else {
    console.log(req.session)
    res.render('index', {
      title: 'Express'
    })
  }
})

module.exports = router