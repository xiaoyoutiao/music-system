// eslint-disable-next-line new-cap
const router = require('express').Router()
const getPublicKey = require('./handlers/getPublicKey')
const loginUser = require('./handlers/loginUser')
const logout = require('./handlers/logout.js')

/**
 * root = '/login'
 */
router.get('/', (req, res) => {
    res.render('login')
})
router.post('/user', loginUser)
router.get('/public_key', getPublicKey)
router.get('/exit', logout)
module.exports = router
