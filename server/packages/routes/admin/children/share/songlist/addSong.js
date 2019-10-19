const AdminModel = require('@/packages/mongoose/schema/Admin').model
const SongModel = require('@/packages/mongoose/schema/Song').Model

module.exports = function (req, res, next) {
    global.$_methods.isRequired(req, res, [ '_id', 'song' ]).then((() => {
        AdminModel.findById(req.session.uid, { songList: 1 }, (_err, _res) => {
            if (_err) return next(_err)
            if (!_res) return res.json({ code: 500, msg: '查询失败' })
            const songlist = _res.songList.find(_item => _item._id.toString() === req.body._id)
            if (!songlist) return res.json({ code: 500, msg: '查询歌单失败' })
            const isExistSong = songlist.songs.find(_item => _item._id.toString === req.body.song._id)
            if (isExistSong) return res.json({ code: 500, msg: '歌曲已存在' })
            songlist.songs.push(new SongModel(req.body.song))
            _res.markModified('songList')
            _res.save((__err, __res) => {
                if (__err) return next(_err)
                res.json({ code: 200, data: __res })
            })
        })
    }))
}
