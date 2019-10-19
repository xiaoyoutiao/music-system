const session = require('express-session')

const config = {
    secret: 'xiaoyoutiao',
    name: 'ssid',
    cookie: {
        // 一个月
        maxAge: 30 * 24 * 60 * 60 * 1000
    },
    resave: true,
    saveUninitialized: true
}

module.exports = session(config)
