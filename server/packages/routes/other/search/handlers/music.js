const netease = require('../../../api/netease.js');
const filter = {
    netease: neteaseHandler
}
module.exports = async function (req, res, next) {
    let station = req.query.s;
    let keyWord = req.query.w;
    if (!station) {
        if (!(station in filter)) {
            throw new Error({
                code: 101,
                message: 'Station Invalid Or Not Define'
            })
        }
        throw new Error({
            code: 102,
            message: 'Station Not Null'
        })
    }
    if (!keyWord) {
        throw Error('缺少搜索关键词')
    }
    try {
        let result = await filter[station](keyWord);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

async function neteaseHandler(keyWord) {
    if (!keyWord) {
        throw new Error({
            code: 201,
            message: 'Search KeyWord Not Null'
        });
    }
    let data = await netease.getMusic(keyWord);
    return data
}