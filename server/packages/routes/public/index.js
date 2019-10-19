/**  root = '/user' */

const express = require('express')
const router = express.Router()

const multer = require('multer')
// 文件上传
const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, './public/upload/images')
    },
    filename (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

const allowCrossDomain = require('./handlers/allowCrossDomain')
const imageUpload = require('./handlers/imageUpload.js')

router.use(allowCrossDomain)
router.post('/image/upload', upload.single("file"), imageUpload)

module.exports = router
