import request from '@/utils/request';


/**
 * 查询禁止日期列表
 * @param {*} params 
 */
export async function queryForbidDateList(params) {
  const { current, pageSize, Id} = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    Id
  }
  return request('/api/tradecenter/shares/date/forbid/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加禁止日期
 * @param {*} params 
 */
export async function addForbidDate(params) {
  return request('/api/tradecenter/shares/date/forbid/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改禁止日期状态
 * @param {*} params 
 */
export async function updateForbidDateStatus(params) {
  return request('/api/tradecenter/shares/date/forbid/status/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除禁止日期
 * @param {*} params 
 */
export async function removeForbidDate(params) {
  return request('/api/tradecenter/shares/date/forbid/delete', {
    method: 'POST',
    data: params,
  });
}


/**
 * 编辑禁止日期
 * @param {*} params 
 */
export async function updateForbidDate(params) {
  return request('/api/tradecenter/shares/date/forbid/modify', {
    method: 'POST',
    data: params,
  });
}




