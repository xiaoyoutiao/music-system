// const request = require('request');
const axios = require('axios');
module.exports = {
  byKeyWord: searchByKeyword,
  getRadioUrl,
  getToken,
  getLyric: get_lyricByMid
}

/**===========================================================>
 * @function searchByKeyword - 根据关键字搜索歌曲列表
 * @param {string} keyword - 搜索关键字
 * @param {number} p - 页数
 * @param {number} n - 条目
 */
async function searchByKeyword ({
  keyword = '',
  page = 1,
  limit = 10,
  format = 'json'
}) {
  if (!keyword || typeof keyword !== 'string') {
    throw new Error('Keyword Invalid');
  }
  try {
    let axiosRes = await axios({
      url: url_encode(`http://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp`),
      method: 'GET',
      params: {
        w: keyword,
        p: page,
        n: limit,
        format
      },
      headers: {
        "referer": "https://y.qq.com",
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
      }
    });
    if (!axiosRes.data) {
      return [];
    }
    let songs = axiosRes.data.data.song.list;
    let list = songs.map(song => {
      return {
        station: 'qq',
        id: song.songmid,
        songname: song.songname,
        singers: song.singer.map(singer => {
          return singer.name
        }),
        albumname: song.albumname,
        albumpic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${ song.albummid }.jpg?max_age=2592000`
      };
    })
    return list;
  } catch (error) {
    throw error
  }
}

/**=========================================================== */
/**@function
 * @name getRadioUrl -获取qq音乐音频
 * @param {String} songmid - 音乐的songmid
 * @return {Object} - {url, type}
 */
async function getRadioUrl (songmid) {
  let items = await getToken(songmid);
  let item = items.find(i => {
    return i.vkey
  })
  let {
    vkey,
    filename
  } = item;
  let url = `http://ws.stream.qqmusic.qq.com/${ filename }?fromtag=0&guid=126548448&vkey=${ vkey }`
  return {
    url,
    type: 'm4a'
  }
}


/**===================================================================>
 * @function
 * @name qq音乐歌词搜索
 * @param {string} songmid - qq音乐歌曲id
 * @returns {Array} - lrc歌词数组
 */
async function get_lyricByMid (songmid) {
  if (!songmid) {
    throw new Error('songmid invalid - from -get_lyricByMid')
  }
  let axiosRes = await axios({
    method: 'GET',
    url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
    params: {
      pcachetime: 1546322492234,
      songmid: songmid,
      g_tk: 309402806,
      loginUin: '247316271',
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    },
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      'referer': 'https://y.qq.com/portal/player.html',
      'host': 'c.y.qq.com',
      'origin': 'https://y.qq.com'
    }
  });
  let data = axiosRes.data;
  if (!data || !data.lyric) {
    return [];
  }
  return {
    lyric: new Buffer(data.lyric, 'base64').toString()
  };
}
async function getToken (songmid) {
  try {
    let axiosRes = await axios({
      url: 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg',
      method: 'GET',
      params: {
        guid: 126548448,
        format: 'json205361747',
        platform: 'yqq',
        cid: '205361747',
        songmid,
        filename: `C400${ songmid }.m4a`
      }
    });
    return axiosRes.data.data.items;
  } catch (error) {
    throw error;
  }
}

function url_encode (url) {
  url = encodeURIComponent(url);
  url = url.replace(/\%3A/g, ":");
  url = url.replace(/\%2F/g, "/");
  url = url.replace(/\%3F/g, "?");
  url = url.replace(/\%3D/g, "=");
  url = url.replace(/\%26/g, "&");
  return url;
}
