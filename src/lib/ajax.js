/** ajax 基于axios */
import axios from 'axios'

axios.defaults.baseURL = ''

// 请求发送之前的拦截器
axios.interceptors.request.use(config => {
    // ========
    return config
}, error => {
    return Promise.reject(error)
})

// 请求响应拦截器
axios.interceptors.response.use(res => {
    return Promise.resolve(res)
}, error => {
    // console.log('ajax error', error)
    return Promise.reject(error)
})

export default function (options) {
    return new Promise((resolve, reject) => {
        axios.request(options).then(res => {
            resolve(res.data)
        }, error => {
            reject(error)
        })
    })
}
