import axios from 'axios'
import http from '../../config/http'
import APIS from '../../config/apis'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    list: [],
    playIndex: 0,
    historys: []
  },
  getters: {
    musicGetHistoryLimit: (state) => (limit) => {
      if (!state.historys.length) return []
      return state.historys.slice(0, limit)
    }
  },
  mutations: {
    changePlayIndex (state, index) {
      state.playIndex = index
    },
    add2list (state, song) {
      state.list.push(song)
    },
    setHistory (state, data) {
      state.historys = data
    }
  },
  actions: {
    async reqSongUrl (ctx, { id, album, songname, station }) {
      const _id = id
      // 本地存在则改变播放顺序
      const isExist = ctx.state.list.find((song, index, songs) => {
        if (song.id === _id) {
          ctx.commit('changePlayIndex', index)
          return song.id === _id
        }
      })
      if (isExist) {
        return
      }
      if (_id) {}
      try {
        /** 获取播放地址 */
        const UrlRes = await axios({
          url: '/music/search/radio',
          params: { id: _id, s: station }
        })
        /** 获取歌词 */
        const lrcRes = await http.get('/music/search/lyric', { params: { id: _id, s: station } })
        const song = {
          id: _id,
          station: station,
          playUrl: UrlRes.data.url,
          type: UrlRes.data.type || 'audio/mp3',
          albumUrl: album,
          songname,
          lyric: lrcRes.lyric
        }
        // 提交播放记录
        const history = {}
        history.station = station
        history.id = _id
        history.album = album
        history.songname = songname
        // history.songName = songname
        // history.albumUrl = album
        // history.resouceUrl = UrlRes.data.url
        // history.lyric = lrcRes.lyric
        // history.platform = station
        ctx.commit('add2list', song)
        await ctx.dispatch('addHistory', history)
        ctx.dispatch('getHistory')
      } catch (error) {
        throw error
      }
    },
    addHistory (ctx, history) {
      http.post(APIS.addHistory, history)
    },
    // 获取历史记录
    getHistory ({ commit }) {
      if (!localStorage.getItem('tokenId')) return
      http.get(APIS.getHistory)
        .then((resData) => {
          commit('setHistory', resData.history)
        }).catch(() => { })
    },
    addToFavorites (ctx, params) {
      http.post(APIS.addToFavorites, params).then(() => {
        Message({ message: '添加成功', type: 'success' })
      })
    }
  }

}
