const express = require('express');
const router = express.Router();
const registerUser = require('./handlers/registerUser');

var getRegiseter = (req, res, next) => {
    res.render('register');
}
/**
 * root = /register
 */
router.get('/', getRegiseter);
router.post('/user', registerUser);
module.exports = router