const mongoose = require('mongoose')
const COLLECTION_SYSTEM = 'platform'

const option = {
    collection: COLLECTION_SYSTEM,
    // toObject: { getters: true },
    toJSON: { getters: false, virtuals: true },
    id: false
}
// 需要返回给前台的系统支持的搜索平台
const collection = {
    // 平台名
    name: {
        type: String,
        required: true
    },
    // 平台值
    value: {
        type: String,
        required: true
    },
    // 系统是否支持该平台
    isSupport: {
        type: Boolean,
        default: function () { return false }
    },
    isDefault: {
        type: Boolean,
        default: function () { return false }
    }
}
// eslint-disable-next-line new-cap
const schema = mongoose.Schema(collection, option)
const model = mongoose.model(COLLECTION_SYSTEM, schema)

schema.virtual('isSupportDesc').get(function () {
    return this.isSupport ? '支持' : '不支持'
})

schema.methods.$_save = function (instance) {
    return new Promise((resolve, reject) => {
        instance.save((_err, _res) => {
            if (_err) return reject(_err)
            else resolve(_res)
        })
    })
}

module.exports = {
    schema,
    model
}
