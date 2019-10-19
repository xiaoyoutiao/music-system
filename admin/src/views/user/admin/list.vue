<template>
  <div class="view-wrap">
    <div>
      <el-table :data="adminList" height="500" border style="width: 100%">
        <el-table-column prop="id" label="帐号" width="250" />
        <el-table-column prop="account" label="帐号" width="180" />
        <el-table-column prop="nickName" label="昵称" width="180" />
        <el-table-column prop="isShare" label="是否分享" width="180">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.isShare"
              type="primary"
            >{{ scope.row.isShare ? '分享' : '' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="isShare" label="是否分享" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="toEditPage(scope.row.isShare)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAdminList } from '@/api/user'

export default {
  components: {},
  data() {
    return {
      adminList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    getAdminList().then(_data => {
      if (_data) this.adminList = _data.list
    })
  },
  mounted() {},
  methods: {
    toEditPage(isShare) {
      this.$router.push({ name: 'UserAdminEdit', params: { isShare: isShare }})
    }
  }
}
</script>

<style lang='scss' scoped>
    @import url('~@/styles/global.scss');
</style>
