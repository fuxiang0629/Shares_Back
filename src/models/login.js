import { stringify } from 'querystring';
import { history } from 'umi';
import { AccountLogin, AccountLogout } from '@/services/login';
import { getPageQuery, setStorage, clearStorage } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);

      console.log(response)

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      if (!response.ErrorCode) {
        const { Data: { IsAdministrator, UserToken, RightCodeList } } = response

        setStorage('UserName', payload.UserName)
        setStorage('IsAdministrator', IsAdministrator)
        setStorage('UserToken', UserToken)
        setStorage('RightCodeList', RightCodeList)
        window.location.href = "/home"

        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params;
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);

        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);

        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = '/';
        //     return;
        //   }
        // }

        // history.replace(redirect || '/home')
      }
    },

    *logout({ payload }, { call }) {
      yield call(AccountLogout, payload);
      clearStorage()
      const { redirect } = getPageQuery();
      if (window.location.pathname !== '/account/login' && !redirect) {
        history.replace({
          pathname: '/account/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: !payload.ErrorCode ? 'success' : 'error' };
    },
  },
};
export default Model;
