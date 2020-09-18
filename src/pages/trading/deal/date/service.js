import request from '@/utils/request';


/**
 * 查询禁止日期分组列表
 * @param {*} params 
 */
export async function queryForbidDateGroupList(params) {
  const { current, pageSize, GroupName} = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    GroupName
  }
  return request('/api/tradecenter/shares/date/group/forbid/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加禁止日期分组
 * @param {*} params 
 */
export async function addForbidDateGroup(params) {
  return request('/api/tradecenter/shares/date/group/forbid/add', {
    method: 'POST',
    data: params,
  });
}




/**
 * 修改禁止日期分组状态
 * @param {*} params 
 */
export async function updateForbidDateGroupStatus(params) {
  return request('/api/tradecenter/shares/date/group/forbid/status/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除禁止日期分组
 * @param {*} params 
 */
export async function removeForbidDateGroup(params) {
  return request('/api/tradecenter/shares/date/group/forbid/delete', {
    method: 'POST',
    data: params,
  });
}




/**
 * 编辑禁止日期分组
 * @param {*} params 
 */
export async function updateForbidDateGroup(params) {
  return request('/api/tradecenter/shares/date/group/forbid/modify', {
    method: 'POST',
    data: params,
  });
}


