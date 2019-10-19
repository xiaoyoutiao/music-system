<template>
  <div class="view-wrap">
    <div class="form-box">
      <el-form ref="userFormRef" label-width="80px" :model="userForm" :rules="userformRules">
        <el-form-item label="帐号" prop="account">
          <el-input v-model="userForm.account" @input="validatorForm" />
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="userForm.password" @input="validatorForm" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="userForm.nickName" @input="validatorForm" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!allowSubmit" @click="submit">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addAdmin } from '@/api/user'

export default {
  components: {},
  data() {
    return {
      allowSubmit: false,
      userForm: {
        account: '',
        password: '',
        nickName: ''
      }
    }
  },
  computed: {
    userformRules: () => ({
      account: [
        { required: true, message: '帐号不能为空' },
        {
          min: 5,
          max: 20,
          message: '帐号长度在 5 到 20 个字符',
          trigger: 'blur'
        }
      ],
      password: [
        { required: true, message: '登录密码不能为空' },
        {
          min: 6,
          max: 12,
          message: '帐号长度在 6 到 20 个字符',
          trigger: 'blur'
        }
      ]
    })
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    validatorForm() {
      this.$refs['userFormRef'].validate(isPass => {
        this.allowSubmit = isPass
      })
    },
    submit() {
      addAdmin(this.userForm).then(() => {
        this.$message({ message: '添加成功', type: 'success' })
        this.$refs['userFormRef'].resetFields()
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
