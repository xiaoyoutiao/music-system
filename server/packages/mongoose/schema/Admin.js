const mongoose = require('mongoose')
const SonglistSchema = require('@/packages/mongoose/schema/Songlist').Schema
const SongSchema = require('@/packages/mongoose/schema/Song').Schema

const COLLECTION_ADMIN = 'admin'
const isRequired = function (field) {
    return field !== null && field !== '' && field !== undefined
}
const option = {
    collection: COLLECTION_ADMIN
}
const collection = {
    // 帐号
    account: {
        type: String,
        trim: true,
        required: [
            function () {
                return isRequired(this.account)
            },
            'name is required !'
        ],
        lowercase: true
    },
    // 密码
    password: {
        type: String,
        trim: true,
        required: [
            function () {
                return isRequired(this.password)
            },
            'password is required !'
        ]
    },
    // 昵称
    nickName: {
        type: String,
        trim: true
    },
    // 头像
    portrait: {
        type: String,
        trim: true
    },
    // 歌单
    songList: [
        SonglistSchema
    ],
    // 分享歌曲
    shareSongs: [ SongSchema ],
    // 是否分享该管理员的歌单和歌曲
    isShare: {
        type: Boolean,
        default: false
    }
}
// eslint-disable-next-line new-cap
const schema = mongoose.Schema(collection, option)
const model = mongoose.model(COLLECTION_ADMIN, schema)

schema.methods.$_save = function (instance) {
    return new Promise((resolve, reject) => {
        instance.save((_err, _res) => {
            if (_err) return reject(_err)
            else resolve(_res)
        })
    })
}

schema.methods.$_addUser = function (instance, account, password, nickName, songList) {
    return new Promise((resolve, reject) => {
        instance.account = account
        instance.password = password
        if (nickName) instance.nickName = nickName
        if (songList) instance.songList = songList
        instance.save((_err, _res) => {
            if (_err) return reject(_err)
            else resolve(_res)
        })
    })
}

schema.methods.$_getUserSongListById = function (id) {
    return new Promise((resolve, reject) => {
        this.model(COLLECTION_ADMIN).findById(id, 'songList', (_err, _res) => {
            if (_err) return reject(_err)
            else resolve(_res.songList)
        })
    })
}

module.exports = {
    schema,
    model
}
