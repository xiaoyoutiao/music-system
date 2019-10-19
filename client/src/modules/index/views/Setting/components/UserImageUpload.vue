<template>
    <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:3000/public/image/upload"
        name="file"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handlerSuccess"
        :auto-upload="false"
        :limit="1"
        list-type="picture"
    >
        <el-button
            slot="trigger"
            size="small"
            type="primary"
        >选取文件</el-button>
        <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
        >上传到服务器</el-button>
    </el-upload>
</template>

<script>
import http from 'IndexConfig/http'
// import axios from 'axios'

export default {
  components: {},
  props: {},
  data () {
    return {
      fileList: [],
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        enctype: 'multipart/form-data'
      },
      uploadFile: null
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    uploadSectionFile (params) {
      const formData = new FormData()
      const file = this.$refs.upload.uploadFiles[0]
      if (!file) { // 若未选择文件
        alert('请选择文件')
        return
      }
      formData.append('file', file.raw)
      formData.append('name', file.name)
      http.post(
        'http://localhost:3000/public/image/upload',
        formData

      ).then(res => {
      })
    },
    handleRemove (file, fileList) {
    },
    handlePreview (file) {
    },
    handlerSuccess (res) {
      this.$_toast('上传成功', 'success')
      this.$emit('uploadSuccess', res.data.url)
    }
  }
}
</script>

<style lang='scss' scoped>
    .title {
        float: left;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .el-upload__tip {
        margin: 10px 0;
    }
    .upload-demo {
        margin: 25px 0;
    }
</style>
