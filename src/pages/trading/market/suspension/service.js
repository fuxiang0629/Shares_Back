import request from '@/utils/request';


/**
 * 获取停牌设置列表
 * @param {*} params 
 */
export async function getStockSuspensionList(params) {
  const { current, pageSize, SharesCode } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    SharesCode:SharesCode
  }
  return request('/api/tradecenter/suspension/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 修改停牌设置状态
 * @param {*} params 
 */
export async function updateStockSuspensionStatus(params) {
  return request('/api/tradecenter/suspension/status/modify', {
    method: 'POST',
    data: params,
  });
}