
import request from '@/utils/request';

/**
 * 查询前端账户交易异常记录
 * @param {*} params 
 */
export async function queryAccountDealExList(params) {
  const { current, pageSize } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
  }
  return request('/api/frontaccount/shares/trade/abnormal/record/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 查询前端账户持仓列表
 * @param {*} params 
 */
export async function queryAccountDealExDetailList(params) {
  const { current, pageSize, Id } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    Id,
  }
  return request('/api/frontaccount/shares/trade/abnormal/record/details', {
    method: 'POST',
    data: payload,
  });
}



/**
 * 撤销交易异常记录 
 * @param {*} params 
 */
export async function updateTradeExRecordCancel(params) {
  return request('/api/frontaccount/shares/trade/abnormal/record/cancel', {
    method: 'POST',
    data: params,
  });
}


/**
 * 同步交易异常记录
 * @param {*} params 
 */
export async function updateTradeExRecordSync(params) {
  return request('/api/frontaccount/shares/trade/abnormal/record/query', {
    method: 'POST',
    data: params,
  });
}




