import request from '@/utils/request';

/**
 * 账户登录
 * @param {*} params 
 */
export async function AccountLogin(params) {
  return request('/api/admin/login', {
    method: 'POST',
    data: params,
  });
}


/**
 * 退出登录
 */
export async function AccountLogout() {
  return request('/api/admin/logout', {
    method: 'POST'
  });
}

