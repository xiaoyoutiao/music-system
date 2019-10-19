const AdminModel = require('@/packages/mongoose/schema/Admin').model
const MD5 = require('@/packages/crypto/MD5/index')

module.exports = function (req, res, next) {
    const { account } = req.body
    AdminModel.findOne({ account: account }, (_err, _res) => {
        if (_err)
            return next(req, res, _err)
        else {
            if (!_res)
                addAdmin(req, res)
            else res.json({ code: 500, msg: '该帐号已存在' })
        }
    })
}

function addAdmin (req, res) {
    const { account, password, nickName = null } = req.body
    const adminProp = new Object()
    adminProp.account = account.trim()
    adminProp.password = MD5(password.trim()) // 密码MD5加密
    if (nickName) adminProp.nickName = nickName.trim()
    const admin = new AdminModel(adminProp)
    admin.save((_err, _res) => {
        if (_err) return res.json({ code: 500, msg: '添加失败' })
        else res.json({ code: 200, data: _res })
    })
}
