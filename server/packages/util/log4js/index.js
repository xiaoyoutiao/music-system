const log4js = require('log4js')
const config = require('./config')

log4js.configure(config)

const Console = log4js.getLogger('console')
const dateLogger = log4js.getLogger('dateLogger')

module.exports = {
    Console,
    dateLogger
}
