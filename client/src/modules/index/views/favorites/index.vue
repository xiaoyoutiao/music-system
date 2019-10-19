<template>
    <div class="wrap">
        <BaseBanner label="我的收藏夹" icon="el-icon-star-on"></BaseBanner>
        <Favoritesform
            :list="favorites"
            @clickCheck="handleCheck"
            @clickEdit="handleEdit"
            @clickDelete="deleteConfirm"
            @clickAdd="handlerAddPrompt"
        ></Favoritesform>
    </div>
</template>

<script>
import Favoritesform from './components/Favoritesform'
import BaseBanner from '_components/base/BaseBanner'

export default {
  components: {
    Favoritesform,
    BaseBanner
  },
  data () {
    return {}
  },
  computed: {
    favorites () {
      return this.$store.state.user.favorites
    }
  },
  watch: {},
  beforeCreate () {
    if (!localStorage.getItem('tokenId')) {
      this.$router.replace('/login')
    }
  },
  created () {
    this.getFavoritesList()
  },
  mounted () {},
  methods: {
    getFavoritesList () {
      this.$store.dispatch('user/USER_GET_FAVORITES')
    },
    handlerAddPrompt () {
      this.$prompt('请输入收藏夹名字', '', {
        confirmButtonText: '添加',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.addFavorites(value)
      })
    },
    handleCheck (row) {
      this.$router.push({
        name: 'favoritesCheck',
        params: {
          id: row.id,
          name: row.name,
          songList: row.songList
        }
      })
    },
    handleEdit (row) {
      this.$router.push({
        name: 'favoritesEdit',
        params: {
          id: row.id,
          name: row.name,
          cover: row.cover
        }
      })
    },
    deleteConfirm (row) {
      this.$confirm('此操作将永久删除该收藏夹, 是否继续?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.delete(row)
        })
        .catch(() => {})
    },
    delete (row) {
      this.$http
        .post(this.$apis.userFavoritesDelete, { id: row.id })
        .then(res => {
          this.getFavoritesList()
        })
    },
    addFavorites (name) {
      this.$http.post(this.$apis.userFavoritesAdd, { name }).then(res => {
        this.getFavoritesList()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
    @import url('../../styles/global.scss');
</style>
