const AdminModel = require('@/packages/mongoose/schema/Admin').model
const MD5 = require('@/packages/crypto/MD5/index')

module.exports = async function (req, res) {
    global.$_methods.isRequired(req, res, [ 'account', 'password' ]).then(() => {
        // eslint-disable-next-line new-cap
        let passwordMD5 = MD5(req.body.password)
        console.log(MD5(req.body.password))

        AdminModel.findOne({ account: req.body.account }, (_err, _res) => {
            if (_err) return res.json({ code: 500, msg: '查询失败' })
            if (!_res) return res.json({ code: 500, msg: '用户不存在' })
            if (_res.password !== passwordMD5) return res.json({ code: 500, msg: '密码错误' })
            req.session.uid = _res._id
            res.json({ code: 200, data: { tokenId: req.sessionID } })
        })
    })
}
