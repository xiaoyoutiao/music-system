const AdminModel = require('@/packages/mongoose/schema/Admin').model

module.exports = function (req, res, next) {
    AdminModel.findById(req.session.uid, { isShare: 1 }, (_err, _res) => {
        if (_err) return next(_err)
        else {
            _res.isShare = req.body.isShare
            _res.save((__err, __res) => {
                if (__err) return res.json({ code: 500, msg: '更新失败' })
                res.json({ code: 200, data: __res })
            })
        }
    })
}
