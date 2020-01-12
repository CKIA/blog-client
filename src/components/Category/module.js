import { BASE_CATEGORY_URL } from '@/constants/API'
import { getNumberWithoutPostPositiveZero, getCategoryNumbers } from '@/utils/util'

export const LOAD_RECOMMEND = 'LOAD_RECOMMEND'
export const LOAD_RECOMMEND_ASYNC = 'LOAD_RECOMMEND_ASYNC'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_CATEGORIES_ASYNC = 'LOAD_CATEGORIES_ASYNC'
export const LOAD_CATEGORIE_ONE = 'LOAD_CATEGORIE_ONE'
export const LOAD_CATEGORIE_ONE_ASYNC = 'LOAD_CATEGORIE_ONE_ASYNC'
const category = {
  state: {
    result: [],
    recommend: [],
    categoryOne:{}
  },
  getters: {
    getCategoryOne: state => state.categoryOne,
    getCateGories: state => state.result,
    categoryRecommend: state => state.recommend,
    categoryCount: state => state.result.length,
    getCategoriesByNumber: state => state.result.reduce((obj, t) => {
      obj[t.number] = t
      return obj
    }, {}),
    getCategoryByNumber: state => number => state.result.find(doc => doc.number === number),
    getPosterityCategories: (state, getters) => number => {
      const reg = new RegExp(`^${getNumberWithoutPostPositiveZero(number)}`)
      return state.result.filter(doc => {
        doc.titleDatas = getCategoryNumbers(doc.number).map(t => getters.getCategoriesByNumber[t].name)
        return String(doc.number).match(reg) && (doc.posts.length)
      })
    },
    getChildrenCategoryies: state => number => {
      const reference = String(getNumberWithoutPostPositiveZero(number))
      const len = reference.length
      const regExp = new RegExp(`^${reference}(0[1-9]|[1-9][0-9])(0){${8 - len}}`)
      return state.result.filter(doc => String(doc.number).match(regExp))
    },
    getCategoryRootDatas: state => state.result.filter(doc => Number(String(doc.number).slice(2)) === 0),
    getRecommendedCategories: state => state.result.filter(t => t.recommend).sort((a, b) => a.index - b.index)
  },
  actions: {
    /* 获取指定标题列表信息 */
    [LOAD_CATEGORIE_ONE_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: `${BASE_CATEGORY_URL}/${payload}`,
          doHideAlert: true,
          success(result) {
            // 保存文章
            commit(LOAD_CATEGORIE_ONE, result)
            // 向前端通知操作成功
            resolve(result.doc)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 获取全部类别信息 */
    [LOAD_CATEGORIES_ASYNC]({ commit }) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: `${BASE_CATEGORY_URL}`,
          doHideAlert: true,
          success(result) {
            // 保存类别
            commit(LOAD_CATEGORIES, result)
            // 向前端通知操作成功
            resolve(result.result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    }
  },
  /* 获取标题推荐文章信息 */
  [LOAD_RECOMMEND_ASYNC]({ commit }) {
    return new Promise((resolve, reject) => {
      this._vm.$axios({
        commit,
        url: `${BASE_CATEGORY_URL}/top`,
        doHideAlert: true,
        success(result) {
          // 保存文章
          commit(LOAD_RECOMMEND, result)
          // 向前端通知操作成功
          resolve(result.doc)
        },
        fail(err) {
          // 向前端通知操作失败
          reject(err)
        }
      })
    })
  },
  mutations: {
    /* 保存类别信息 */
    [LOAD_CATEGORIES](state, payload) {
      state.result = payload
    },
    [LOAD_RECOMMEND](state, payload) {
      state.recommend = payload
    },
    [LOAD_CATEGORIE_ONE](state, payload) {
      state.categoryOne = payload
    },
  }
}
export default category
