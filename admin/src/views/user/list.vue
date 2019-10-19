<template>
  <div class="view-wrap">
    <div>
      <el-table :data="userList" height="500" border style="width: 100%">
        <el-table-column prop="id" label="id" width="250" />
        <el-table-column prop="account" label="帐号" width="180" />
        <el-table-column prop="nickName" label="昵称" width="180" />
        <el-table-column prop="genderDesc" label="性别" width="180" />
        <el-table-column prop="favoritesCount" label="歌单数量" width="180" />
        <el-table-column prop="historyCount" label="搜索数量" width="180" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  components: {},
  data() {
    return {
      userList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    getUserList().then(_data => {
      if (_data) this.userList = _data.list
    })
  },
  mounted() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
    @import url('~@/styles/global.scss');
</style>
