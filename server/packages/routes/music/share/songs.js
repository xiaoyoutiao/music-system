const AdminModel = require( '@/packages/mongoose/schema/Admin').model

module.exports = function (req, res, next) {
    AdminModel.find({ isShare: true }, { shareSongs: 1, _id: 0 }, (_err, _res) => {
        if (_err) return next(_err)
        if (!_res) return res.json({ code: 200, data: { list: [] } })
        const songs = []
        _res.forEach(_item => {
            _item.shareSongs.forEach(__item => { songs.push(__item) })
        })
        res.json({ code: 200, data: { list: songs } })
    })
}
