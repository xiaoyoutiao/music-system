<template>
  <div class="view-wrap">
    <div>
      <el-table :data="platformList" height="500" border style="width: 100%">
        <el-table-column prop="name" label="平台名称" width="250" />
        <el-table-column prop="value" label="设置相关值" width="180" />
        <el-table-column prop="isSupportDesc" label="是否支持" width="180">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isSupport ? 'success' : 'info'"
            >{{ scope.row.isSupportDesc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否默认" width="180">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isDefault" type="'primary'">默认</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot="header">
            <el-button size="mini" type="success" @click="handlerAdd">添加</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              v-for="btn in buttonGroup"
              :key="btn.label"
              :type="btn.label === 'Edit' ? 'primary':'danger'"
              size="mini"
              @click="btn.handler(scope.row)"
            >{{ btn.label }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPlatformList, removePlatform } from '@/api/platform'

export default {
  components: {},
  data() {
    return {
      platformList: [],
      buttonGroup: [
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
      getPlatformList().then(_data => {
        if (_data) this.platformList = _data.list
      })
    },
    handlerAdd() {
      this.$router.push({ name: 'PlatformAdd' })
    },
    handlerEdit(row) {
      this.$router.push({ name: 'PlatformEdit', params: row })
    },
    handlerDelete(row) {
      removePlatform({ _id: row._id }).then(() => {
        this.$message({ message: '删除成功', type: 'success' })
        this.getList()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
    @import url('~@/styles/global.scss');
</style>
