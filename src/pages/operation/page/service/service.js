import request from '@/utils/request';



/**
 * 获取客服
 * @param {*} params 
 */
export async function queryServiceList(params) {
  const { current, pageSize, PageCode } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    PageCode,
  }
  return request('/api/business/customerservice/setting/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加客服配置
 * @param {*} params 
 */
export async function addServiceConfig(params) {
  return request('/api/business/customerservice/setting/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 更新客服配置
 * @param {*} params 
 */
export async function updateServiceConfig(params) {
  return request('/api/business/customerservice/setting/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除
 * @param {*} params 
 */
export async function removeServiceConfig(params) {
  return request('/api/business/customerservice/setting/delete', {
    method: 'POST',
    data: params,
  });
}


/**
 * 编辑客服配置详情
 * @param {*} params 
 */
export async function updateServiceConfigDetail(params) {
  return request('/api/business/customerservice/setting/details/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改客服配置状态
 * @param {*} params 
 */
export async function updateServiceConfigStatus(params) {
  return request('/api/business/customerservice/setting/status/modify', {
    method: 'POST',
    data: params,
  });
}









