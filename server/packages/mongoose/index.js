const mongoose = require('mongoose')
const dateLogger = require('my-logger').dateLogger
const Console = require('my-logger').Console
const dbConfig = require('./config')
const URI = 'mongodb://' + dbConfig.DB_HOST + ':' + dbConfig.DB_PORT + '/' + dbConfig.DB_NAME

module.exports = function () {
    mongoose.connect(URI, dbConfig.option)

    const db = mongoose.connection
    db.on('error', (error) => {
        dateLogger.error("mongoDB connect fialed", error)
        throw error
    })
    db.once('open', () => {
        Console.info(`
    <====================================>
     Successful Connection To The MongoDB
    <====================================>
    `)
    })
}
