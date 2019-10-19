const stationAndHandler = require("./stationAndHandlers")

module.exports = (req, res, next) => {
    global.$_methods.isRequiredQuery(req, res, [ 'keyword', 'station' ]).then(() => {
        const page = req.query.page || 1
        // 平台是否存在
        const isExistStation = stationAndHandler.hasStation({ type: "song", station: req.query.station })
        if (!isExistStation) return res.json({ code: 500, msg: `平台${ req.query.station }未实现支持` })
        // 对应处理
        const handler = stationAndHandler.getHandler({ type: "song", station: req.query.station })
        if (!handler) return res.json({ code: 500, msg: `平台${ req.query.station }未实现支持方法` })
        handler({ keyword: req.query.keyword, page })
            .then(songs => {
                if (songs instanceof Array && songs.length) return res.json({ code: 200, data: songs })
                res.json({ code: 500, msg: '搜索错误' })
            })
            .catch(error => {
                return next(error)
            })
    })

}
