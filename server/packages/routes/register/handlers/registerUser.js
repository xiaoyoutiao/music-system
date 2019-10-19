const User = require("../../../mongoose/schema/User").User;
const Console = require("my-logger").Console;
const toMD5 = require("../../../crypto/MD5/index");

module.exports = async (req, res, next) => {
  const username = req.body.user.trim();
  const pwd = req.body.pwd.trim();
  if (!username || !pwd) {
    res.end("username or password not null");
  }
  /**通过验证 */
  if (verifyParams(username, pwd)) {
    try {
      let pwdMD5 = toMD5(pwd);
      let newUser = new User({
        name: username,
        pwd: pwdMD5
      });
      let isExist = await newUser.isExistUser();
      const resData = {};
      /**用户已存在 */
      if (isExist) {
        // res.end('this user name already exists ')
        resData.code = 402.1;
        resData.msg = "该帐号已被注册";
      } else {
        /**用户不存在*/
        let new_user = await newUser.saveUser();
        if (new_user) {
          resData.code = 200;
          resData.msg = "注册成功";
        } else {
          resData.code = 402.2;
          resData.msg = "注册失败 请稍候再试...";
        }
      }
      res.json(resData);
    } catch (error) {
      next(error, req, res, next);
    }
  } else {
    /**未通过验证 */
    res.end("verify fail");
  }
};

/**============================================================>
 * @function 校验用户名
 * @param {user} username: string
 * @return {Boolean}
 * */
function verifyParams(name, pwd) {
  if (typeof name !== "string" || typeof pwd !== "string") {
    throw new TypeError("argument must be a string");
  }
  const userRegex = new RegExp(/^[a-zA-Z0-9]+$/);

  let user_length = name.length;
  let pwd_length = pwd.length;
  if (user_length < 8 || user_length > 15) {
    return false;
  }
  if (pwd_length < 6) {
    return false;
  }
  /**密码不符合格式 */
  if (matchSpace(pwd)) {
    return false;
  }
  return userRegex.test(name);

  function matchSpace(str) {
    const matchSpace = new RegExp(/\s/);
    if (matchSpace.test(str)) {
      return true;
    }
    return false;
  }
}
