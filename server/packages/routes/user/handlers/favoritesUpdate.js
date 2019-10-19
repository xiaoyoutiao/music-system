const { User } = require('../../../mongoose/schema/User');

module.exports = (req, res, next) => {
    const uid = req.session.uid;
    const { id, name, cover } = req.body
    if (!id) {
        res.json({ code: 500, msg: 'id不为空' })
        return
    }
    if (typeof name !== 'string') {
        res.json({ code: 500, msg: 'name必须为string类型' })
        return
    }
    User.findById(uid, 'favorites', (err, docs) => {
        if (err) next(err, req, res, next);
        else {
            const index = docs.favorites.findIndex(item => {
                return item.id.toString() === id.toString()
            })
            if (index === -1) {
                res.json({ code: 500, msg: '指定id收藏夹不存在' })
                return
            }
            docs.favorites[ index ].name = name
            if (cover) docs.favorites[ index ].cover = cover
            docs.markModified('favorites')
            docs.save((err, result) => {
                if (err) {
                    res.json({ code: 500, msg: '更新失败' })
                    throw err
                } else
                    res.json({ code: 200, data: docs.favorites[ index ] })
            })
        }
    })
}
