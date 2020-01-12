import { BASE_CONTENT_URL } from '@/constants/API'

export const LOAD_CONTENT = 'LOAD_CONTENT'
export const LOAD_CONTENT_ASYNC = 'LOAD_CONTENT_ASYNC'
const content = {
  state: {
    result: []
  },
  getters: {
    getContent: state => state.result
  },
  actions: {
      /* 获取指定标题列表信息 */
      [LOAD_CONTENT_ASYNC]({ commit }, payload) {
        return new Promise((resolve, reject) => {
          this._vm.$axios({
            commit,
            url: `${BASE_CONTENT_URL}/${payload}`,
            doHideAlert: true,
            success(result) {
              // 保存文章
              commit(LOAD_CONTENT, result)
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
    /* 保存类别信息 */
    [LOAD_CONTENT](state, payload) {
      state.result = payload
    },
  }
}
export default content
