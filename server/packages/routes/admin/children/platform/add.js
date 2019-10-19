const PlatformModel = require('@/packages/mongoose/schema/platform').model

module.exports = function (req, res, next) {
    global.$_methods.isRequired(req, res, [ 'name', 'value', 'isSupport' ]).then(() => {
        const platform = new PlatformModel({ name: req.body.name, value: req.body.value, isSupport: req.body.isSupport })
        platform.save((_err, _res) => {
            // if (_err) return res.json({ code: 500, msg: '添加失败' })
            if (_err) return next(_err)
            res.json({ code: 200, data: _res })
        })
    })
}
