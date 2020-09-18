import { UpdatePassWord } from '@/services/home';
import { GetMenuList } from '@/services/common';
import { setStorage } from '@/utils/utils';

const HomeModel = {
  namespace: 'home',
  state: {
    menuList: []
  },
  effects: {
    *getMenuList({ payload }, { call, put }) {
      const response = yield call(GetMenuList, payload);
      yield put({
        type: 'setMenuList',
        payload: response,
      });
    },

    *updatePassWord({ payload }, { call }) {
      const response = yield call(UpdatePassWord, payload)


      console.log("我执行到这了")
      console.log(response)

      

      if (!response.ErrorCode) {
        const { Data: { IsAdministrator, UserToken, RightCodeList } } = response
        setStorage('IsAdministrator', IsAdministrator)
        setStorage('UserToken', UserToken)
        setStorage('RightCodeList', RightCodeList)
      }
      return response
    }
  },
  reducers: {
    setMenuList(state, { payload }) {
      return { ...state, menuList: payload.Data }
    }
  },
};
export default HomeModel;
