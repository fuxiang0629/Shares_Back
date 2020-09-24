import request from '@/utils/request';

/**
 * 查询交易杠杆列表
 * @param {*} params 
 */
export async function queryTradeLeverList(params) {
  const { current, pageSize } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
  }
  return request('/api/tradecenter/shares/tradelever/list', {
    method: 'POST',
    data: payload,
  });
}

/**
 * 添加交易杠杆
 * @param {*} params 
 */
export async function addTradeLever(params) {
  return request('/api/tradecenter/shares/tradelever/add', {
    method: 'POST',
    data: params,
  });
}

/**
 * 编辑交易杠杆
 * @param {*} params 
 */
export async function modifyTradeLever(params) {
  return request('/api/tradecenter/shares/tradelever/modify', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除交易杠杆
 * @param {*} params 
 */
export async function deleteTradeLever(params) {
  return request('/api/tradecenter/shares/tradelever/delete', {
    method: 'POST',
    data: params,
  });
}

/**
 * 查询交易时间分组列表
 * @param {*} params 
 */
export async function queryDealDateGroupList(params) {
  const { current, pageSize } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
  }
  return request('/api/tradecenter/shares/tradetime/group/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加交易时间分组
 * @param {*} params 
 */
export async function addDealDateGroup(params) {
  return request('/api/tradecenter/shares/tradetime/group/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 编辑交易时间分组
 * @param {*} params 
 */
export async function updateDealDateGroup(params) {
  return request('/api/tradecenter/shares/tradetime/group/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除交易时间分组
 * @param {*} params 
 */
export async function removeDealDateGroup(params) {
  return request('/api/tradecenter/shares/tradetime/group/delete', {
    method: 'POST',
    data: params,
  });
}


/**
 * 更新交易时间
 * @param {*} params 
 */
export async function updateDealTimeGroup(params) {
  return request('/api/tradecenter/shares/tradetime/modify', {
    method: 'POST',
    data: params,
  });
}








