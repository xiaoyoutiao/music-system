<template>
    <el-row class="my-header-container">
        <el-col :span="2">
            <span class="header-hover-color" @click="toPage('home')">
                <i class="MusicIcon music-icon-index"></i>主页
            </span>
        </el-col>
        <el-col :span="2">
            <span class="header-hover-color" @click="toPage('shareSong')">推荐歌曲</span>
        </el-col>
        <el-col :span="2">
            <span class="header-hover-color" @click="toPage('shareSonglist')">推荐歌单</span>
        </el-col>
        <el-col :span="2" :offset="isLogin ? 11 : 12">
            <span class="header-hover-color" @click="toFavoritesPage">收藏</span>
        </el-col>
        <el-col :span="2">
            <span class="header-hover-color" v-popover:historyPopover>历史</span>
        </el-col>
        <el-col v-if="isLogin" :span="1">
            <span>{{nickName}}</span>
        </el-col>
        <el-col v-if="isLogin" :span="2">
            <span>
                <user-info>
                    <span class="user-item" @click="toSettingPage">设置</span>
                    <span class="user-item" @click="logout">退出</span>
                </user-info>
            </span>
        </el-col>
        <el-col v-else :span="2">
            <router-link to="/login" tag="span" class="header-hover-color">登录</router-link>
        </el-col>
        <el-popover ref="historyPopover" placement="bottom" width="300" trigger="hover">
            <HistoryPopover :historys="historys"></HistoryPopover>
        </el-popover>
    </el-row>
</template>

<script>
    import UserInfo from './UserInfo.vue'
    import HistoryPopover from './HistoryPopover'

    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('music')

    export default {
      name: 'Header',
      components: {
        UserInfo,
        HistoryPopover
      },
      data() {
        return {}
      },
      computed: {
        historys() {
          return this.$store.getters['music/musicGetHistoryLimit'](10)
        },
        isLogin() {
          return localStorage.getItem('tokenId')
        },
        nickName() {
          return this.$store.state.user.nickName
        }
      },
      mounted() {
        this.getHistory()
      },
      methods: {
        getHistory: mapActions(['getHistory']).getHistory,
        logout() {
          localStorage.removeItem('tokenId')
          this.$router.replace('/login')
        },
        toPage(routeName) {
          this.$router.push({ name: routeName })
        },
        toSettingPage() {
          this.$router.push('/setting')
        },
        toFavoritesPage() {
          this.$router.replace('/favorites')
        }
      }
    }
</script>
<style lang="scss">
    .my-header-container {
        color: #ccc;
        span {
            display: inline-block;
            min-width: 80px;
            line-height: 60px;
            cursor: pointer;
            img {
                vertical-align: middle;
                border-radius: 50%;
                border: 2px solid transparent;
                transition: border 0.3s ease;
            }
            .MusicIcon {
                margin-right: 5px;
            }
        }
        .header-hover-color:hover {
            color: #fff;
            background-color: rgba($color: #000000, $alpha: 0.2);
            opacity: 0.6;
            padding: 0 8px;
        }
        .music-logo {
            width: 50px;
            height: 50px;
            // margin-top: 8px;
        }
    }
    .user-item {
        &:hover {
            background-color: #262933;
        }
    }
</style>


