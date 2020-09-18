import request from '@/utils/request';



/**
 * 查询头条列表
 * @param {*} params 
 */
export async function queryToutiaoList(params) {
  const { current, pageSize, Title } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    Title,
  }
  return request('/api/business/information/list', {
    method: 'POST',
    data: payload,
  });
}



/**
 * 添加头条
 * @param {*} params 
 */
export async function addToutiao(params) {
  return request('/api/business/information/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 编辑头条
 * @param {*} params 
 */
export async function updateToutiao(params) {
  return request('/api/business/information/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改头条状态
 * @param {*} params 
 */
export async function updateToutiaoStatus(params) {
  return request('/api/business/information/status/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除头条
 * @param {*} params 
 */
export async function removeToutiao(params) {
  return request('/api/business/information/delete', {
    method: 'POST',
    data: params,
  });
}







