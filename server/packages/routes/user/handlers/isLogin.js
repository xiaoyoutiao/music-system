module.exports = (req, res, next) => {
    const session = req.session
    if (!session.uid) {
        return res.json({
            code: 403,
            msg: '用户未登陆'
        })
    } else {
        next()
    }
}