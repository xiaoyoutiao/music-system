const mongoose = require('mongoose')

const option = {
    toJSON: { getters: false, virtuals: true },
    id: false
}
// 需要返回给前台的系统支持的搜索平台
const collection = {
    // 标题
    id: {
        type: String,
        reuqired: true,
        trim: true
    },
    // 平台值
    station: {
        type: String,
        reuqired: true,
        trim: true
    },
    // 歌曲标题
    songname: {
        type: String,
        reuqired: true
    },
    // 歌手列表
    singers: [],
    // 专辑标题
    albumname: {
        type: String,
        reuqired: true,
        trim: true
    },
    // 专辑封面地址
    albumpic: {
        type: String,
        reuqired: true,
        trim: true
    },
    // 创建日期
    createDate: {
        type: Date,
        default: Date.now()
    }
}
// eslint-disable-next-line new-cap
const schema = mongoose.Schema(collection, option)
const model = mongoose.model('song', schema)

module.exports = {
    Schema: schema,
    Model: model
}
