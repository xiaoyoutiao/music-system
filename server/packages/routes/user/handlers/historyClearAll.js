const { User } = require('../../../mongoose/schema/User');

module.exports = (req, res, next) => {
    const uid = req.session.uid

    User.findById(uid, 'history', (err, docs) => {
        docs.history = []
        docs.save((err) => {
            if (err) return next(err)
            res.json({
                code: 200,
                data: {}
            })
        })
    })
}
