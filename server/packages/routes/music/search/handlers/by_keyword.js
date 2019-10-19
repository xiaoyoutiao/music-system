const stationAndHandler = require("./stationAndHandlers")

module.exports = (req, res, next) => {
    let station = req.query.s.trim()
    let keyword = req.query.w.trim()
    let page = req.query.page || 1
    /**请求参数无效 */
    if (!station || !keyword) {
        res
            .status(500)
            .json({
                status: "error",
                errMess: "argument invalid"
            })
            .end()
    }
    let hasStation = stationAndHandler.hasStation({
        type: "song",
        station
    })
    /**平台不存在 */
    if (!hasStation) {
        res.json({
            status: "error",
            errMess: "Station Don't Exist"
        })
    } else {
        let handler = stationAndHandler.getHandler({ type: "song", station })
        /**对应处理不存在 */
        if (!handler) {
            res
                .status(500)
                .json({ status: "error", errMess: "station handler invalid" })
                .end()
        } else {
            /**相应处理 */
            handler({
                keyword,
                page
            })
                .then(songs => {
                    if (songs instanceof Array && songs.length) {
                        // let mySongs = songs.map((song) => {
                        //     return new Music({
                        //         name: song.name,
                        //         id: song.id,
                        //         alia: song.alia,
                        //         album: song.al,
                        //         artist: song.ar,
                        //         isFree: song.fee,
                        //         pop: song.pop
                        //     }).getJSON()
                        // })
                        res.json(songs)
                    } else {
                        res.end("search fail")
                    }
                })
                .catch(error => {
                    return next(error, req, res, next)
                })
        }
    }
}
