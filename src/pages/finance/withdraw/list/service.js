import request from '@/utils/request';


/**
 * 查询提现记录
 * @param {*} params 
 */
export async function queryFinanceCasheRecord(params) {
  const { current, pageSize, OrderSn, AccountName, AccountMobile, Status, CashType, CreateTime } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    OrderSn,
    CashType,
    AccountInfo: AccountName || AccountMobile,
    Status,
    StartTime: CreateTime && CreateTime[0],
    EndTime: CreateTime && CreateTime[1]
  }
  return request('/api/finance/cash/record/list', {
    method: 'POST',
    data: payload,
  });
}

/**
 * 开始处理提现
 * @param {*} params 
 */
export async function updateFinanceCasheDispose(params) {
  return request('/api/finance/cash/starthandle', {
    method: 'POST',
    data: params,
  });
}


/**
 * 撤销处理提现
 * @param {*} params 
 */
export async function updateFinanceCasheRevocation(params) {
  return request('/api/finance/cash/cancelhandle', {
    method: 'POST',
    data: params,
  });
}


/**
 * 结束提现
 * @param {*} params 
 */
export async function updateFinanceCasheEnd(params) {
  return request('/api/finance/cash/finish', {
    method: 'POST',
    data: params,
  });
}


/**
 * 查看提现详情
 * @param {*} params 
 */
export async function queryFinanceCasheDetail(params) {
  return request('/api/finance/cash/record/details', {
    method: 'POST',
    data: params,
  });
}



/**
 * 开始提现
 * @param {*} params 
 */
export async function updateFinanceCasheStart(params) {
  return request('/api/finance/cash/start', {
    method: 'POST',
    data: params,
  });
}



/**
 * 查询提现账户列表
 * @param {*} params 
 */
export async function queryFinanceAccountList(params) {
  return request('/api/finance/cash/account/list', {
    method: 'POST',
    data: params,
  });
}







