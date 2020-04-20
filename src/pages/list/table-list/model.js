import { queryData, queryLink, deteleAccountLink } from './service';
import { message } from 'antd';

const Model = {
  namespace: 'ggdrive',
  state: {
    data: [],
    url: '',
  },
  effects: {
    *getData(_, { call, put }) {
      const response = yield call(queryData);
      const { data, status } = response.data;

      if (!status.error) {
        yield put({
          type: 'saveData',
          payload: { data },
        });
      }
      if (response.status === 401) {
        yield put({ type: 'login/logout' });
      }
    },
    *getLink(_, { call, put }) {
      const response = yield call(queryLink);
      const { data, status } = response.data;
      if (!status.error) {
        yield put({
          type: 'saveLink',
          payload: { ...data },
        });
      }
      if (response.status === 401) {
        yield put({ type: 'login/logout' });
      }
    },
    *deleteLink({ payload }, { call, put }) {
      const response = yield call(deteleAccountLink, payload);
      const { status } = response.data;
      if (!status.error) {
        yield put({ type: 'ggdrive/getData' });
        message.success('Delete Success!');
      } else {
        message.error('Delete Error');
      }
      if (response.status === 401) {
        yield put({ type: 'login/logout' });
      }
    },
  },
  reducers: {
    saveData(state, { payload }) {
      return { ...state, data: payload.data };
    },
    saveLink(state, { payload }) {
      return { ...state, url: payload.url };
    },
  },
};
export default Model;
