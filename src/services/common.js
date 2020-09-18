import request from '@/utils/request';

/**
 * 获取菜单列表
 * @param {*} params 
 */
export async function GetMenuList(params) {
  return request('/api/menu/list', {
    method: 'POST',
    data: params,
  });
}


