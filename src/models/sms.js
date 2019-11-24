import { smsFetch ,activeSms,setSmsFetch,setSmsConfig} from '../services/api';
import { sendSms } from '../services/user';


export default {
  namespace: 'sms',

  state: {
    data: {
      list: [],
      pagination: {},
      invitation_message_template:[]
    }
  },

  effects: {
    *send({ payload, callback }, { call }) {
      const response = yield call(sendSms, payload);
      if (callback) callback(response);
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(smsFetch, payload);
      if (response === undefined) return;
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *active({ payload, callback }, { call, put }) {
      const response = yield call(activeSms, payload);
      if (response === undefined) return;
      yield put({
        type: 'operateList',
        payload,
      });
      if (callback) callback();
    },
    *setFetch({ payload}, { call,put }) {
      const response = yield call(setSmsFetch, payload);
      if (response === undefined) return;
      yield put({
        type: 'set',
        payload: response,
      });
    },
    *config({ payload ,callback}, { call,put }) {
      const response = yield call(setSmsConfig, payload);
      if (response === undefined) return;
      yield put({
        type: 'set',
        payload: response,
      });
      if (callback) callback();
    }
  },

  reducers: {
    save(state, action) {
      return {
        data: {
          ...state.data,
          ...action.payload
        },
      };
    },
    set(state, action) {
      return {
        data: {
          ...state.data,
          ...action.payload
        },
      };
    },
    operateList(state, action) {
      const list = state.data.list;
      const ids = action.payload.user_id;
      ids.map(value => {
        list.map(item => {
          if (item.id == value) {
            item.is_send = action.payload.field_value;
          }
        });
      });

      return {
        data: {
          ...state.data,
          list,
          pagination: {
            ...state.data.pagination,
          },
        },
      };
    },
  },
};
