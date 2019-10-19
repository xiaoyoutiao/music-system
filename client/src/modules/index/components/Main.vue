<template>
    <el-row class="main-container">
        <el-col :xs="{span:24}" :sm="{span:16}" :lg="{span:8}">
            <!-- 搜索框 -->
            <div class="search-bar-box">
                <el-select v-model="station" placeholder="选择平台" size="small">
                    <el-option
                        v-for="station in stations"
                        :key="station.value"
                        :label="station.name"
                        :value="station.value"
                    ></el-option>
                </el-select>
                <el-input
                    v-model="keyWord"
                    placeholder="搜索歌曲"
                    size="small"
                    class="search-bar-input"
                    @keyup.enter.native="searchMusic"
                ></el-input>
                <el-button icon="el-icon-search" size="small" @click="searchMusic">搜索</el-button>
            </div>
            <!-- 搜索框 -->
        </el-col>
        <!-- 搜索结果 -->
        <el-col :span="24" style="padding: 20px;background-color: #fff;">
            <el-table
                v-loading="loading"
                :data="songs"
                :highlight-current-row="true"
                size="small"
                style="width: 100%"
                height="500px"
            >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="songname" label="歌曲"></el-table-column>
                <el-table-column prop="singers" label="演唱者" :formatter="formatSingers"></el-table-column>
                <el-table-column prop="albumname" label="专辑名"></el-table-column>
                <el-table-column label="专辑图">
                    <template slot-scope="scope">
                        <img :src="scope.row.albumpic" class="albumpic-img">
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            :icon="loading? 'el-icon-loading' : 'el-icon-service'"
                            @click="playMusic(scope.row)"
                        >Play</el-button>
                        <el-button @click="addToFavorites(scope.row)" type="text" size="small">收藏</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-pagination
                    v-if="!!isShowPagination"
                    background
                    layout="prev, pager, next"
                    :total="1000"
                    class="pagination"
                    @current-change="handlerCurrentChange"
                ></el-pagination>
            </div>
            <FavoritesListDialog :show.sync="showDialog" @on-picker="handlerDialogPicker"></FavoritesListDialog>
        </el-col>
    </el-row>
</template>

<script>
    import axios from 'axios'
    import { createNamespacedHelpers } from 'vuex'
    import FavoritesListDialog from './main/FavoritesListDialog'
    const { mapState, mapActions } = createNamespacedHelpers('music')
    import { getSupportStation } from '_api/platform'

    export default {
      components: {
        FavoritesListDialog
      },
      data() {
        return {
          loading: false,
          keyWord: '',
          station: '',
          page: 1,
          songs: null,
          showDialog: false,
          // 将要添加到收藏夹的歌曲
          wantAddSong: null,
          // 支持的平台
          stations: []
        }
      },
      computed: {
        list: mapState(['list']).list,
        playIndex: mapState(['playIndex']).playIndex,
        isShowPagination() {
          return this.songs
        }
      },
      created() {
        this.getStations()
      },
      methods: {
        reqSongUrl: mapActions(['reqSongUrl']).reqSongUrl,
        getStations() {
          getSupportStation().then(_data => {
            const defaultStationIndex = _data.list.findIndex(
              _item => _item.isDefault === true
            )
            _data.list.unshift(_data.list.splice(defaultStationIndex, 1)[0])
            console.log(_data.list)

            this.stations = _data.list
            this.station = this.stations[0].value
          })
        },
        async searchMusic(event) {
          let station = this.station || 'netease'
          if (this.keyWord) {
            try {
              this.loading = true
              let res = await axios({
                url: '/music/search/by_keyword',
                method: 'GET',
                params: {
                  s: station,
                  w: this.keyWord,
                  page: this.page
                }
              })
              this.songs = res.data
              this.loading = false
            } catch (error) {
              throw error
            }
          }
        },
        async playMusic(row) {
          try {
            this.loading = true
            await this.reqSongUrl({
              id: row.id,
              album: row.albumpic,
              songname: row.songname,
              station: row.station
            })
            this.loading = false
          } catch (error) {
            throw error
          }
        },
        formatSingers(row, column, cellValue, index) {
          return cellValue.join(' / ')
        },
        addToFavorites(row) {
          if (!localStorage.getItem('tokenId')) {
            this.$_toast('请先登录', '')
            return
          }
          this.wantAddSong = row
          this.showDialog = true
        },
        handlerCurrentChange(page) {
          this.page = page
          this.searchMusic()
        },
        handlerDialogPicker(row) {
          this.$http
            .post(this.$apis.userFavoritesAddSong, {
              id: row.id,
              song: this.wantAddSong
            })
            .then(data => {
              this.$_toast('添加成功', 'success')
            })
            .catch(() => {})
        }
      }
    }
</script>

<style lang="scss" scoped>
    .albumpic-img {
        width: 35px;
        height: 35px;
    }
    .pagination {
        margin-top: 35px;
    }
    .search-bar-box {
        display: flex;
        flex-direction: row;
        margin-top: 25px;
    }
    .search-bar-input {
        margin: 0 15px;
    }
</style>


