import request from '@/utils/request';


/**
 * 获取部门列表
 * @param {*} params 
 */
export async function queryDepartmentList(params) {
  const { current, pageSize, Name } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    DepartmentName: Name,
    RightCode: "GetBackAccountDepartmentList_16"
  }
  return request('/api/backaccount/department/list', {
    method: 'POST',
    data: payload,
  });
}

/**
 * 添加部门
 * @param {*} params 
 */
export async function addDepartment(params) {
  return request('/api/backaccount/department/add', {
    method: 'POST',
    data: { ...params, RightCode: "AddBackAccountDepartment_16" },
  });
}

/**
 * 删除部门
 * @param {*} params 
 */
export async function removeDepartment(params) {
  return request('/api/backaccount/department/delete', {
    method: 'POST',
    data: { ...params, RightCode: "DeleteBackAccountDepartment_16" },
  });
}


/**
 * 更新部门状态
 * @param {*} params 
 */
export async function updateDepartmentStatus(params) {
  return request('/api/backaccount/department/status/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifyBackAccountDepartmentStatus_16" },
  });
}


/**
 * 更新部门
 * @param {*} params 
 */
export async function updateDepartment(params) {
  return request('/api/backaccount/department/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifyBackAccountDepartment_16" },
  });
}


