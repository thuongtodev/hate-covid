import { queryData, queryLink } from './service';

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
