module.exports = {
    appenders: {
        console: {
            type: 'console'
        },
        fileLogs: {
            type: 'file',
            filename: 'logs/default.log'
        },
        dateLogs: {
            type: 'dateFile',
            filename: 'logs/date/date.log',
            pattern: 'yyyy-MM-dd',
            keepFileExt: true
        }
    },
    categories: {
        default: {
            appenders: ['console'],
            level: 'info'
        },
        console: {
            appenders: ['console'],
            level: 'debug'
        },
        dateLogger: {
            appenders: ['console', 'dateLogs'],
            level: 'error'
        }
    }
}
