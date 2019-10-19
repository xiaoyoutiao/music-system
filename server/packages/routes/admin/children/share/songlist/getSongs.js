const AdminModel = require( '@/packages/mongoose/schema/Admin').model

module.exports = function (req, res, next) {
    global.$_methods.isRequiredQuery(req, res, [ '_id' ]).then((() => {
        AdminModel.findById(req.session.uid, { songList: 1 }, (_err, _res) => {
            if (_err) return next(_err)
            if (!_res) return res.json({ code: 500, msg: '查询失败' })
            const songlist = _res.songList.find(_item => _item._id.toString() === req.query._id)
            if (!songlist) return res.json({ code: 500, msg: '查询歌单失败' })
            res.json({ code: 200, data: songlist.songs })
        })
    }))
}
