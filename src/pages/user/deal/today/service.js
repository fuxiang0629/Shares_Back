
import request from '@/utils/request';

/**
 * 查询今日交易统计信息
 * @param {*} params 
 */
export async function queryTodayStatistics() {

  return request('/api/frontaccount/shares/trade/today/statistics',
    {
      method: 'POST',
    });
}



/**
 * 查询交易排行
 * @param {*} params 
 */
export async function queryDealRankList(params) {
  console.log("查询交易排行")
  const { current, pageSize, timeTypeIndex = 1, customTimeSearch, sorter } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    TimeType: timeTypeIndex,
    StartTime: customTimeSearch.length > 0 ? customTimeSearch[0] : null,
    EndTime: customTimeSearch.length > 0 ? customTimeSearch[1] : null,
    OrderType: sorter['TradeAmount'] ? 1 : sorter['BuyAmount'] ? 2 : sorter['SellAmount'] ? 3 : 1,
  }

  console.log(payload)



  return request('/api/frontaccount/shares/trade/rank/list', {
    method: 'POST',
    data: payload,
  });
}



