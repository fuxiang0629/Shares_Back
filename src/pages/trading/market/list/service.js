import request from '@/utils/request';


/**
 * 获取股票列表
 * @param {*} params 
 */
export async function queryStockList(params) {
  const { current, pageSize, SharesName } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    SharesCode:SharesName,
    ShowSharesQuotes: true
  }
  return request('/api/tradecenter/shares/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 修改股票状态
 * @param {*} params 
 */
export async function updateStockStatus(params) {
  return request('/api/tradecenter/shares/status/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改股票停牌状态
 * @param {*} params 
 */
export async function updateStockSuspensionStatus(params) {
  return request('/api/tradecenter/shares/suspensionstatus/modify', {
    method: 'POST',
    data: params,
  });
}





/**
 * 修改股票限制状态
 * @param {*} params 
 */
export async function updateStockForbidStatus(params) {
  return request('/api/tradecenter/shares/forbidstatus/modify', {
    method: 'POST',
    data: params,
  });
}




// tradecenter/shares/suspensionstatus/batch/modify