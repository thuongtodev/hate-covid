import { history } from 'umi';
import { message } from 'antd';
import { postLogin } from './service';
import { getPageQuery, setAuthority } from './utils/utils';

const Model = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(postLogin, payload);

      const { status, data } = response.data;
      if (!status.error) {
        yield put({
          type: 'changeLoginStatus',
          payload: { ...response, currentAuthority: 'admin' },
        }); // Login successfully
        message.success('Login success');
        localStorage.setItem('accessToken', data.accessToken);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }

        history.replace(redirect || '/');
      } else {
        message.error('Login fail');
        yield put({
          type: 'changeLoginStatus',
          payload: { ...response, currentAuthority: '' },
        }); // Login successfully
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status };
    },
  },
};
export default Model;
