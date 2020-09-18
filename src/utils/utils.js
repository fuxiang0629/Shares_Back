import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};




/**
 * 设置缓存
 * @param {*} key 
 * @param {*} value 
 */
export const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}


/**
 * 获取缓存
 * @param {*} key 
 */
export const getStorage = (key) => {
  let item = localStorage.getItem(key)
  return JSON.parse(item)
}


/**
 * 清除缓存
 */
export const clearStorage = () => {
  localStorage.clear()
}


/**
 * 检查用户是否有权限
 * @param {*} code 
 */
export const checkAuthority = (code) => {
  const isAdmin = getStorage('IsAdministrator')
  const rightCodeList = getStorage('RightCodeList')
  if (isAdmin) {
    return true;
  } else {
    if (rightCodeList.indexOf(code) === -1) {
      return false
    }
    else {
      return true
    }
  }
}



export const store = {
  save: (name, value, type = 'localtorage') => {
    if ((type || '').toLocaleLowerCase() === 'localstorage') {
      localStorage.setItem(name, JSON.stringify(value));
    } else if ((type || '').toLocaleLowerCase() === 'sessionstorage') {
      sessionStorage.setItem(name, JSON.stringify(value));
    }
  },
  get: (name, type = 'localStorage') => {
    if ((type || '').toLocaleLowerCase() === 'localstorage') {
      return JSON.parse(localStorage.getItem(name) || '{}');
    } else if ((type || '').toLocaleLowerCase() === 'sessionstorage') {
      return JSON.parse(sessionStorage.getItem(name) || '{}');
    }
  },
};


/**
 * 新的-新开窗口方法
 */
export const openPage = (options = {}) => {
  const {
    id = Math.random()
      .toString(32)
      .slice(2),
    url,
    title = '新标签页',
    data = {},
  } = options;
  if (!url) {
    return;
  }
  console.log(`新开标签页 id=${id} title=${title} url=${url} data=${JSON.stringify(data)} `);
  store.save(id, { url, title, data }, 'sessionstorage');
  const path = `/CustomPage/${id}`;
  router.push(path);
};

