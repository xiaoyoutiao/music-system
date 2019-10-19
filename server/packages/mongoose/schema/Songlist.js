const mongoose = require('mongoose')

const option = {
    toJSON: { getters: false, virtuals: true },
    id: false
}
// 需要返回给前台的系统支持的搜索平台
const collection = {
    // 标题
    title: {
        type: String,
        reuqired: true,
        trim: true
    },
    // 封面
    cover: {
        type: String,
        default: ''
    },
    // 歌曲列表
    songs: [],
    // 歌单描述
    description: {
        type: String,
        default: '',
        trim: true
    },
    // 是否分享该歌单
    isShare: {
        type: Boolean,
        default: false
    },
    // 创建日期
    createDate: {
        type: Date,
        default: Date.now()
    }
}
// eslint-disable-next-line new-cap
const schema = mongoose.Schema(collection, option)
const model = mongoose.model('songlist', schema)

// 歌曲数量
schema.virtual('songsCount').get(function () {
    return this.songs.length
})

module.exports = {
    Schema: schema,
    Model: model
}
