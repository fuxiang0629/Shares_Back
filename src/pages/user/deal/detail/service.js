
import request from '@/utils/request';

/**
 * 查询前端账户交易成交记录
 * @param {*} params 
 */
export async function queryAccountDealRecordList(params) {
  const { current, pageSize, Id } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    Id,
  }
  return request('/api/frontaccount/shares/trade/deal/record/list', {
    method: 'POST',
    data: payload,
  });
}

