import request from '@/utils/request';



/**
 * 查询Banner列表
 * @param {*} params 
 */
export async function queryBannerList(params) {
  const { current, pageSize, GroupId, Name } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    GroupId,
    BannerName: Name
  }
  return request('/api/business/banner/list', {
    method: 'POST',
    data: payload,
  });
}



/**
 * 添加Banner广告
 * @param {*} params 
 */
export async function addBanner(params) {
  return request('/api/business/banner/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 编辑Banner广告
 * @param {*} params 
 */
export async function updateBanner(params) {
  return request('/api/business/banner/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改Banner广告状态
 * @param {*} params 
 */
export async function updateBannerStatus(params) {
  return request('/api/business/banner/status/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除Banner广告
 * @param {*} params 
 */
export async function removeBanner(params) {
  return request('/api/business/banner/delete', {
    method: 'POST',
    data: params,
  });
}







