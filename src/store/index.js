import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/components/User/module'
import alert from '@/components/Alert/module'
import post from '@/components/Post/module'
import category from '@/components/Category/module'
import content from '@/components/Content/module'
import size from '@/components/Size/module'

Vue.use(Vuex)
export default function createStore() {
  return new Vuex.Store({
    modules: {
      auth,
      alert,
      post,
      category,
      content,
      size
    }
  })
}
