/**
 * 封装请求
 * @module service/request
 * @author keren
 */

import wepy from 'wepy'
import layer from './layer'

/**
 * @param {Object} options 请求携带的参数
 * @param {String} methods 方法名,必须是大写:POST/GET等
 * @param {String} url 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @param {String} baseURL 请求地址统一前缀 ***需要提前指定***  例如：http://api-test.com
 * @param {Object} header  请求头带token
 */
let baseURL = 'https://xxx.com'
export default (methods, url, options) => {
  typeof options !== 'object' && (options = {})
  let _options = {
    url: baseURL + url,
    method: methods,
    data: options
  }
  // 使用前需要判断是否过期，如果过期需要重新提醒用户退出或者重新请求登陆接口
  return new Promise((resolve, reject) => {
    wepy.request(_options).then(
      res => {
        if (res.statusCode === 200) {
          resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
        } else {
          layer.warning(`系统繁忙，请稍后重试(${res.statusCode})！`)
          reject(res)
        }
        console.log('baseURL + url:', baseURL, url, _options, 'res.data::::', res.data)
      },
      error => {
        layer.warning(`系统繁忙，请稍后重试(${error})！`)
        console.log('baseURL + url:', baseURL, url, 'error::::', error)
        reject(error)
      }
    )
  })
}
