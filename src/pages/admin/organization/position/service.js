import request from '@/utils/request';



/**
 * 获取后台职位列表
 * @param {*} params 
 */
export async function queryPositionList(params) {
  const { current, pageSize, Name } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    PositionName: Name,
    RightCode: "GetBackAccountPositionList_15"
  }
  return request('/api/backaccount/position/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加后台职位
 * @param {*} params 
 */
export async function addPosition(params) {
  return request('/api/backaccount/position/add', {
    method: 'POST',
    data: { ...params, RightCode: "AddBackAccountPosition_15" },
  });
}


/**
 * 删除后台职位
 * @param {*} params 
 */
export async function removePosition(params) {
  return request('/api/backaccount/position/delete', {
    method: 'POST',
    data: { ...params, RightCode: "DeleteBackAccountPosition_15" },
  });
}


/**
 * 更新后台职位状态
 * @param {*} params 
 */
export async function updatePositionStatus(params) {
  return request('/api/backaccount/position/status/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifyBackAccountPositionStatus_15" },
  });
}


/**
 * 编辑后台职位
 * @param {*} params 
 */
export async function updatePosition(params) {
  return request('/api/backaccount/position/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifyBackAccountPosition_15" },
  });
}


