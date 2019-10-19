<template>
    <div>
        <BaseBanner
            :label="name"
            icon="el-icon-star-on"
        ></BaseBanner>
        <el-table
            :data="songList"
            stripe
            style="width: 75%"
            size="small"
        >
            <el-table-column
                type="index"
                label="序号"
                width="50"
            ></el-table-column>
            <el-table-column
                prop="songname"
                label="歌曲"
                min-width="80"
            ></el-table-column>
            <el-table-column
                prop="singers"
                label="演唱者"
                :formatter="formatSingers"
            ></el-table-column>
            <el-table-column
                prop="albumname"
                label="专辑"
            ></el-table-column>
            <el-table-column
                prop="albumname"
                label="专辑"
            >
                <template slot-scope="scope">
                    <BaseImage
                        :src="scope.row.albumpic"
                        width="35px"
                        height="35px"
                    ></BaseImage>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="100"
            >
                <template slot-scope="scope">
                    <el-button
                        @click="playMusic(scope.row)"
                        type="text"
                        size="small"
                        :icon="'el-icon-service'"
                    >Play</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import BaseImage from '_components/base/BaseImage'
import BaseBanner from '_components/base/BaseBanner'

export default {
  components: {
    BaseImage,
    BaseBanner
  },
  data () {
    return {
      id: '',
      name: '',
      songList: []
    }
  },
  computed: {},
  watch: {},
  created () {
    const params = this.$route.params
    if (!params.id) this.$router.replace('/favorites')
    this.id = params.id
    this.name = params.name
    this.songList = params.songList
  },
  mounted () { },
  methods: {
    formatSingers (row, column, cellValue, index) {
      return cellValue.join(' / ')
    },
    async playMusic (row) {
      this.loading = true
      this.$store.dispatch('music/reqSongUrl', {
        id: row.id,
        album: row.albumpic,
        songname: row.songname,
        station: row.station
      })
    }
  }
}
</script>

<style lang='scss' scoped>
    .albumpic-img {
        width: 35px;
        height: 35px;
    }
</style>
