const PlatformModel = require('@/packages/mongoose/schema/platform').model

module.exports = function (req, res, next) {
    PlatformModel.findById(req.body._id, async (_err, _res) => {
        if (_err) return next(_err)
        if (!_res) return res.json({ code: 500, msg: '查询失败' })
        _res.name = req.body.name
        _res.value = req.body.value
        _res.isSupport = req.body.isSupport
        if (req.body.isDefault) {
            try {
                await PlatformModel.updateMany({ isDefault: true }, { isDefault: false })
                _res.isDefault = req.body.isDefault
            } catch (error) {
                return next(error)
            }
        }
        _res.save((__err, __res) => {
            if (__err) return next(__err)
            res.json({ code: 200, data: __res })
        })
    })
}
