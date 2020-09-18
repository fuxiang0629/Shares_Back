import request from '@/utils/request';


/**
 * 查询交易规则额外平仓线列表
 * @param {*} params 
 */
export async function queryDealRuleLiquidationList(params) {

  console.log("查询交易规则额外平仓线列表")
  const { current, pageSize, Id} = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    Id
  }
  return request('/api/tradecenter/shares/traderules/other/list', {
    method: 'POST',
    data: payload,
  });
}



/**
 * 添加交易规则额外平仓线
 * @param {*} params 
 */
export async function addDealRuleLiquidation(params) {
  return request('/api/tradecenter/shares/traderules/other/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 编辑交易规则额外平仓线
 * @param {*} params 
 */
export async function updateDealRuleLiquidation(params) {
  return request('/api/tradecenter/shares/traderules/other/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 编辑交易规则额外平仓线状态
 * @param {*} params 
 */
export async function updateDealRuleLiquidationStatus(params) {
  return request('/api/tradecenter/shares/traderules/other/status/modify', {
    method: 'POST',
    data: params,
  });
}

/**
 * 删除交易规则额外平仓线
 * @param {*} params 
 */
export async function removeDealRuleLiquidation(params) {
  return request('/api/tradecenter/shares/traderules/other/delete', {
    method: 'POST',
    data: params,
  });
}


