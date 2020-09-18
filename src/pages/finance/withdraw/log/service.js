import request from '@/utils/request';


/**
 * 查询转账记录
 * @param {*} params 
 */
export async function queryTransferRecord(params) {
  const { current, pageSize, } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
  }
  return request('/api/finance/cash/transfer/record', {
    method: 'POST',
    data: payload,
  });
}

/**
 * 开始处理提现
 * @param {*} params 
 */
export async function queryTransferRecordDetail(params) {
  return request('/api/finance/cash/transfer/details', {
    method: 'POST',
    data: params,
  });
}


