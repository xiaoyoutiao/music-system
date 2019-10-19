import http from 'IndexConfig/http'

// 获取支持的平台列表
export function getSupportStation () {
    return http.get('/music/platform/list')
}