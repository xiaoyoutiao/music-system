<template>
    <div class="edit-wrap">
        <h3 class="module-title">收藏编辑</h3>
        <div class="form-wrap">
            <el-form :model="formData" ref="formRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name" :rules="nameRules">
                    <el-input type="text" size="small" v-model="formData.name" autocomplete="off"></el-input>
                </el-form-item>
                <div class="image-wrap">
                    <!-- <BaseImage :src="formData.cover" width="150px" height="150px"></BaseImage> -->
                    <BaseUploadSingle :src.sync="formData.cover"></BaseUploadSingle>
                </div>
                <!-- <UserImageUpload @uploadSuccess="handlerUploadSuccess"></UserImageUpload> -->
                <el-form-item style="margin-top: 50px;">
                    <el-button type="primary" @click="handlersubmitForm">提交</el-button>
                    <el-button @click="handlerResetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
// import BaseImage from '_components/base/BaseImage'
import BaseUploadSingle from '_components/base/BaseUploadSingle'
// import UserImageUpload from '../Setting/components/UserImageUpload'

export default {
  components: {
    // BaseImage,
    // UserImageUpload,
    BaseUploadSingle
  },
  data () {
    return {
      formData: {
        id: '',
        name: '',
        cover: ''
      },
      nameRules: [{ required: true, message: '收藏夹名称不能为空' }]
    }
  },
  computed: {
    imageStyle () {
      return {
        backgroundImage: url('"' + this.formData.cover + '"')
      }
    }
  },
  watch: {},
  created () {
    const params = this.$route.params
    if (!params.id) this.$router.back()
    this.formData.id = params.id
    this.formData.name = params.name
    this.formData.cover = params.cover
  },
  mounted () { },
  methods: {
    handlersubmitForm () {
      if (!this.formData.id) return
      this.$http
        .post(this.$apis.userFavoritesUpdate, this.formData)
        .then(res => {
          this.$router.back()
        })
    },
    handlerResetForm () {
      this.$refs['formRef'].resetFields()
    },
    handlerUploadSuccess (url) {
      this.formData.cover = url.replace('\\', '/')
    }
  }
}
</script>

<style lang='scss' scoped>
    @import url('../../styles/global.scss');
    .form-wrap {
        width: 450px;
    }
    .image-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
