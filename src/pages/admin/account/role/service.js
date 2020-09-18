import request from '@/utils/request';



/**
 * 查询角色列表
 * @param {*} params 
 */
export async function queryRoleList(params) {
  const { current, pageSize, RoleName, AccountId } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    RoleName,
    AccountId,
    RightCode: "GetBackAccountRoleList_10"
  }
  return request('/api/backaccount/role/list', {
    method: 'POST',
    data: payload,
  });
}



/**
 * 绑定后台用户角色
 * @param {*} params 
 */
export async function updateRole(params) {
  return request('/api/backaccount/role/bind', {
    method: 'POST',
    data: { ...params, RightCode: "BindBackAccountRole_9" },
  });
}



/**
 * 添加角色
 * @param {*} params 
 */
export async function addRole(params) {
  return request('/api/backaccount/role/add', {
    method: 'POST',
    data: { ...params, RightCode: "AddBackAccountRole_10" }
  });
}



/**
 * 更新角色状态
 * @param {*} params 
 */
export async function updateRoleStatus(params) {
  return request('/api/backaccount/role/status/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifyBackAccountRoleStatus_10" }
  });
}



/**
 * 删除角色
 * @param {*} params 
 */
export async function removeRole(params) {
  return request('/api/backaccount/role/delete', {
    method: 'POST',
    data: { ...params, RightCode: "DeleteBackAccountRole_10" }
  });
}




/**
 * 更新角色
 * @param {*} params 
 */
export async function updataRole(params) {
  return request('/api/backaccount/role/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifyBackAccountRole_10" }
  });
}


/**
 * 查询后台权限列表
 * @param {*} params 
 */
export async function queryRoleRightList(params) {
  return request('/api/backaccount/right/list', {
    method: 'POST',
    data: { ...params, RightCode: "GetBackAccountRightList_10" }
  });
}


/**
 * 更新权限列表
 * @param {*} params 
 */
export async function updateRoleRight(params) {
  return request('/api/backaccount/role/right/bind', {
    method: 'POST',
    data: { ...params, RightCode: "BindBackAccountRoleRight_10" }
  });
}






