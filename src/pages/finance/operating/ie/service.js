import request from '@/utils/request';


/**
 * 查询平台收支情况
 * @param {*} params 
 */
export async function queryFinanceList(params) {
  const { current, pageSize } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize
  }
  return request('/api/finance/platform/wallet', {
    method: 'POST',
    data: payload,
  });
}




/**
 * 获取今日行情股票实时数据 
 * @param {*} params 
 */
export async function queryStockRt(params) {
  return request('/api/tradecenter/today/shares/quotes', {
    method: 'POST',
    data: params,
  });
}


