// 注册自定义模块路径
import 'module-alias/register'

import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import { renderFile } from 'ejs'
import favicon from 'serve-favicon'
import sassMiddleware from 'node-sass-middleware'
import session from './packages/middleware/session/index'

/**==================loggers===================== */
import log4js from 'log4js'
import logger  from "./packages/util/log4js/index"

/**============== global constant ===============*/

// 挂载全局方法
import '@/packages/util/methods'

/**==================Main===================== */
const app = express()
import routers from './packages/routes/routers'
import connectMongoDB from './packages/mongoose/index'

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())
/** ==================Logger=====================*/
app.use(log4js.connectLogger(logger.Console, {
    // format:(req, res) => `${req.method}---:status${decodeURI(req.url)}`
    format: `:method---:status---:response-time ms---:url`
}))
/** ==================View Engine SetUp=====================*/
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views/'))

app.engine('.html', renderFile)
app.set('view engine', 'html')
/** ==================Static Resource===================== */
app.use(favicon(path.join(__dirname, './public/favicon.ico')))
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    // true = .sass and false = .scss
    indentedSyntax: true,
    sourceMap: true
}))

connectMongoDB()
/**session middleware */
app.use(session)
/** Mount Routers*/
routers(app)

app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res) {
    //生成错误日志文件
    logger.dateLogger.error(err)
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.json({ code: 500, msg: err.message })
    // res.render('error');
})

module.exports = app
