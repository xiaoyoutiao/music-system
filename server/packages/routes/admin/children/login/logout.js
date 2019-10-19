module.exports = (req, res) => {
    req.session.uid = null
    if (!req.session.uid) return res.json({ code: 200, data: {} })
}
