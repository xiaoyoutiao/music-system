<template>
  <div class="view-wrap">
    <div class="form-box">
      <el-form ref="platformRef" :rules="rules" :model="platform" label-width="100px">
        <el-form-item label="平台名称" prop="name">
          <el-input v-model="platform.name" />
        </el-form-item>
        <el-form-item label="平台参数值" prop="value">
          <el-input v-model="platform.value" />
        </el-form-item>
        <el-form-item label="是否支持" prop="isSupport">
          <el-switch v-model="platform.isSupport" />
        </el-form-item>
        <el-form-item label="是否默认" prop="isDefault">
          <el-switch v-model="platform.isDefault" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!allowSubmit" @click="onSubmit">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updatePlatform } from '@/api/platform'

export default {
  components: {},
  data() {
    return {
      allowSubmit: false,
      platform: {
        _id: '',
        name: '',
        value: '',
        isSupport: false,
        isDefault: false
      }
    }
  },
  computed: {
    rules: () => ({
      name: [{ required: true, message: '必须填写平台名称' }],
      value: [{ required: true, message: '必须填写平台参数值' }]
    })
  },
  watch: {
    platform: {
      deep: true,
      handler: function(val, oldVal) {
        this.validatorForm()
      }
    }
  },
  created() {
    const routerParams = this.$route.params
    this.platform._id = routerParams._id
    this.platform.name = routerParams.name
    this.platform.value = routerParams.value
    this.platform.isSupport = routerParams.isSupport
    this.platform.isDefault = routerParams.isDefault
  },
  mounted() {},
  methods: {
    validatorForm() {
      this.$refs['platformRef'].validate(isPass => {
        this.allowSubmit = isPass
      })
    },
    onSubmit() {
      updatePlatform(this.platform).then(() => {
        this.$message({ message: '更新成功', type: 'success' })
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
