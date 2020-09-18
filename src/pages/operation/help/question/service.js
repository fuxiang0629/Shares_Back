import request from '@/utils/request';


/**
 * 获取问题列表
 * @param {*} params 
 */
export async function queryQuestionList(params) {
  const { current, pageSize, QuestionName } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    QuestionName
  }
  return request('/api/business/helpcenter/question/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 问题是否置顶
 * @param {*} params 
 */
export async function updateQuestionIsTop(params) {
  return request('/api/business/helpcenter/question/istop/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 是否常见问题
 * @param {*} params 
 */
export async function updateQuestionIsCommon(params) {
  return request('/api/business/helpcenter/question/iscommon/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 问题是否有效
 * @param {*} params 
 */
export async function updateQuestionStatus(params) {
  return request('/api/business/helpcenter/question/status/modify', {
    method: 'POST',
    data: params,
  });
}



/**
 * 添加问题
 * @param {*} params 
 */
export async function addQuestion(params) {
  return request('/api/business/helpcenter/question/add', {
    method: 'POST',
    data: params,
  });
}


/**
 * 删除问题
 * @param {*} params 
 */
export async function removeQuestion(params) {
  return request('/api/business/question/delete', {
    method: 'POST',
    data: params,
  });
}


/**
 * 更新问题
 * @param {*} params 
 */
export async function updateQuestion(params) {
  return request('/api/business/helpcenter/question/modify', {
    method: 'POST',
    data: params,
  });
}


/**
 * 更新问题分类
 * @param {*} params 
 */
export async function updateQuestionCategory(params) {
  return request('/api/business/helpcenter/question/type/bind', {
    method: 'POST',
    data: params,
  });
}
