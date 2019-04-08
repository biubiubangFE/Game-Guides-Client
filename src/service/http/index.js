/**
 * Created by j_bleach on 2018/12/19.
 */
import Taro from "@tarojs/taro"

export const baseUrl = "https://api.mhdss.com/game-guides-service";
/**
* @author j_bleach 2019/3/21
* @describe 拦截器
* @param chain: object
*/
const interceptor = function (chain) {
  const requestParams = chain.requestParams
  const {method, data, url} = requestParams
  console.log(`http ${method || "GET"} --> ${url} data: `, data)
  return chain.proceed(requestParams)
    .then(res => {
      console.log(`http <-- ${url} result:`, res)
      return res
    })
}

Taro.addInterceptor(interceptor)

const http = function (params = {}) {
  const {url, method = "GET", data, header = {}, success, fail} = params
  Taro.request({
    url: `${baseUrl}${url}`,
    data,
    method,
    header: {
      "content-type": "application/json",
      ...header
    },
    success,
    fail,
    complete
  })
    .then(res => success(res.data))
    .catch(err => fail(err))
    // .finally(complete)
}





const http = function (params = {}) {
  const {url, method = 'GET', data, header = {}, success, fail, complete} = params
  // 登陆不带sessionKey
  let sessionKey = wx.getStorageSync('sessionKey')
  if (url !== '/wx/login') {
    // 检查 session_key 是否过期
    header.sessionKey = sessionKey
    wx.checkSession({
      // session_key 有效(未过期)
      success: function () {
        // 业务逻辑处理
        wx.request({
          url: baseUrl + url, // 仅为示例，并非真实的接口地址
          data: data,
          method: method,
          header: {
            'content-type': 'application/json', // 默认值
            ...header
          },
          success(res) {
            // 检查错误码
            // 3: 没有登陆
            if (res.data.errcode === 3) {
              login(params)
              return
            }
            success && success(res.data.data)
          },
          fail(err) {
            throw err
          },
          complete (res) {
            complete && complete(res)
          }
        })
      },
      // session_key 过期
      fail: function () {
        // session_key过期，重新登录
        login(params)
      }
    })
  } else {
    // 无skey，作为首次登录
    login(params)
  }
}


export default http
