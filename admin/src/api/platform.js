import request from '@/utils/request'

// 获取平台列表
export function getPlatformList() {
  return request({
    url: '/admin/platform/list',
    method: 'get'
  })
}

// 更新平台列表
export function updatePlatform(data) {
  return request({
    url: '/admin/platform/update',
    method: 'post',
    data
  })
}
// 添加平台
export function addPlatform(data) {
  return request({
    url: '/admin/platform/add',
    method: 'post',
    data
  })
}
// 删除平台
export function removePlatform(data) {
  return request({
    url: '/admin/platform/delete',
    method: 'post',
    data
  })
}
