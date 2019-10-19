const { User } = require('../../../mongoose/schema/User');

module.exports = (req, res, next) => {
    const uid = req.session.uid
    const { id, song } = req.body
    const songId = song.id
    const songStation = song.station
    if (!id || !song) { return res.json({ code: 500, msg: '缺少必要参数' }) }
    User.findById(uid, 'favorites', async (err, docs) => {
        if (err) next(err, req, res, next)
        else {
            let _favorite = docs.favorites.find(item => item.id.toString() === id.toString())
            if (!_favorite) { return res.json({ code: 500, msg: '收藏夹不存在' }) }
            let _song = _favorite.songList.find(item => item.id === songId && item.station === songStation)
            if (_song) { return res.json({ code: 500, msg: '收藏夹已存在该歌曲' }) }
            _favorite.songList.push(song)
            docs.markModified('favorites')
            docs.save((err, newDocs) => {
                if (err) { return res.json({ code: 500, msg: '保存失败' }) }
                return res.json({ code: 200, msg: '保存成功', data: {} })
            })
        }
    })
}
