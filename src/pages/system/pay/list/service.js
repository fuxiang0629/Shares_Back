import request from '@/utils/request';



/**
 * 查询支付渠道列表
 * @param {*} params 
 */
export async function queryPaymentChannelList(params) {

  console.log(params)
  const { current, pageSize, ChannelCode, Status } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    ChannelCode,
    Status,
    RightCode: "GetSysPaymentChannelList_18"
  }
  return request('/api/sys/payment/channel/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 更新支付渠道状态
 * @param {*} params 
 */
export async function updatePaymentChannelStatus(params) {
  return request('/api/sys/payment/channel/status/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifySysPaymentChannelStatus_18" }
  });
}


/**
 * 绑定支付渠道账户
 * @param {*} params 
 */
export async function updatePaymentChannelAccount(params) {
  return request('/api/sys/payment/channel/account/bind', {
    method: 'POST',
    data: params
  });
}

/**
 * 编辑支付渠道排序值
 * @param {*} params 
 */
export async function updatePaymentChannelOrderIndex(params) {
  return request('/api/sys/payment/channel/orderindex/modify', {
    method: 'POST',
    data: params
  });
}






