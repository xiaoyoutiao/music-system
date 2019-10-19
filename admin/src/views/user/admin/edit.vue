<template>
  <div class="view-wrap">
    <div class="form-box">
      <el-form ref="userFormRef" label-width="80px" :model="userForm">
        <el-form-item label="是否分享" prop="isShare">
          <el-switch v-model="userForm.isShare" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { editIshare } from '@/api/user'

export default {
  components: {},
  data() {
    return {
      allowSubmit: false,
      userForm: {
        isShare: false
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.userForm.isShare = this.$route.params.isShare
  },
  mounted() {},
  methods: {
    submit() {
      editIshare({ isShare: this.userForm.isShare }).then(() => {
        this.$message({ message: '更改成功', type: 'success' })
        this.$router.back()
      })
    }
  }
}
</script>

<style lang='scss' scoped>
    @import url('~@/styles/global.scss');
    .form-box {
        width: 350px;
    }
</style>
