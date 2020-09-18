import request from '@/utils/request';

/**
 * 查询券商账户列表
 * @param {*} params 
 */
export async function queryBrokerAccountList(params) {
  const { current, pageSize, AccountNo,ServerId } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    ServerId,
    AccountNo
  }
  return request('/api/sys/broker/account/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加券商账户
 * @param {*} params 
 */
export async function addBrokerAccount(params) {
  return request('/api/sys/broker/account/add', {
    method: 'POST',
    data: params,
  });
}



/**
 * 删除券商账户
 * @param {*} params 
 */
export async function removeBrokerAccount(params) {
  return request('/api/sys/broker/account/delete', {
    method: 'POST',
    data: params
  });
}



/**
 * 编辑券商账户
 * @param {*} params 
 */
export async function updateBrokerAccount(params) {
  return request('/api/sys/broker/account/modify', {
    method: 'POST',
    data: params
  });
}



/**
 * 更新券商账户状态
 * @param {*} params 
 */
export async function updateBrokerAccountStatus(params) {
  return request('/api/sys/broker/account/status/modify', {
    method: 'POST',
    data: params
  });
}




