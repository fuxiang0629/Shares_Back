
import request from '@/utils/request';

/**
 * 查询前端注册日志
 * @param {*} params 
 */
export async function queryRegisterLog(params) {
  const { current, pageSize, NickName, Mobile, CreateTime } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    NickName,
    Mobile,
    StartTime: CreateTime && CreateTime[0],
    EndTime: CreateTime && CreateTime[1]
  }
  return request('/api/frontaccount/register/log', {
    method: 'POST',
    data: payload,
  });
}
