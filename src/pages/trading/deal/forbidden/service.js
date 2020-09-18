import request from '@/utils/request';


/**
 * 查询禁止股票名单列表
 * @param {*} params 
 */
export async function queryForbidStockList(params) {
  const { current, pageSize, LimitKey, LimitType, LimitMarket, ForbidType, CreateTime } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    LimitKey,
    LimitType,
    LimitMarket: LimitMarket == '-1' ? -1 : LimitMarket,
    ForbidType,
    StartTime: CreateTime && CreateTime[0],
    EndTime: CreateTime && CreateTime[1],
  }
  return request('/api/tradecenter/shares/forbid/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加禁止股票名单
 * @param {*} params 
 */
export async function addForbidStock(params) {
  return request('/api/tradecenter/shares/forbid/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 编辑禁止股票名单
 * @param {*} params 
 */
export async function updateForbidStock(params) {
  return request('/api/tradecenter/shares/forbid/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除禁止股票名单
 * @param {*} params 
 */
export async function removeForbidStock(params) {
  return request('/api/tradecenter/shares/forbid/delete', {
    method: 'POST',
    data: params,
  });
}


