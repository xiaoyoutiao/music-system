const PlatformModel = require('@/packages/mongoose/schema/platform').model

module.exports = function (req, res, next) {
    PlatformModel.find({})
        .sort({ isSupport: -1 })
        .exec((_err, _res) => {
            if (_err) return next(_err)
            let totalCount, list
            if (!_res) {
                totalCount = 0
                list = []
            } else {
                totalCount = _res.length
                list = _res
            }
            res.json({ code: 200, data: { totalCount, list } })
        })
}
