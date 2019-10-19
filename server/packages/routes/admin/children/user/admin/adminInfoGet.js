const AdminModel = require('@/packages/mongoose/schema/Admin').model

module.exports = function (req, res, next) {
    AdminModel.findById(req.session.uid, { songList: 0, shareSongs: 0, password: 0 }, (_err, _res) => {
        if (_err) return next(_err)
        else {
            if (!_res) return res.json({ code: 200, data: {} })
            return res.json({ code: 200, data: _res })
        }
    })
}
