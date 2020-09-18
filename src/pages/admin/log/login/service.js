import request from '@/utils/request';

/**
 * 查询后台用户登录日志
 * @param {*} params 
 */
export async function queryLoginLog(params) {
  const { current, pageSize, AccountName, LoginIp, LoginTime, LogoutTime } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    UserName: AccountName,
    Ip: LoginIp,
    StartTime: LoginTime,
    EndTime: LogoutTime,
    RightCode: "GetLoginLogList_12"
  }
  return request('/api/backaccount/login/log/list', {
    method: 'POST',
    data: payload,
  });
}
