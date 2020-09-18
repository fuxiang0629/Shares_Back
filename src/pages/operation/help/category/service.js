import request from '@/utils/request';



/**
 * 查询问题分类列表
 * @param {*} params 
 */
export async function queryQuestionCategoryList(params) {
  const { current, pageSize, TypeName, QuestionId } = params
  const payload = {
    PageIndex: current,
    PageSize: pageSize,
    TypeName,
    QuestionId
  }
  return request('/api/business/helpcenter/question/type/list', {
    method: 'POST',
    data: payload,
  });
}


/**
 * 添加问题分类
 * @param {*} params 
 */
export async function addQuestionCategory(params) {
  return request('/api/business/helpcenter/question/type/add', {
    method: 'POST',
    data: params
  });
}



/**
 * 更新问题分类
 * @param {*} params 
 */
export async function updateQuestionCategory(params) {
  return request('/api/business/helpcenter/question/type/modify', {
    method: 'POST',
    data: params
  });
}


/**
 * 删除分类
 * @param {*} params 
 */
export async function removeQuestionCategory(params) {
  return request('/api/business/helpcenter/question/type/delete', {
    method: 'POST',
    data: params
  });
}
