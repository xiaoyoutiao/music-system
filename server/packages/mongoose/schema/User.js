const mongoose = require('mongoose')
const Console = require('my-logger').Console

const MONGODB_COLLECTION_USERS = 'users'

const option = {
    collection: 'users'
}
const collection = {
    /**帐号 */
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    /**密码 */
    pwd: {
        type: String,
        required: true
    },
    /**昵称 */
    nickName: {
        type: String,
        default: ''
    },
    /**年龄 */
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    // 出生日期
    birthday: {
        type: Date
    },
    /**性别 */
    gender: {
        type: Number,
        enum: [ 0, 1 ],
        default: 1
    },
    /**头像地址 */
    portrait: {
        type: String,
        default: ''
    },
    /**用户创建日期 */
    createDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    /**歌单 */
    songlist: {
        type: [ Object ]
    },
    /**歌曲收藏夹 */
    favorites: [
        {
            id: mongoose.Schema.Types.ObjectId,
            // 封面
            songList: {
                type: Array,
                default: []
            },
            name: {
                type: String,
                default: '未命名'
            },
            // 封面
            cover: {
                type: String,
                default: ''
            }
        }
    ],
    /**历史记录 */
    history: {
        type: Array
    }
}
// eslint-disable-next-line new-cap
var userSchema = mongoose.Schema(collection, option)

userSchema.methods.$_save = function (instance) {
    return new Promise((resolve, reject) => {
        instance.save((_err, _res) => {
            if (_err) reject(_err)
            else resolve(_res)
        })
    })
}

/**==============================================>
 * @function 查询用户是否已经存在
 * @return {Boolean} - 是否存在
 */
userSchema.methods.isExistUser = async function () {
    let condition = {
        name: this.name
    }
    let _user = await this.model(MONGODB_COLLECTION_USERS).findOne(condition, 'name')
    if (!_user) {
        return false
    }
    Console.info(
        `
====================该用户已存在====================
${_user }
===================================================
`)
    return true
}
/**==============================================>
 * @function 验证用户账号和密码
 * @return {Boolean} - 是否通过验证
 */
userSchema.methods.verifyNameAndPwd = async function () {
    let condition = {
        name: this.name,
        pwd: this.pwd
    }
    try {
        let _user = await this.model(MONGODB_COLLECTION_USERS).findOne(condition, 'name pwd')
        if (!_user) {
            return false
        }
        Console.info(
            `
====================账号和密码正确====================
${_user }
===================================================
`)
        return _user
    } catch (error) {
        throw error
    }
}

/**===============================================>
 * @function 向数据库添加新用户
 * @return {user|null} - user新用户数据, null失败
 */
userSchema.methods.saveUser = async function () {
    try {
        this.set('iAmNotInTheSchema', true)
        let _user = await this.save()
        if (_user) {
            Console.info(
                `
====================添加用户成功====================
${_user }
===================================================
`)
            return _user
        } else {
            return null
        }
    } catch (error) {
        throw error
    }
}
var User = mongoose.model(MONGODB_COLLECTION_USERS, userSchema)

module.exports = {
    userSchema,
    User
}
