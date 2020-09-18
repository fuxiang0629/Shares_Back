import request from '@/utils/request';




/**
 * 获取系统参数
 * @param {*} params 
 */
export async function querySystemArgsList(params) {
  const { current, pageSize, ParName, BusinessCode, ChannelCode } = params
  const payload = {
    BusinessCode,
    ChannelCode,
    ParName,
    PageIndex: current,
    PageSize: pageSize,
    RightCode: "GetSysParList_19"
  }
  return request('/api/sys/par/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 修改系统参数
 * @param {*} params 
 */
export async function updateSystemArgs(params) {
  return request('/api/sys/par/modify', {
    method: 'POST',
    data: { ...params, RightCode: "ModifySysPar_19" },
  });
}
