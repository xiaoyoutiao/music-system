module.exports = (req, res, next) => {
    req.session.uid = null
    if (!req.session.uid) {
        res.send('already delete session')
    }
    res.end()
}
