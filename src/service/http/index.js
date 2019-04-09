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

// Taro.addInterceptor(interceptor)

const http = function (params = {}) {
  const {url, method = "GET", data, header = {}, success, fail, complete} = params
  Taro.request({
    url,
    data,
    method,
    header: {
      "content-type": "application/x-www-form-urlencoded",
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

export default http
