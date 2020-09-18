import request from '@/utils/request';


/**
 * 获取今日行情股票列表
 * @param {*} params 
 */
export async function queryTodayMarketStockList(params) {
  const { current, pageSize, SharesName } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    SharesCode: SharesName
  }
  return request('/api/tradecenter/today/shares/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加今日行情股票 
 * @param {*} params 
 */
export async function addTodayMarketStock(params) {
  return request('/api/tradecenter/today/shares/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改今日行情股票状态
 * @param {*} params 
 */
export async function updateTodayMarketStockStatus(params) {
  return request('/api/tradecenter/today/shares/status/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除今日行情股票
 * @param {*} params 
 */
export async function removeTodayMarketStock(params) {
  return request('/api/tradecenter/today/shares/delete', {
    method: 'POST',
    data: params,
  });
}





