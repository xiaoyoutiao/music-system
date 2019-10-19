import Vue from 'vue'
import Vuex from 'vuex'

import music from './modules/music'
import user from './modules/user'

/** Modules */
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    music,
    user
  }
})
