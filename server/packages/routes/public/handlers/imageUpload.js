module.exports = async (req, res) => {
    const resObj = {}
    const file = req.file
    if (!file) {
        resObj.code = 500
        resObj.msg = '图片上传失败'
    } else {
        resObj.code = 200
        resObj.data = {}
        resObj.data.url = '/' + file.path.split('\\').join('/')
    }
    res.json(resObj)
    res.end()
}
