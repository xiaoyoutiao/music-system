const { User } = require('../../../mongoose/schema/User');
// const SongHistory = require('../../../class/SongHistory')
const dateLogger = require('my-logger').dateLogger;

module.exports = async (req, res, next) => {
    const uid = req.session.uid;
    const { id, album = '', songname = '', station } = req.body

    if (!id) {
        return res.json({ code: 500, msg: '缺少id参数' })
    }
    if (!station) {
        return res.json({ code: 500, msg: '缺少station参数' })
    }

    const newHistory = {}
    newHistory.id = id
    newHistory.station = station
    newHistory.album = album
    newHistory.songname = songname

    User.findById(uid, 'history', async (err, _user) => {
        if (err) next(err, req, res, next)
        else {
            const historyIndex = _user.history.findIndex(_item => _item.id === id && _item.station === station)
            // 存在则删除旧历史记录
            if (historyIndex > -1) {
                _user.history.splice(historyIndex, 1)
            }
            _user.history.push(newHistory)
            _user.markModified('history')
            _user.$_save(_user)
                .then(_newUser => {
                    res.json({ code: 200, data: _newUser })
                })
                .catch(_err => {
                    dateLogger.error("MongoDB Update Error", _err);
                    res.json({ code: 500, msg: '添加历史记录失败' })
                })
        }
    })
}
