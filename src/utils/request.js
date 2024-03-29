import fetch from 'dva/fetch'
import { notification, message } from 'antd'
import { routerRedux } from 'dva/router'
import { getAuth } from '../utils/authority'
import { API_URL, MOCK_URL } from '../config'
import store from '../index'

const returnJson = response => {
  if (response.status === 1) {
    return response.data
  } else {
    // notification.error({
    //   message: `请求错误 ${response.errCode}`,
    //   description: response.errMsg,
    // });
    message.error(response.errMsg)
  }
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}
function findMessage(nodeArr) {
  if (!nodeArr.length) return false
  for (let key in nodeArr) {
    if (nodeArr[key].children[1].innerText.indexOf('没有权限') > -1) {
      return true
    }
    return false
  }
}
function checkStatus(response) {
  if ((response.status >= 200 && response.status < 300) || response.status === 422) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  // notification.error({
  // message: `请求错误 ${response.status}: ${response.url}`,
  // description: errortext,
  // });
  if (
    response.status !== 401 ||
    !findMessage(document.getElementsByClassName('ant-message-error'))
  ) {
    message.error(errortext)
  }

  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const haveParams = url.indexOf('?')
  url += haveParams > -1 ? `&platform=pc` : `?platform=pc`
  url = options && options.mock ? MOCK_URL + url : API_URL + url
  const { token } = getAuth() || { token: '' }
  console.log('--->token', token) 
  const defaultOptions = {
    credentials: 'include',
    headers: {
      token,
    },
  }
  const newOptions = { ...defaultOptions, ...options }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      }
      newOptions.body = JSON.stringify(newOptions.body)
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      }
    }
  } else {
    const time = Date.parse(new Date())
    const haveParams = url.indexOf('?')
    url += haveParams > -1 ? `&timeStamp=${time}` : `?timeStamp=${time}`
  }
  const contentType = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/octet-stream',
  ]
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (contentType.includes(response.headers.get('content-type'))) {
        const filename = response.headers.get('content-disposition').match(/\"(.*)\"/g)
        const reg = new RegExp('"', 'g')
        newOptions.filename = filename.join().replace(reg, '')
        return response.blob()
      }
      if (response.status === 204) {
        return response.text()
      }
      return response.json()
    })
    .then(response => {
      if (response.type && contentType.includes(response.type)) {
        return returnJson({
          status: 1,
          data: {
            file: response,
            name: decodeURI(newOptions.filename),
          },
        })
      } else {
        return returnJson(response)
      }
    })
    .catch(e => {
      const { dispatch } = store
      const status = e.name
      if (status === 401) {
        dispatch({
          type: 'login/logout',
        })
        return
      }
      if (status === 403) {
        dispatch(routerRedux.push('/manager/exception/403'))
        return
      }
      if (status <= 504 && status >= 500) {
        dispatch(routerRedux.push('/manager/exception/500'))
        return
      }
      if (status >= 404 && status < 422) {
        dispatch(routerRedux.push('/manager/exception/404'))
      }
    })
}
