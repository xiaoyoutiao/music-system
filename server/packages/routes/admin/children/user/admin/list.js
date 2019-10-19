const AdminModel = require('@/packages/mongoose/schema/Admin').model

module.exports = function (req, res, next) {
    AdminModel.find({}, 'account nickName isShare', (_err, _res) => {
        if (_err) return next(_err)
        else {
            if (!_res) return res.json({ code: 200, data: { totalCount: 0, list: [] } })
            const totalCount = _res.length
            const list = _res.map(_user => ({ id: _user.id, account: _user.account, nickName: _user.nickName, isShare: _user.isShare }))
            res.json({ code: 200, data: { totalCount, list } })
        }
    })
}
