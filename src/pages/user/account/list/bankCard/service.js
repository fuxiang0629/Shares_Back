
import request from '@/utils/request';

/**
 * 查询前端账户银行卡列表
 * @param {*} params 
 */
export async function queryAccountBankCardList(params) {
  const { current, pageSize, AccountId, CardNumber } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    AccountId,
    CardNumber,
  }
  return request('/api/frontaccount/bankcard/list', {
    method: 'POST',
    data: payload,
  });
}
