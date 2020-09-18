import request from '@/utils/request';


/**
 * 修改用户密码
 * @param {*} params 
 */
export async function UpdatePassWord(params) {
  return request('/api/admin/password/modify', {
    method: 'POST',
    data: params,
  });
}

