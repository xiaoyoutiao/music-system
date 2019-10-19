import Vue from 'vue'
import axios from 'axios'
import http from './apis'

const SERVER_CODE = {
  SUCCESS: 200,
  NOT_LOGIN: 403
}
const service = axios.create({
  // baseURL: rootURL, // api的base_url
  timeout: 15000 // 请求超时时间
})

service.$http = http

// request拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      config.headers['Content-Type'] = 'application/json'
      if (config.type === 'form') {
        config.headers['Content-Type'] = 'multipart/form-data'
      } else {
        // 序列化
        config.data = JSON.stringify(config.data)
      }
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code === SERVER_CODE.SUCCESS) { // 统一处理
      return Promise.resolve(res.data) // 直接返回数据
    } else if (res.code === SERVER_CODE.NOT_LOGIN) {
      localStorage.removeItem('tokenId')
    } else {
      Vue.prototype.$message({
        message: res.msg,
        type: 'error'
      }) // 错误统一报出
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
