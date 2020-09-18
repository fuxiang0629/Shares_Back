import request from '@/utils/request';


/**
 * 获取股票热门搜索列表
 * @param {*} params 
 */
export async function queryStockHotList(params) {
  const { current, pageSize } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize
  }
  return request('/api/tradecenter/shares/hot/search', {
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


