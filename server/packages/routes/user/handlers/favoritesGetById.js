const { User } = require('../../../mongoose/schema/User');

module.exports = (req, res, next) => {
    const uid = req.session.uid;
    const resData = {}

    /**查询歌曲收藏夹 */
    User.findById(uid, 'favorites -_id', (err, queryRes) => {
        if (err) next(err, req, res, next);
        else {
            resData.code = 200
            resData.data = JSON.parse(JSON.stringify(queryRes))
            res.json(resData)
        }
    })
}