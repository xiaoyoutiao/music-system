const AdminModel = require( '@/packages/mongoose/schema/Admin').model

module.exports = function (req, res, next) {
    global.$_methods.isRequired(req, res, [ '_id', 'title' ]).then((() => {
        AdminModel.findById(req.session.uid, { songList: 1 }, (_err, _res) => {
            if (_err) return next(_err)
            if (!_res) return res.json({ code: 500, msg: '查询失败' })
            const songlist = _res.songList.find(_item => _item._id.toString() === req.body._id)
            if (!songlist) return res.json({ code: 500, msg: '查询歌单失败' })
            songlist.title = req.body.title
            songlist.cover = req.body.cover
            songlist.description = req.body.description
            songlist.isShare = req.body.isShare
            _res.markModified('songList')
            _res.save((__err, __res) => {
                if (__err) return next(_err)
                res.json({ code: 200, data: __res })
            })
        })
    }))
}
