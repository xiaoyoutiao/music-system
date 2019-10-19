<template>
    <div class="view-wrap">
        <BaseBanner label="推荐歌曲" icon="el-icon-tickets"></BaseBanner>
        <el-table :data="songs" height="600" border style="margin-top: 25px;" size="small">
            <el-table-column prop="songname" label="歌曲标题"/>
            <el-table-column prop="singers" label="歌手"/>
            <el-table-column prop="albumname" label="专辑标题"/>
            <el-table-column prop="address" label="专辑图片" width="72">
                <template slot-scope="scope">
                    <BaseImage :src="scope.row.albumpic" round/>
                </template>
            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="playMusic(scope.row)">Play</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { getShareSongs } from '_api/share'
    import BaseImage from '_components/base/BaseImage'
    import BaseBanner from '_components/base/BaseBanner'

    export default {
      components: {
        BaseImage,
        BaseBanner
      },
      data() {
        return {
          songs: [],
          buttonGroup: [
            { label: '移除', handler: this.handlerRemove, type: 'danger' }
          ]
        }
      },
      computed: {},
      watch: {},
      created() {
        this.getList()
      },
      mounted() {},
      methods: {
        getList() {
          getShareSongs().then(_data => {
            if (_data.list) this.songs = _data.list
          })
        },
        async playMusic({ id, albumpic, songname, station }) {
          try {
            this.loading = true
            await this.$store.dispatch('music/reqSongUrl', {
              id,
              album: albumpic,
              songname,
              station
            })
            this.loading = false
          } catch (error) {
            console.error(error)
          }
        }
      }
    }
</script>

<style lang='scss' scoped>
    @import url('../../styles/global.scss');
</style>
