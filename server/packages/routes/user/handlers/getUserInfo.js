const { User } = require('../../../mongoose/schema/User');
module.exports = (req, res, next) => {
    const uid = req.session.uid;
    const resData = {}
    User.findById(uid, '-pwd -createDate -_id -_v -history -songlist -favorites -date', (err, queryRes) => {
        if (err) next(err, req, res, next);
        else {
            resData.code = 200
            resData.data = JSON.parse(JSON.stringify(queryRes))
            res.json(resData)
        }
    })
}