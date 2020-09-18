import request from '@/utils/request';

/**
 * 查询券商交易服务器
 * @param {*} params 
 */
export async function queryBrokerServerList(params) {

  console.log("查询券商交易服务器")
  console.log(params)

  const { current, pageSize, BrokerCode, Ip } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    Ip,
    BrokerCode
  }
  return request('/api/sys/broker/tradehost/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加券商交易服务器
 * @param {*} params 
 */
export async function addBrokerServer(params) {


  console.log("添加券商交易服务器")

  console.log(params)


  return request('/api/sys/broker/tradehost/add', {
    method: 'POST',
    data: params,
  });
}



/**
 * 删除券商交易服务器
 * @param {*} params 
 */
export async function removeBrokerServer(params) {
  return request('/api/sys/broker/tradehost/delete', {
    method: 'POST',
    data: params
  });
}



/**
 * 编辑券商交易服务器
 * @param {*} params 
 */
export async function updateBrokerServer(params) {
  return request('/api/sys/broker/tradehost/modify', {
    method: 'POST',
    data: params
  });
}



/**
 * 修改券商交易服务器状态
 * @param {*} params 
 */
export async function updateBrokerServerStatus(params) {
  return request('/api/sys/broker/tradehost/status/modify', {
    method: 'POST',
    data: params
  });
}

