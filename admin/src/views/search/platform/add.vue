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
        <el-form-item>
          <el-button type="primary" :disabled="!allowSubmit" @click="onSubmit">立即添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addPlatform } from '@/api/platform'

export default {
  components: {},
  data() {
    return {
      allowSubmit: false,
      platform: {
        name: '',
        value: '',
        isSupport: false
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
      handler: function() {
        this.validatorForm()
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    validatorForm() {
      this.$refs['platformRef'].validate(isPass => {
        this.allowSubmit = isPass
      })
    },
    onSubmit() {
      addPlatform(this.platform).then(() => {
        this.$message({ message: '添加成功', type: 'success' })
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
