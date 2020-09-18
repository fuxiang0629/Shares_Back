import request from '@/utils/request';

/**
 * 查询券商营业部
 * @param {*} params 
 */
export async function queryBrokerSdList(params) {

  console.log("查询券商营业部")
  console.log(params)

  const { current, pageSize, BrokerCode, DepartmentName } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    DepartmentName,
    BrokerCode
  }
  return request('/api/sys/broker/department/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加券商营业部
 * @param {*} params 
 */
export async function addBrokerSd(params) {


  console.log("添加券商营业部")

  console.log(params)


  return request('/api/sys/broker/department/add', {
    method: 'POST',
    data: params,
  });
}



/**
 * 删除券商营业部
 * @param {*} params 
 */
export async function removeBrokerSd(params) {
  return request('/api/sys/broker/department/delete', {
    method: 'POST',
    data: params
  });
}



/**
 * 编辑券商营业部
 * @param {*} params 
 */
export async function updateBrokerSd(params) {
  return request('/api/sys/broker/department/modify', {
    method: 'POST',
    data: params
  });
}



/**
 * 修改券商营业部状态
 * @param {*} params 
 */
export async function updateBrokerSdStatus(params) {
  return request('/api/sys/broker/department/status/modify', {
    method: 'POST',
    data: params
  });
}

