import request from '@/utils/request';


/**
 * 查询充值记录
 * @param {*} params 
 */
export async function queryRechargeRecord(params) {
  const { current, pageSize, OrderSN, AccountName, AccountMobile, PayStatus, CreateTime } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    OrderSn: OrderSN,
    AccountInfo: AccountName || AccountMobile,
    Status: PayStatus,
    StartTime: CreateTime && CreateTime[0],
    EndTime: CreateTime && CreateTime[1]
  }
  return request('/api/finance/recharge/record/list', {
    method: 'POST',
    data: payload,
  });
}
