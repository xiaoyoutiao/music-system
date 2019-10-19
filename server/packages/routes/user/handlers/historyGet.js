const { User } = require('../../../mongoose/schema/User');
module.exports = (req, res, next) => {
    const uid = req.session.uid;
    const resData = {}
    User.findById(uid, 'history -_id', (err, queryRes) => {
        if (err) next(err, req, res, next);
        else {
            resData.code = 200
            resData.data = JSON.parse(JSON.stringify(queryRes))
            res.json(resData)
        }
    })
}