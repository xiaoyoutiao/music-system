const User = require('../../../mongoose/schema/User').User
const MD5 = require('../../../crypto/MD5/index')

module.exports = async function (req, res) {
    let username = req.body.u
    let pwd = req.body.p
    /**参数错误 */
    if (!username || !pwd) {
        res.json({
            code: 400,
            msg: '参数缺失'
        })
    }
    username = username.trim()

    let pwdMD5 = MD5(pwd.trim())
    let user = new User({
        name: username,
        pwd: pwdMD5
    })
    let _user = await user.verifyNameAndPwd()
    /**验证账号和密码失败 */
    if (!_user) {
        res.json({
            code: 401.1,
            msg: '用户登录验证失败'
        })
    }
    /**验证账号和密码成功*/
    else {
        /**设置session对象 */
        let _uid = _user._id
        req.session.uid = _uid
        // console.log(req.sessionID);
        // res.redirect('/');
        res.json({
            code: 200,
            data: {
                tokenId: req.sessionID
            }
        })
    }
}
