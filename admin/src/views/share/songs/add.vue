<template>
  <div class="view-wrap">
    <div class="search-bar">
      <el-select
        v-model="station"
        placeholder="请选择"
        size="mini"
        class="search-select"
        @change="handlerSelect"
      >
        <el-option
          v-for="_item in platformList"
          :key="_item.value"
          :label="_item.name"
          :value="_item.value"
        />
      </el-select>
      <div class="search-input">
        <el-input
          v-model="keyWord"
          size="mini"
          placeholder="输入关键字搜索"
          @keyup.enter.native="handlerSearch"
        />
      </div>
      <el-button size="mini" :disabled="!allowSearch" @click="handlerSearch">搜索</el-button>
    </div>
    <el-table :data="songsList" height="600" border style="width: 100%" size="small">
      <el-table-column prop="songname" label="歌曲标题" width="180" />
      <el-table-column prop="singers" label="歌手" width="180" />
      <el-table-column prop="albumname" label="专辑标题" />
      <el-table-column prop="albumpic" label="专辑图片" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <div class="button-group">
            <el-button
              v-for="btn in buttonGroup"
              :key="btn.label"
              :type="btn.type"
              size="mini"
              @click="btn.handler(scope.row)"
            >{{ btn.label }}</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 选择对话框 -->
    <el-dialog title="我的歌单" :visible.sync="isShowDialog">
      <div class="songlist-select-box">
        <div
          v-for="item in mySongsList"
          :key="item._id"
          class="songlist-select-item-box"
          @click="handlerSelectSonglist(item)"
        >
          <BaseImage :src="item.cover" width="90px" height="90px" />
          <span class="songlist-select-item-label">{{ item.title }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BaseImage from '@/components/base/BaseImage'

import {
  getPlatformIsSupport,
  searchSong,
  searchSongAdd,
  songlistGetList,
  shareSonglistAddSong
} from '@/api/share'

export default {
  components: {
    BaseImage
  },
  data() {
    return {
      allowSearch: false,
      isShowDialog: false,
      station: '',
      keyWord: '', // 搜索关键字
      songsList: [], // 搜索结果列表
      mySongsList: [], // 我的歌单
      platformList: [], // 支持平台列表
      checkedSong: null, // 选中的将要添加到歌单的歌曲
      buttonGroup: [
        { label: '到歌曲', handler: this.handlerAdd },
        { label: '到歌单', handler: this.handlerAddToSonglist, type: 'primary' }
      ]
    }
  },
  computed: {},
  watch: {
    keyWord(val) {
      if (val.length) this.allowSearch = true
      else this.allowSearch = false
    }
  },
  created() {
    this.getList()
    this.getSonglist()
  },
  mounted() {},
  methods: {
    getList() {
      getPlatformIsSupport().then(_data => {
        this.platformList = _data.list
        const defaultPlatform = this.platformList.find(_item => _item.isDefault)
        if (defaultPlatform) this.station = defaultPlatform.value
        else this.station = this.platformList[0].value
      })
    },
    getSonglist() {
      songlistGetList().then(_data => {
        this.mySongsList = _data
      })
    },
    handlerSelect(val) {
      this.station = val
    },
    handlerSearch() {
      if (!this.keyWord.length) return
      searchSong({ keyword: this.keyWord, station: this.station }).then(
        _data => {
          this.songsList = _data
        }
      )
    },
    handlerAdd(row) {
      searchSongAdd(row).then(() => {
        this.$message({ message: '添加成功', type: 'success' })
      })
    },
    handlerSelectSonglist(row) {
      shareSonglistAddSong({ _id: row._id, song: this.checkedSong }).then(
        () => {
          this.$message({ message: '添加成功', type: 'success' })
          this.isShowDialog = false
        }
      )
    },
    // 添加歌曲到歌单
    handlerAddToSonglist(row) {
      this.checkedSong = row
      this.isShowDialog = true
    }
  }
}
</script>

<style lang='scss' scoped>
    @import url('~@/styles/global.scss');
    .button-group {
        display: flex;
        justify-content: center;
    }
    .search-bar {
        width: 450px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 0 15px 0;
    }
    .search-input {
        width: 250px;
        margin: 0 15px;
    }
    .search-select {
        width: 150px;
    }
    .songlist-select-box {
        display: flex;
        flex-direction: row;
        padding: 25px;
    }
    .songlist-select-item {
        &-box {
            width: 90px;
            height: 90px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            margin: 5px 15px;
            background-color: #ccc;
            transition: opacity 0.25s ease-in-out;
            transition: transform 0.25s ease-in-out;
            cursor: pointer;
            &:hover {
                opacity: 0.7;
                transform: translateY(-10px);
            }
        }
        &-label {
            padding: 10px;
        }
    }
</style>
