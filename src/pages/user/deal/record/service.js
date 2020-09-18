
import request from '@/utils/request';


/**
 * 查询前端账户交易记录
 * @param {*} params 
 */
export async function queryAccountDealRecordList(params) {
  console.log("查询交易排行")
  const { current, pageSize, AccountName, SharesCode, SharesName, AccountMobile, CreateTime } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    SharesInfo: SharesCode || SharesName,
    AccountInfo: AccountName || AccountMobile,
    StartTime: CreateTime && CreateTime[0],
    EndTime: CreateTime && CreateTime[1],

  }

  console.log(payload)

  return request('/api/frontaccount/shares/trade/record/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 前端账户交易撤单
 * @param {*} params 
 */
export async function updateAccountDealRevoke(params) {
  console.log("前端账户交易撤单")

  return request('/api/frontaccount/shares/trade/cancel', {
    method: 'POST',
    data: params,
  });
}





