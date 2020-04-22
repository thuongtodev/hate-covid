import { queryFiles } from './service';

const Model = {
  namespace: 'file',
  state: {
    data: [],
    url: '',
  },
  effects: {
    *getData(_, { call, put }) {
      const response = yield call(queryFiles);
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
  },
  reducers: {
    saveData(state, { payload }) {
      return { ...state, data: payload.data };
    },
  },
};
export default Model;
