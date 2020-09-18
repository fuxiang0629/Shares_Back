
import request from '@/utils/request';

/**
 * 查询前端账户列表
 * @param {*} params 
 */
export async function queryAccountList(params) {
  const { current, pageSize, NickName, Mobile, RecommandCode, ReferNickName, CreateTime } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    NickName,
    Mobile,
    RecommandCode,
    Refer: ReferNickName,
    StartTime: CreateTime && CreateTime[0],
    EndTime: CreateTime && CreateTime[1]
  }
  return request('/api/frontaccount/list', {
    method: 'POST',
    data: payload,
  });
}

/**
 * 更新用户基础信息
 * @param {*} params 
 */
export async function updateAccountInfo(params) {
  return request('/api/frontaccount/baseinfo/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 更新账户状态
 * @param {*} params 
 */
export async function updateAccountStatus(params) {
  return request('/api/frontaccount/status/modify', {
    method: 'POST',
    data: params,
  });
}



/**
 * 修改账户交易状态
 * @param {*} params 
 */
export async function updateAccountDealStatus(params) {
  return request('/api/frontaccount/trade/status/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 修改账户密码
 * @param {*} params 
 */
export async function updateAccountPwd(params) {
  return request('/api/frontaccount/loginpassword/modify', {
    method: 'POST',
    data: params,
  });
}

/**
 * 修改账户交易密码
 * @param {*} params 
 */
export async function updateAccountDealPwd(params) {
  return request('/api/frontaccount/transactionpassword/modify', {
    method: 'POST',
    data: params,
  });
}



/**
 * 修改前端钱包状态
 * @param {*} params 
 */
export async function updateAccountWalletStatus(params) {
  return request('/api/frontaccount/wallet/status/modify', {
    method: 'POST',
    data: params,
  });
}



/**
 * 修改账户余额
 * @param {*} params 
 */
export async function updateAccountWallet(params) {
  return request('/api/frontaccount/wallet/modify', {
    method: 'POST',
    data: params,
  });
}
