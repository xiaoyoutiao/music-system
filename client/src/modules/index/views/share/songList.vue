<template>
    <div class="view-wrap">
        <BaseBanner label="推荐歌单" icon="el-icon-tickets"/>
        <div class="songlist-box">
            <Songlist v-for="item in songlist" :key="item._id" :songlist="item"/>
        </div>
    </div>
</template>

<script>
    import BaseBanner from '_components/base/BaseBanner'
    import Songlist from './components/Songlist.vue'
    import { getShareSonglist } from '_api/share'

    export default {
      components: {
        BaseBanner,
        Songlist
      },
      data() {
        return {
          songlist: []
        }
      },
      computed: {},
      watch: {},
      created() {
        this.getSonglist()
      },
      mounted() {},
      methods: {
        getSonglist() {
          getShareSonglist().then(_data => {
            if (_data.list) this.songlist = _data.list
          })
        }
      }
    }
</script>

<style lang='scss' scoped>
    @import url('../../styles/global.scss');
    .songlist-box {
        padding: 15px;
        display: flex;
        flex-direction: row;
    }
</style>
