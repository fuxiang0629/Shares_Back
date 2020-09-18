import request from '@/utils/request';



/**
 * 查询支付账户列表
 * @param {*} params 
 */
export async function queryPaymentAccountList(params) {

  console.log(params)
  const { current, pageSize, ChannelCode, BusinessCode, Type } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    ChannelCode,
    BusinessCode,
    Type
  }
  return request('/api/sys/payment/account/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加支付账户
 * @param {*} params 
 */
export async function addPaymentAccount(params) {
  return request('/api/sys/payment/account/add', {
    method: 'POST',
    data: params
  });
}

/**
 * 编辑支付账户
 * @param {*} params 
 */
export async function updatePaymentAccount(params) {
  return request('/api/sys/payment/account/modify', {
    method: 'POST',
    data: params
  });
}


/**
 * 修改支付账户状态
 * @param {*} params 
 */
export async function updatePaymentAccountStatus(params) {
  return request('/api/sys/payment/account/status/modify', {
    method: 'POST',
    data: params
  });
}


/**
 * 删除支付账户
 * @param {*} params 
 */
export async function removePaymentAccount(params) {
  return request('/api/sys/payment/account/delete', {
    method: 'POST',
    data: params
  });
}

