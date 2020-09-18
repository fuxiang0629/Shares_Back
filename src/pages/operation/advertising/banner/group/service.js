import request from '@/utils/request';



/**
 * 查询 Banner 分组
 * @param {*} params 
 */
export async function queryBannerGroup(params) {
  const { current, pageSize, GroupCode } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    GroupCode
  }
  return request('/api/business/banner/group/list', {
    method: 'POST',
    data: payload,
  });
}



/**
 * 编辑 Banner 分组
 * @param {*} params 
 */
export async function updateBannerGroup(params) {
  return request('/api/business/banner/group/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 更新广告状态
 * @param {*} params 
 */
export async function updateBannerGroupStatus(params) {
  return request('/api/business/banner/group/status/modify', {
    method: 'POST',
    data: params,
  });
}






