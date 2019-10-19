const axios = require('axios')
const encode_netease_data = require('../crypto/netease/decode/encode').encode_netease_data
// const request = require('request');
// const Console = require('../util/log4js/index').Console;
const urlHandler = require('../util/urlHandler/index')
// const Music = require('../class/Music');
module.exports = {
    byKeyWord: seachByKeyWord,
    getRadioUrl: getRadioUrlById,
    getLyric: getLyric
}

/**========================================================================================================>
 * @function
 * @name seachByKeyWord - 根据搜索关键字获取歌曲列表
 * @param {String } keyword 搜索关键字
 * @param {number } type 搜索类型 [1单曲, 10专辑, 100歌手, 1000, 歌单, 1002用户, 1004MV,1006歌词, 1009主播电台]
 * @param {number} offset 结果偏移量
 * @param {number} limit  结果条目
 * @return {Array} - 歌曲列表 (不包含歌曲url)
 */
function seachByKeyWord ({ keyword = '', type = 1, page = 1, limit = 10 }) {
    return new Promise((resolve, reject) => {
        if (!keyword) {
            return reject(new Error('搜索关键字为空'))
        }
        const offset = (page - 1) * limit
        let searchUrl = `http://music.163.com/api/cloudsearch/pc?s=${ keyword }&type=${ type }&offset=${ offset }&limit=${ limit }`
        axios({
            url: urlHandler.url_encode(searchUrl),
            method: 'GET',
            headers: {
                "Referer": "https://music.163.com",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36',
                'Origin': 'https://music.163.com'
            }
        })
            .then(response => {
                if (response.data.code === 200) {
                    /**返回歌曲列表 {Array} */
                    let songs = response.data.result.songs
                    let list = songs.map(song => {
                        return {
                            station: 'netease',
                            id: song.id,
                            songname: song.name,
                            singers: song.ar.map(singer => {
                                return singer.name
                            }),
                            albumname: song.al.name,
                            albumpic: song.al.picUrl
                        }
                    })
                    return resolve(list)
                } else {
                    return resolve([])
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**===========================================================================================>
 * @function seachResult - 获取音频播放url
 * @param {String } songId 歌曲ID
 */
async function getRadioUrlById (songId) {
    if (!songId) {
        return new Error('歌曲ID不为空')
    }
    try {
        let encodeParams = encode_netease_data({
            ids: `[${ songId }]`,
            br: 320000
        })
        let axiosRes = await axios({
            url: 'https://music.163.com/weapi/song/enhance/player/url',
            method: 'POST',
            data: {
                csrf_token: '',
                params: encodeParams.encText,
                encSecKey: encodeParams.encSecKey
            },
            transformRequest: [ urlHandler.stringifyUrlData ],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        let data = axiosRes.data.data
        if (!data) {
            return false
        }
        const radioObj = data.find(obj => obj.url)
        return {
            url: radioObj.url,
            type: radioObj.type
        }
    } catch (error) {
        throw error
    }
}

/**=============================================================================================>
/**获取歌词接口 */
async function getLyric (_id) {
    try {
        let requestUrl = `http://music.163.com/api/song/lyric?os=pc&id=${ _id }&lv=-1&kv=-1&tv=-1`
        let axiosRes = await axios({
            method: 'GET',
            url: requestUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        let lrc = axiosRes.data.lrc

        return {
            lyric: lrc ? lrc.lyric : []
        }
    } catch (error) {
        throw error
    }
}

// async function getMusic({
//   keyword,
//   type = 1,
//   offset = 0,
//   limit = 10
// }) {
//   if (typeof keyword !== 'string') {
//     throw new RangeError('Search KeyWord Must Be String');
//   }
//   if (!keyword) {
//     throw new RangeError('Search KeyWord Must Not Null');
//   }
//   let data = await seachByKeyWord({
//     keyword,
//     type,
//     offset,
//     limit
//   });
//   let firstSong = data.songs[0];
//   let s_id = firstSong.id;

//   let radioData = await getRadioUrl(s_id);
//   let lyric_data = await getLyric2(s_id);

//   let radioUrl = radioData.data;
//   let s_name = firstSong.name

//   return {
//     id: s_id,
//     name: s_name,
//     res: radioUrl,
//     lyric: lyric_data.lrc
//   }
// }
