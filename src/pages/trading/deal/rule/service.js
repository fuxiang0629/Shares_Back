import request from '@/utils/request';


/**
 * 查询交易规则列表
 * @param {*} params 
 */
export async function queryDealRuleList(params) {
  const { current, pageSize, LimitKey, SharesType } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    SharesKey: LimitKey,
    SharesType
  }
  return request('/api/tradecenter/shares/traderules/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加交易规则列表
 * @param {*} params 
 */
export async function addDealRule(params) {
  return request('/api/tradecenter/shares/traderules/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除交易规则
 * @param {*} params 
 */
export async function removeDealRule(params) {
  return request('/api/tradecenter/shares/traderules/delete', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改交易规则状态
 * @param {*} params 
 */
export async function updateDealRuleStatus(params) {
  return request('/api/tradecenter/shares/traderules/status/modify', {
    method: 'POST',
    data: params,
  });
}



/**
 * 修改交易规则
 * @param {*} params 
 */
export async function updateDealRule(params) {
  return request('/api/tradecenter/shares/traderules/modify', {
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








