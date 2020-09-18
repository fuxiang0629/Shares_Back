import request from '@/utils/request';

/**
 * 获取后台用户操作日志
 * @param {*} params 
 */
export async function queryOperateLog(params) {

  const { current, pageSize, UserName, LoginLogId, CreateTime } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    UserName: UserName,
    LoginLogId: LoginLogId,
    StartTime: CreateTime && CreateTime[0],
    EndTime: CreateTime && CreateTime[1],
    RightCode: "GetOperateLogList_13"
  }

  return request('/api/backaccount/operate/log/list', {
    method: 'POST',
    data: payload,
  });
}
