const AdminModel = require( '@/packages/mongoose/schema/Admin').model
const SongModel = require( '@/packages/mongoose/schema/Song').Model

module.exports = function (req, res, next) {
    global.$_methods.isRequired(req, res, [ 'id', 'station' ]).then((() => {
        AdminModel.findById(req.session.uid, { shareSongs: 1 }, (_err, _res) => {
            if (_err) return next(_err)
            if (!_res) return res.json({ code: 500, msg: '查询失败' })
            const index = _res.shareSongs.findIndex(_item => _item.id === req.body.id && _item.station === req.body.station)
            if (index > -1) return res.json({ code: 500, msg: '该歌曲已添加' })
            _res.shareSongs.push(new SongModel(req.body))
            _res.markModified('shareSongs')
            _res.save((__err, __res) => {
                if (_err) return next(_err)
                if (!_res) return res.json({ code: 500, msg: '保存失败' })
                res.json({ code: 200, data: __res })
            })
        })
    }))
}
