const { User } = require('../../../mongoose/schema/User');
const Favorites = require('../../../class/Favorites')
const mongoose = require('mongoose')

module.exports = (req, res, next) => {
    const uid = req.session.uid
    const resData = {}
    const { name } = req.body

    /**查询歌曲收藏夹 */
    User.findById(uid, 'favorites', async (err, queryRes) => {
        if (err) next(err, req, res, next);
        else {
            const id = new mongoose.Types.ObjectId
            const favorites = new Favorites({ id: id.toHexString(), name, songList: [] })
            queryRes.favorites.push(favorites.getJSON())
            queryRes.save((err, result) => {
                if (err) {
                    res.json({
                        code: 500,
                        msg: '添加收藏夹失败'
                    })
                    throw err
                }
                res.json({
                    code: 200,
                    data: {
                        name
                    }
                })
            })
        }
    })
}