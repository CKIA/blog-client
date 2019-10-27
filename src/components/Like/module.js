import { BASE_LIKE_URL } from '@/constants/API'

export const LOAD_LIKES = 'LOAD_LIKES'
export const LOAD_LIKES_ASYNC = 'LOAD_LIKES_ASYNC'
export const ADD_LIKE = 'ADD_LIKE'
export const ADD_LIKE_ASYNC = 'ADD_LIKE_ASYNC'
export const DELETE_LIKE = 'DELETE_LIKE'
export const DELETE_LIKE_ASYNC = 'DELETE_LIKE_ASYNC'

const like = {
  state: {
    result: []
  },
  getters: {
    likeCount: state => state.result.length,
    getLikesCountByPostId: state => id => state.result.filter(doc => doc.post && doc.post._id === id).length,
    getLikesByUserId: state => id => state.result.filter(doc => doc.user && doc.user._id === id),
    getLike: state => ({ postId, userId }) =>
      state.result.find(doc => doc.user && doc.user._id === userId && doc.post && doc.post._id === postId)
  },
  actions: {
    /* 加载所有点赞 */
    [LOAD_LIKES_ASYNC]({ commit }) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          url: BASE_LIKE_URL,
          doHideAlert: true,
          success(result) {
            // 保存类别
            commit(LOAD_LIKES, result.result)
            // 向前端通知操作成功
            resolve(result.result)
          },
          fail(err) {
            // 向前端通知操作失败
            reject(err)
          }
        })
      })
    },
    /* 增加点赞 */
    [ADD_LIKE_ASYNC]({ commit }, data) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          method: 'post',
          data,
          headers: { Authorization: sessionStorage.getItem('token') },
          url: `${BASE_LIKE_URL}`,
          doHideAlert: true,
          success(result) {
            // 保存点赞
            commit(ADD_LIKE, result.doc)
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
    /* 取消点赞 */
    [DELETE_LIKE_ASYNC]({ commit }, data) {
      return new Promise((resolve, reject) => {
        this._vm.$axios({
          commit,
          method: 'delete',
          headers: { Authorization: sessionStorage.getItem('token') },
          url: `${BASE_LIKE_URL}/${data.id}`,
          doHideAlert: true,
          success(result) {
            // 取消点赞
            commit(DELETE_LIKE, result.doc)
            // 向前端通知操作成功
            resolve(result.doc)
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
    /* 保存全部点赞信息 */
    [LOAD_LIKES](state, payload) {
      state.result = payload
    },
    /* 保存点赞信息 */
    [ADD_LIKE](state, payload) {
      state.result = [payload, ...state.result]
    },
    /* 保存删除当前点赞后的其他点赞信息 */
    [DELETE_LIKE](state, payload) {
      state.result = state.result.filter(doc => doc._id !== payload._id)
    }
  }
}
export default like
