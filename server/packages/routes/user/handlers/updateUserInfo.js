const { User } = require('../../../mongoose/schema/User')

module.exports = (req, res, next) => {
    const uid = req.session.uid;
    const resData = {}
    const { nickName, birthday, gender, portrait } = req.body

    /**查询歌曲收藏夹 */
    User.findById(uid, 'nickName gender birthday portrait', async (err, queryRes) => {
        if (err) return next(err, req, res, next);
        else {
            try {
                queryRes.nickName = nickName
                queryRes.birthday = birthday
                queryRes.gender = gender
                queryRes.portrait = portrait
                console.log(queryRes);
                const newUserInfo = queryRes.save((err, docs) => {
                    if (err) {
                        throw err
                    } else {
                        resData.code = 200
                        resData.data = {}
                    }
                    res.json(resData)
                })
            } catch (error) {
                throw error
            }
        }
    })
}