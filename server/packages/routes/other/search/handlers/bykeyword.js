const netease = require('../../../../packages/api/netease');
const keyWordHandlers = require('./stationAndHandlers').keyWordHandlers;
const Music = require('../../../class/Music');

module.exports = (req, res, next) => {
    let station = req.query.s;
    let keyWord = req.query.w;
    /**请求参数无效 */
    if (!station || !keyWord) {
        res.status(500)
            .json({
                status: 'error',
                errMess: 'argument invalid'
            }).end();
    }
    station = station.trim();
    keyWord = keyWord.trim();
    let hasStation = keyWordHandlers.hasStation(station);
    /**平台不存在 */
    if (!hasStation) {
        res.json({
            status: 'error',
            errMess: 'Station Don\'t Exist'
        })

    } else {
        let handler = keyWordHandlers.getHandler(station);
        /**对应处理不存在 */
        if (!handler) {
            res.status(500)
                .json({
                    status: 'error',
                    errMess: 'station handler invalid'
                }).end();
        }
        /**相应处理 */
        else {
            handler(keyWord)
                .then((data) => {
                    let songs = data.songs;
                    if (songs instanceof Array && songs.length) {
                        let mySongs = songs.map((song) => {
                            return new Music({
                                name: song.name,
                                id: song.id,
                                alia: song.alia,
                                album: song.al,
                                artist: song.ar,
                                isFree: song.fee,
                                pop: song.pop
                            }).getJSON()
                        })
                        res.json(mySongs)
                    } else {
                        res.end('search fail');
                    }
                })
                .catch((error) => {
                    return next(error, req, res, next)
                })
        }
    }
}