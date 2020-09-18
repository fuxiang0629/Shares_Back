import { queryNotices } from '@/services/user';
import { GetMenuList } from '@/services/common';



const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    menuList: [],
    openKeys: [],
    selectedKeys: []
  },
  effects: {
    *getMenuList({ payload }, { call, put }) {
      const response = yield call(GetMenuList, payload);
      yield put({
        type: 'setMenuList',
        payload: response,
      });

      return response
    },

    *setSelectedKeys({ payload }, { put }) {
      yield put({
        type: 'setSelectedKey',
        payload: payload,
      });
    },

    *setOpenKeys({ payload }, { put }) {
      yield put({
        type: 'setOpenKey',
        payload,
      });
    },

    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
    },

    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },

    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },
  reducers: {
    setMenuList(state, { payload }) {
      let openMenuList = [], firstPath;
      if (!payload.ErrorCode) {
        firstPath = payload.Data[0].routes[0].path;
        payload.Data.map((item) => {
          openMenuList.push(item.path);
        });
      }
      return { ...state, menuList: payload.Data, openKeys: openMenuList, selectedKeys: [firstPath] }
    },
    setSelectedKey(state, { payload }) {
      return { ...state, selectedKeys: [payload.path] }
    },
    setOpenKey(state, { payload }) {
      return { ...state, openKeys: payload }
    },

    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },

    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        ...state,
        collapsed: false,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default GlobalModel;
