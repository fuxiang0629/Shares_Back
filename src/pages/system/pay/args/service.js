import request from '@/utils/request';




/**
 * 获取支付参数
 * @param {*} params 
 */
export async function queryPaymentArgsList(params) {

  console.log("获取支付参数")
  console.log(params)

  const { BusinessCode, queryParams } = params
  const payload = {
    BusinessCode,
    PaymentAccountId: queryParams.id,
    RightCode: "GetSysPaymentParList_18"
  }
  return request('/api/sys/payment/par/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 修改支付参数
 * @param {*} params 
 */
export async function updatePaymentArgs(params) {
  return request('/api/sys/payment/par/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifySysPaymentPar_18" },
  });
}
