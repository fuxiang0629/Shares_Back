
import request from '@/utils/request';

/**
 * 查询前端账户实名认证列表
 * @param {*} params 
 */
export async function queryAccountRealNameList(params) {
  const { current, pageSize, AccountName, AccountMobile, ExamineStatus, CreateTime } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    AccountInfo: AccountName || AccountMobile,
    ExamineStatus,
    StartTime: CreateTime && CreateTime[0],
    EndTime: CreateTime && CreateTime[1]
  }
  return request('/api/frontaccount/realname/list', {
    method: 'POST',
    data: payload,
  });
}

/**
 * 审核前端账户实名认证
 * @param {*} params 
 */
export async function updateRealNameInfo(params) {
  return request('/api/frontaccount/realname/examine', {
    method: 'POST',
    data: params,
  });
}
