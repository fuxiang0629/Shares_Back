import request from '@/utils/request';


/**
 * 查询打款渠道列表
 * @param {*} params 
 */
export async function queryPaymentChannelList(params) {

  console.log(params)
  const { current, pageSize, ChannelCode, Status } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    ChannelCode,
    Status
  }
  return request('/api/sys/paymentcash/channel/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 修改修改打款渠道状态
 * @param {*} params 
 */
export async function updatePaymentChannelStatus(params) {
  return request('/api/sys/paymentcash/channel/status/modify', {
    method: 'POST',
    data: params
  });
}




/**
 * 绑定打款渠道退款账户
 * @param {*} params 
 */
export async function updatePaymentChannelRefundAccount(params) {
  return request('/api/sys/paymentcash/channel/refund/account/bind', {
    method: 'POST',
    data: params
  });
}


/**
 * 绑定打款渠道转账账户
 * @param {*} params 
 */
export async function updatePaymentChannelTransferAccount(params) {
  return request('/api/sys/paymentcash/channel/transfer/account/bind', {
    method: 'POST',
    data: params
  });
}



