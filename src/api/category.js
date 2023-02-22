import request from '@/utils/request'
// 首页头部分类数据
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
/**
 * 获取顶级类目信息（children属性）
 * @param {String} id - 顶级类目ID
 * @returns
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
/**
 * 获取二级类目下的筛选条件数据
 * @param {String} id
 * @returns
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}
/**
 * 获取分类下的商品
 * @param {*} params - 可参考接口文档
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}
