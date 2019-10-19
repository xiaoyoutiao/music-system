// import axios from 'axios'
import http from '../../config/http'
import APIS from '../../config/apis'
// import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    nickName: '',
    portrait: '',
    favorites: [] // 用户收藏夹
  },
  getters: {},
  mutations: {
    userSetNickName (state, nickName) {
      state.nickName = nickName
    },
    userSetPortrait (state, portrait) {
      state.portrait = portrait
    },
    setFavorites (state, favorites) {
      state.favorites = favorites
    }
  },
  actions: {
    userGetUserInfoAction ({ commit }) {
      http.get(APIS.userUserInfo)
        .then(res => {
          if (!res) return
          commit('userSetNickName', res.nickName)
          commit('userSetPortrait', res.portrait)
        })
    },
    USER_GET_FAVORITES ({ commit }) {
      http(APIS.userFavoritesList)
        .then(res => {
          if (!res) return
          commit('setFavorites', res.favorites)
        })
    }
  }
}
