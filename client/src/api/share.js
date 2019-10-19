import http from 'IndexConfig/http'

// 获取推荐歌曲
export function getShareSongs () {
    return http.get('/music/share/songs')
}

// 获取推荐歌单
export function getShareSonglist () {
    return http.get('/music/share/songlist')
}
