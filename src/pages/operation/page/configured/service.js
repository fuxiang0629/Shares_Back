import request from '@/utils/request';



/**
 * 获取页面配置
 * @param {*} params 
 */
export async function queryPageSetting(params) {
  const { current, pageSize, PageCode } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    PageCode,
  }
  return request('/api/business/page/setting/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 修改页面配置状态
 * @param {*} params 
 */
export async function updatePageSettingStatus(params) {
  return request('/api/business/page/setting/status/modify', {
    method: 'POST',
    data: params,
  });
}




/**
 * 获取页面配置详情
 * @param {*} params 
 */
export async function queryPageDetail(params) {
  return request('/api/business/page/setting/details', {
    method: 'POST',
    data: params,
  });
}



/**
 * 更新页面配置详情
 * @param {*} params 
 */
export async function updatePageDetail(params) {
  return request('/api/business/page/setting/save', {
    method: 'POST',
    data: params,
  });
}





