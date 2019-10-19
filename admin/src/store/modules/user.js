import { addAdmin, getAdminInfo } from '@/api/user'
import { Message } from 'element-ui'

const state = {
  nickName: '',
  portrait: ''
}

const mutations = {
  SET_NICKNAME(state, nickName) {
    state.nickName = nickName
  },
  SET_PORTRAIT(state, portrait) {
    state.portrait = portrait
  }
}

const actions = {
  addAdmin(context, data) {
    addAdmin(data).then(_data => {
      // console.log(_data)
      Message({ message: '添加成功', type: 'success' })
    })
  },
  getAdminInfo({ commit }, data) {
    getAdminInfo().then(_data => {
      commit('SET_NICKNAME', _data.nickName)
      commit('SET_PORTRAIT', _data.portrait)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

