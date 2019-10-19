const AdminModel = require( '@/packages/mongoose/schema/Admin').model

module.exports = function (req, res, next) {
    AdminModel.findById(req.session.uid)
        .sort({ createDate: 1 })
        .select({ songList: 1 })
        .exec((_err, _res) => {
            if (_err) return next(_err)
            if (!_res) return res.json({ code: 500, msg: '查询失败' })
            // const songList = _res.songList.map()
            res.json({ code: 200, data: _res.songList })
        })
}
