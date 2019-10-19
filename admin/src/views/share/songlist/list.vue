<template>
  <div class="view-wrap">
    <el-table :data="searchResult" height="500" border style="width: 100%">
      <el-table-column prop="title" label="歌单标题" width="180" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column prop="cover" label="封面" width="120">
        <template slot-scope="scope">
          <BaseImage :src="scope.row.cover" />
        </template>
      </el-table-column>
      <el-table-column prop="songsCount" label="歌曲数量" width="80" align="center" />
      <el-table-column prop="createDate" label="创建时间" :formatter="formatterCreateDate" />
      <el-table-column prop="isShare" label="是否分享" width="100" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.isShare"
            type="primary"
          >{{ scope.row.isShare ? '分享' : '' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot="header">
          <el-button size="mini" type="success" @click="handlerAdd">添加</el-button>
        </template>
        <template slot-scope="scope">
          <div>
            <el-button
              v-for="btn in buttonGroup"
              :key="btn.label"
              :type="convertBtnType(btn.label)"
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
import { songlistGetList, songlistDelete } from '@/api/share'
import BaseImage from '@/components/base/BaseImage'

export default {
  components: {
    BaseImage
  },
  data() {
    return {
      searchResult: [],
      buttonGroup: [
        { label: 'Check', handler: this.handlerCheck },
        { label: 'Edit', handler: this.handlerEdit },
        { label: 'Delete', handler: this.handlerDelete }
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
      songlistGetList().then(_res => {
        this.searchResult = _res
      })
    },
    convertBtnType(label) {
      const obj = {
        Check: '',
        Edit: 'primary',
        Delete: 'danger'
      }
      return obj[label] || ''
    },
    formatterCreateDate(row, column, cellValue) {
      return cellValue
    },
    handlerAdd() {
      this.$router.push({ name: 'ShareSongListAdd' })
    },
    handlerCheck(row) {
      this.$router.push({ name: 'ShareSongListCheck', params: row })
    },
    handlerEdit(row) {
      this.$router.push({ name: 'ShareSongListEdit', params: row })
    },
    handlerDelete(row) {
      songlistDelete({ _id: row._id }).then(() => {
        this.getList()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
    @import url('~@/styles/global.scss');
</style>
