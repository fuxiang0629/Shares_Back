import request from '@/utils/request';

/**
 * 查询券商账户持仓信息
 * @param {*} params 
 */
export async function getBrokerAccountPositionInfo(params) {
  const { current, pageSize, queryParams } = params
  console.log(params)
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    TradeAccountCode: queryParams.AccountCode
  }
  return request('/api/sys/broker/account/position/info', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 同步券商账户持仓信息
 * @param {*} params 
 */
export async function updateBrokerAccountPosition(params) {
  return request('/api/sys/broker/account/position/update', {
    method: 'POST',
    data: params,
  });
}




