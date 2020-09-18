import request from '@/utils/request';

/**
 * 查询券商
 * @param {*} params 
 */
export async function queryBrokerList(params) {
  const { current, pageSize, BrokerName } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    BrokerName,
  }
  return request('/api/sys/broker/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加券商
 * @param {*} params 
 */
export async function addBroker(params) {
  return request('/api/sys/broker/add', {
    method: 'POST',
    data: params,
  });
}



/**
 * 删除券商
 * @param {*} params 
 */
export async function removeBroker(params) {
  return request('/api/sys/broker/delete', {
    method: 'POST',
    data: params
  });
}



/**
 * 编辑券商
 * @param {*} params 
 */
export async function updateBroker(params) {
  return request('/api/sys/broker/modify', {
    method: 'POST',
    data: params
  });
}



/**
 * 修改券商状态
 * @param {*} params 
 */
export async function updateBrokerStatus(params) {
  return request('/api/sys/broker/status/modify', {
    method: 'POST',
    data: params
  });
}

