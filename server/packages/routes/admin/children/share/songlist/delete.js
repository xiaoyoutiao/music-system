const AdminModel = require( '@/packages/mongoose/schema/Admin').model

module.exports = function (req, res, next) {
    global.$_methods.isRequired(req, res, [ '_id' ]).then((() => {
        AdminModel.findById(req.session.uid, { songList: 1 }, (_err, _res) => {
            if (_err) return next(_err)
            if (!_res) return res.json({ code: 500, msg: '查询失败' })
            const index = _res.songList.findIndex(_item => _item._id.toString() === req.body._id)
            if (index === -1) return res.json({ code: 500, msg: '该歌单不存在' })
            _res.songList.splice(index, 1)
            _res.markModified('songList')
            _res.save((__err, __res) => {
                if (_err) return res.json({ code: 500, msg: '删除失败' })
                res.json({ code: 200, data: __res.songList })
            })
        })
    }))
}
