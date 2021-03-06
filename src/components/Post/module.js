import { BASE_POST_URL } from '@/constants/API'
import { getCategoryNumbers, getNumberWithoutPostPositiveZero, getAncestorNumber } from '@/utils/util'

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_POSTS_ASYNC = 'LOAD_POSTS_ASYNC'
export const LOAD_POST = 'LOAD_POST'
export const LOAD_POST_ASYNC = 'LOAD_POST_ASYNC'
export const CLEAR_POST = 'CLEAR_POST'

const post = {
  state: {
    result: [],
    doc: null
  },
  getters: {
    postCount: state => state.result.length,
    getPosts: state => state.result,
    getPost: state => state.doc,
    getPostId: state => {
      if (state.doc) {
        return state.doc._id
      }
    },
    getPostsFilterByCategoryNumber: state => number => {
      if (number === null) {
        return state.result
      }
      const reg = new RegExp(`^${getNumberWithoutPostPositiveZero(number)}`)
      return state.result.filter(doc => doc.category && String(doc.category.number).match(reg))
    },
    getPostTitleByPostId: state => id => state.result.find(doc => doc._id === id).title,
    getPostWithTitleDatas: (state, getters) => {
      const { doc } = state
      if (doc) {
        return {
          ...doc,
          titleDatas: doc.category && Object.keys(getters.getCategoriesByNumber).length !== 0
            ? getCategoryNumbers(doc.category.number).map(t => getters.getCategoriesByNumber[t].name) : [],
          text: typeof window === 'object' ? decodeURIComponent(escape(window.atob(doc.content))) : ''
        }
      }
      return null
    },
    getPostsWithTitleData: (state, getter) => {
      if (getter.getPosts.length === 0) return getter.getPosts
      if (Object.keys(getter.getCategoriesByNumber).length === 0) return getter.getPosts
      return (
        getter.getPosts.map(t => ({
          ...t,
          titleData: t.category ? getter.getCategoriesByNumber[getAncestorNumber(t.category.number)].name : ''
        }))
      )
    },
    getRecommendPosts: (state, getter) => getter.getPostsWithTitleData.filter(t => t.recommend).sort((a, b) => a.index - b.index)
  },
  actions: {
    /* 按照id获取一篇文章 */
    [LOAD_POST_ASYNC]({ commit }, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: `${BASE_POST_URL}/detail/${payload.id}`,
          doHideAlert: true,
          success(result) {
            // 保存文章
            commit(LOAD_POST, result)
            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 获取所有文章 */
    [LOAD_POSTS_ASYNC]({ commit }) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: `${BASE_POST_URL}`,
          doHideAlert: true,
          success(result) {
            // 保存文章
            commit(LOAD_POSTS, result)
            // 向前端通知操作成功
            resolve(result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    }
  },
  mutations: {
    /* 保存所有文章信息 */
    [LOAD_POSTS](state, payload) {
      state.result = payload
    },
    /* 保存当前文章信息 */
    [LOAD_POST](state, payload) {
      state.doc = payload
    },
    /* 清空当前文章信息 */
    [CLEAR_POST](state) {
      state.doc = null
    }
  }
}
export default post
