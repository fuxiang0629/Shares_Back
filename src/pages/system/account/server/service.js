import request from '@/utils/request';

/**
 * 查找服务器
 * @param {*} params 
 */
export async function queryServerList(params) {
  const { current, pageSize, ServerId } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    ServerId,
  }
  return request('/api/sys/server/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加服务器
 * @param {*} params 
 */
export async function addServer(params) {
  return request('/api/sys/server/add', {
    method: 'POST',
    data: params,
  });
}



/**
 * 删除服务器
 * @param {*} params 
 */
export async function removeServer(params) {
  return request('/api/sys/server/delete', {
    method: 'POST',
    data: params
  });
}



/**
 * 更新服务器
 * @param {*} params 
 */
export async function updateServer(params) {
  return request('/api/sys/server/modify', {
    method: 'POST',
    data: params
  });
}
