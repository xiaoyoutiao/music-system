const AdminModel = require('@/packages/mongoose/schema/Admin').model
const SonglistModel = require('@/packages/mongoose/schema/Songlist').Model

module.exports = function (req, res, next) {
    global.$_methods.isRequired(req, res, [ 'title' ]).then((() => {
        AdminModel.findById(req.session.uid, { songList: 1 }, (_err, _res) => {
            if (_err) return next(_err)
            if (!_res) return res.json({ code: 500, msg: '查询失败' })
            const newSonglist = new SonglistModel({ title: req.body.title, description: req.body.description, cover: req.body.cover, isShare: req.body.isShare || false })
            _res.songList.push(newSonglist)
            _res.markModified('songList')
            _res.save((__err, __res) => {
                if (__err) return next(_err)
                res.json({ code: 200, data: __res })
            })
        })
    }))
}
