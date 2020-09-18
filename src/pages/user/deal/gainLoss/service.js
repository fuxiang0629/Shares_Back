
import request from '@/utils/request';

/**
 * 查询前端账户持仓统计
 * @param {*} params 
 */
export async function queryAccountHoldTotalList(params) {
  const { current, pageSize, AccountName } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    AccountInfo: AccountName,
  }
  return request('/api/frontaccount/shares/hold/statistics', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 查询前端账户持仓列表
 * @param {*} params 
 */
export async function queryAccountHoldList(params) {
  const { current, pageSize, Id } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    Id,
  }
  return request('/api/frontaccount/shares/hold/list', {
    method: 'POST',
    data: payload,
  });
}

