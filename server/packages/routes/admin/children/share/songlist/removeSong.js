const AdminModel = require( '@/packages/mongoose/schema/Admin').model

module.exports = function (req, res, next) {
    global.$_methods.isRequired(req, res, [ 'songlistId', 'songId' ]).then((() => {
        AdminModel.findById(req.session.uid, { songList: 1 }, (_err, _res) => {
            if (_err) return next(_err)
            if (!_res) return res.json({ code: 500, msg: '查询用户歌单失败' })
            const songList = _res.songList.find(_item => _item._id.toString() === req.body.songlistId)
            if (!songList) return res.json({ code: 500, msg: '该歌单不存在' })
            const songIndex = songList.songs.findIndex(_item => _item._id.toString() === req.body.songId)
            if (songIndex === -1) return res.json({ code: 500, msg: '歌曲不存在' })
            songList.songs.splice(songIndex, 1)
            _res.markModified('songList')
            _res.save((__err, __res) => {
                if (_err) return res.json({ code: 500, msg: '删除失败' })
                res.json({ code: 200, data: __res.songList })
            })
        })
    }))
}
