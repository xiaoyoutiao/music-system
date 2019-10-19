
module.exports = function (app) {
    // app.all(allowCrossDomain)
    app.use('/', require('./index/router'))
    app.use('/public', require('./public/index'))
    // 后台管理系统相应接口
    app.use('/admin', require('./admin'))
    app.use('/login', require('./login/router'))
    app.use('/register', require('./register/router'))
    // app.use('/songlist', songlist)
    app.use('/music', require('./music/router'))
    app.use('/user', require('./user/router'))
    // app.use('/qq', qq)
    // app.use('/search', search)
}
