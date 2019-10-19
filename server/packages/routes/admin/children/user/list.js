const UserModel = require('@/packages/mongoose/schema/User').User

module.exports = function (req, res, next) {
    UserModel.find({}, 'name nickName gender createDate favorites history', (_err, _res) => {
        if (_err) return next(_err)
        if (!_res) return res.json({ code: 200, data: _res })

        const totalCount = _res.length
        const list = _res.map(_user => ({
            id: _user.id, account: _user.name, nickName: _user.nickName, genderDesc: _user.gender === 1 ? '男' : '女',
            historyCount: _user.history.length, favoritesCount: _user.favorites.length
        }))

        res.json({ code: 200, data: { totalCount, list } })
    })
}
