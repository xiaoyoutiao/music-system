import request from '@/utils/request'

// 添加分享歌单
export function songlistAdd(data) {
  return request({
    url: '/admin/share/songlist/add',
    method: 'post',
    data
  })
}

// 获取分享歌单列表
export function songlistGetList() {
  return request({
    url: '/admin/share/songlist/list',
    method: 'get'
  })
}

// 删除分享歌单
export function songlistDelete(data) {
  return request({
    url: '/admin/share/songlist/delete',
    method: 'post',
    data
  })
}

// 编辑分享歌单
export function songlistEdit(data) {
  return request({
    url: '/admin/share/songlist/edit',
    method: 'post',
    data
  })
}

// 获取支持平台列表
export function getPlatformIsSupport(data) {
  return request({
    url: '/music/platform/list',
    method: 'get'
  })
}

// 获取搜索歌曲列表
export function searchSong(data) {
  return request({
    url: '/music/search/songs_list',
    method: 'get',
    params: data
  })
}

// 添加分享歌曲
export function searchSongAdd(data) {
  return request({
    url: '/admin/share/songs/add',
    method: 'post',
    data
  })
}

// 获取登录管理员分享歌曲
export function shareList() {
  return request({
    url: '/admin/share/songs/list',
    method: 'get'
  })
}

// 删除登录管理员分享歌曲
export function shareDelete(data) {
  return request({
    url: '/admin/share/songs/delete',
    method: 'post',
    data
  })
}

// 添加歌曲到歌单
export function shareSonglistAddSong(data) {
  return request({
    url: '/admin/share/songlist/addSong',
    method: 'post',
    data
  })
}

// 获取歌单歌曲
export function shareSonglistGetSongs(data) {
  return request({
    url: '/admin/share/songlist/getSongs',
    method: 'get',
    params: data
  })
}

// 移除分享歌单歌曲
export function shareSonglistRemoveSong(data) {
  return request({
    url: '/admin/share/songlist/removeSong',
    method: 'post',
    data: data
  })
}
