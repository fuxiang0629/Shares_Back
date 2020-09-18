import request from '@/utils/request';



/**
 * 查询账户列表
 * @param {*} params 
 */
export async function queryAccountList(params) {
  const { current, pageSize, Mobile, Status, UserName } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    Mobile,
    Status,
    UserName,
    RightCode: "GetBackAccountList_9"
  }
  return request('/api/backaccount/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加账户
 * @param {*} params 
 */
export async function addAccount(params) {
  return request('/api/backaccount/add', {
    method: 'POST',
    data: { ...params, RightCode: "AddBackAccount_9" }
  });
}



/**
 * 更新账户状态
 * @param {*} params 
 */
export async function updateAccountStatus(params) {
  return request('/api/backaccount/status/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifyBackAccountStatus_9" }
  });
}


/**
 * 修改账户是否为超级管理员
 * @param {*} params 
 */
export async function updateAccountIsAdminStatus(params) {
  return request('/api/backaccount/isadministrator/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifyBackAccountIsAdministrator_9" }
  });
}



/**
 * 删除账号
 * @param {*} params 
 */
export async function removeAdmin(params) {
  return request('/api/backaccount/delete', {
    method: 'POST',
    data: { ...params, RightCode: "DeleteBackAccount_9" }
  });
}


/**
 * 更新账号密码
 * @param {*} params 
 */
export async function updataAccountPwd(params) {
  return request('/api/backaccount/password/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifyBackAccountPassword_9" }
  });
}


/**
 * 更新账号
 * @param {*} params 
 */
export async function updataAccount(params) {
  return request('/api/backaccount/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifyBackAccount_9" }
  });
}







