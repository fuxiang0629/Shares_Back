import request from '@/utils/request';


/**
 * 查询平仓规则列表
 * @param {*} params 
 */
export async function queryTraderulesList(params) {
  const { current, pageSize } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize
  }
  return request('/api/tradecenter/shares/traderules/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加平仓规则
 * @param {*} params 
 */
export async function addTraderules(params) {
  return request('/api/tradecenter/shares/traderules/add', {
    method: 'POST',
    data: params,
  });
}

/**
 * 编辑平仓规则
 * @param {*} params 
 */
export async function modifyTraderules(params) {
  return request('/api/tradecenter/shares/traderules/modify', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改平仓规则状态
 * @param {*} params 
 */
export async function modifyTraderulesStatus(params) {
  return request('/api/tradecenter/shares/traderules/status/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除平仓规则
 * @param {*} params 
 */
export async function deleteTraderules(params) {
  return request('/api/tradecenter/shares/traderules/delete', {
    method: 'POST',
    data: params,
  });
}

/**
 * 查询仓位规则列表
 * @param {*} params 
 */
export async function queryPositionRulesList(params) {
  const { current, pageSize } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize
  }
  return request('/api/tradecenter/shares/positionrules/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加仓位规则
 * @param {*} params 
 */
export async function addPositionRules(params) {
  return request('/api/tradecenter/shares/positionrules/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 编辑仓位规则
 * @param {*} params 
 */
export async function modifyPositionRules(params) {
  return request('/api/tradecenter/shares/positionrules/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改仓位规则状态
 * @param {*} params 
 */
export async function modifyPositionRulesStatus(params) {
  return request('/api/tradecenter/shares/positionrules/status/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除仓位规则
 * @param {*} params 
 */
export async function deletePositionRules(params) {
  return request('/api/tradecenter/shares/positionrules/delete', {
    method: 'POST',
    data: params,
  });
}

/**
 * 查询风控规则列表
 * @param {*} params 
 */
export async function queryRiskRulesList(params) {
  const { current, pageSize } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize
  }
  return request('/api/tradecenter/shares/riskrules/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 编辑风控规则
 * @param {*} params 
 */
export async function modifyRiskRules(params) {
  return request('/api/tradecenter/shares/riskrules/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改风控规则禁止状态
 * @param {*} params 
 */
export async function modifyRiskRulesForbidStatus(params) {
  return request('/api/tradecenter/shares/riskrules/forbidstatus/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改风控规则状态
 * @param {*} params 
 */
export async function modifyRiskRulesStatus(params) {
  return request('/api/tradecenter/shares/riskrules/status/modify', {
    method: 'POST',
    data: params,
  });
}











