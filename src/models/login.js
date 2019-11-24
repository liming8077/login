import { routerRedux } from 'dva/router'
import { stringify } from 'qs'
import {
  fakeAccountLogin,
  selectAccountLogin,
  fakeAccountLogout,
  wxAccountLogin,
  ddAccountLogin,
  personalizeLogin,
} from '../services/api'
import { queryCurrent } from '../services/user'
import { setAuthority } from '../utils/authority'
import { reloadAuthorized } from '../utils/Authorized'

export default {
  namespace: 'login',

  state: {
    status: undefined,
    data: undefined,
    qrcode: null,
  },

  effects: {
    *login({ payload, callback }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload)
      if (response == undefined) return
      yield put({
        type: 'changeLoginStatus',
        payload: { ...response, ...payload.day },
      })
      // Login successfully
      if (response.status === 1) {
        reloadAuthorized()
        const data = yield call(queryCurrent)
        if (data === undefined) return

        if (data.index_path == '/student/') {
          location.href = data.index_path
        } else {
          yield put(routerRedux.push(data.index_path))
        }

      } else {
        callback(response)
      }
    },
    *selectLogin({ payload }, { call, put }) {
      const response = yield call(selectAccountLogin, payload)
      if (response == undefined) return
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      })
      if (response.status === 1) {
        reloadAuthorized()
        const data = yield call(queryCurrent)
        if (data === undefined) return
        if (data.index_path == '/student/') {
          location.href = data.index_path
        } else {
          yield put(routerRedux.push(data.index_path))
        }
      }
    },
    *qrcodeLoginEnter({ payload }, { call, put }) {
      console.log(payload)
      yield put({
        type: 'changeLoginStatus',
        payload,
      })
      if (payload.status == 1) {
        console.log(payload)
        reloadAuthorized()
        const data = yield call(queryCurrent)
        if (data === undefined) return
        if (data.index_path == '/student/') {
          location.href = data.index_path
        } else {
          yield put(routerRedux.push(data.index_path))
        }
      }
    },
    *veCodeLogin({ payload }, { call, put }) {
      yield put({
        type: 'changeLoginStatus',
        payload,
      })
      if (payload.status == 1) {
        reloadAuthorized()
        const data = yield call(queryCurrent)
        if (data === undefined) return
        payload.id = data.id
        yield put({
          type: 'changeLoginStatus',
          payload,
        })
        if (data.index_path == '/student/') {
          location.href = payload.redirect || data.index_path
        } else {
          yield put(routerRedux.push(payload.redirect || data.index_path))
        }
      }
    },
    *logout({ payload }, { put, select, call }) {
      if (payload) {
        const response = yield call(fakeAccountLogout, payload)
        if (response == undefined) return
      }
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          // currentAuthority: 'guest',
          user_type: 0,
        },
      })
      reloadAuthorized()
      if (window.location.origin === 'https://lms3.9first.com') {
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        )
      }else{
        window.location.href = '/'
      }
    },
    *fetchQrcode({ payload, callback }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload)
      if (response == undefined) return
      yield put({
        type: 'save',
        payload: response,
      })
      if (callback) callback(response)
    },
    *qrCodeLogin({ payload, callback }, { call }) {
      const response = yield call(fakeAccountLogin, payload)
      // if (response == undefined) return
      if (callback) callback(response)
    },
    *wxCodeLogin({ payload, callback }, { call, put }) {
      const response = yield call(wxAccountLogin, payload)
      if (response == undefined) return
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      })
      if (response.status === 1) {
        reloadAuthorized()
        const data = yield call(queryCurrent)
        if (data === undefined) return
        // 个性化域名需要跳转url
        // if (response.domain) {
        //   window.location.href = `${response.domain}${data.index_path}`
        // } else {
        if (data.index_path == '/student/') {
          location.href = data.index_path
        } else {
          yield put(routerRedux.push(data.index_path))
        }
        // }
      } else {
        callback(response)
      }
    },
    *dingtalkCodeLogin({ payload, callback }, { call, put }) {
      const response = yield call(ddAccountLogin, payload)
      if (response == undefined) return
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      })
      if (response.status === 1) {
        reloadAuthorized()
        const data = yield call(queryCurrent)
        if (data === undefined) return
        if (data.index_path == '/student/') {
          location.href = data.index_path
        } else {
          yield put(routerRedux.push(data.index_path))
        }
      } else {
        callback(response)
      }
    },

    *initPageLogin({ payload, callback }, { call }) {
      const response = yield call(personalizeLogin, payload)
      if (response == undefined) return
      if (callback) callback(response)
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload)
      return {
        ...state,
        status: typeof payload.user_type === 'number',
        type: payload.type,
      }
    },
    save(state, { payload }) {
      return {
        ...state,
        qrcode: payload,
      }
    },
  },
}
