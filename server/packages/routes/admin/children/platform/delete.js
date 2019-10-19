const PlatformModel = require('@/packages/mongoose/schema/platform').model

module.exports = function (req, res) {
    global.$_methods.isRequired(req, res, [ '_id' ]).then(() => {
        PlatformModel.findByIdAndRemove(req.body._id, (_err, _res) => {
            if (_err) return res.json({ code: 500, msg: '删除失败' })
            if (!_res) res.json({ code: 500, msg: '删除失败' })
            return res.json({ code: 200, data: _res })
        })
    })
}
