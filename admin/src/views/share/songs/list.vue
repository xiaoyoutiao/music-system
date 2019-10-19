<template>
  <div class="view-wrap">
    <el-table :data="songs" height="500" border style="width: 100%" size="small">
      <el-table-column prop="songname" label="歌曲标题" width="150" />
      <el-table-column prop="singers" label="歌手" width="150" />
      <el-table-column prop="albumname" label="专辑标题" width="150" />
      <el-table-column prop="address" label="专辑图片" width="75">
        <template slot-scope="scope">
          <BaseImage :src="scope.row.albumpic" />
        </template>
      </el-table-column>
      <el-table-column prop="station" label="所属平台" width="100" />
      <el-table-column prop="id" label="平台歌曲ID" width="150" />
      <el-table-column prop="createDate" label="添加日期" width="180" />
      <el-table-column label="操作" header-align="center">
        <template slot="header">
          <el-button type="success" size="mini" @click="handlerAdd">添加</el-button>
        </template>
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
  </div>
</template>

<script>
import BaseImage from '@/components/base/BaseImage'
import { shareList, shareDelete } from '@/api/share'
export default {
  components: {
    BaseImage
  },
  data() {
    return {
      songs: [], // 搜索结果列表
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
      shareList().then(_data => {
        this.songs = _data
      })
    },
    handlerRemove(row) {
      shareDelete(row).then(() => {
        this.$message({ message: '移除成功', type: 'success' })
        this.getList()
      })
    },
    handlerAdd() {
      this.$router.push({ name: 'ShareSongsAdd' })
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
</style>
