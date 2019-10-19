<template>
    <div>
        <h3 class="module-title">个人中心</h3>
        <div class="wrap">
            <div class="form-wrap">
                <el-form
                    ref="formRef"
                    label-position="left"
                    label-width="80px"
                    :model="userForm"
                >
                    <el-form-item label="昵称">
                        <el-input v-model="userForm.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                        <div class="form-item-box">
                            <el-date-picker
                                v-model="userForm.birthday"
                                type="date"
                                :placeholder="birthdayLabel"
                                value-format="timestamp"
                                :default-value="new Date()"
                            ></el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item label="性别">
                        <div class="form-item-box">
                            <el-radio-group v-model="userForm.gender">
                                <el-radio :label="1">男生</el-radio>
                                <el-radio :label="0">女生</el-radio>
                            </el-radio-group>
                        </div>
                    </el-form-item>
                    <el-form-item label="头像">
                        <BaseUploadSingle :src.sync="userForm.portrait"></BaseUploadSingle>
                        <!-- <div class="image-wrap">
                            <img
                                v-if="userForm.portrait"
                                :src="'/' + userForm.portrait"
                                class="image-box"
                            >
                            <div v-else class="image-box image-box-not">
                                <i class="el-icon-picture-outline" style="font-size: 32px;"></i>
                            </div>
                        </div>-->
                    </el-form-item>
                    <!-- <UserImageUpload @uploadSuccess="handlerUploadSuccess"></UserImageUpload> -->
                    <el-form-item
                        size="large"
                        class="submit-box"
                    >
                        <el-button
                            type="primary"
                            @click="onSubmit"
                        >修改</el-button>
                        <el-button @click="handlerReset">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
// import UserImageUpload from './components/UserImageUpload'
import BaseUploadSingle from '_components/base/BaseUploadSingle'

export default {
  components: {
    // UserImageUpload,
    BaseUploadSingle
  },
  data () {
    return {
      birthday: '',
      userForm: {
        nickName: '',
        birthday: '',
        gender: '',
        portrait: ''
      }
    }
  },
  computed: {
    birthdayLabel () {
      return this.birthday ? this.birthday.substring(0, 10) : '选择日期'
    }
  },
  watch: {},
  created () {
    this.$http
      .get(this.$apis.userUserInfo)
      .then(res => {
        this.userForm.nickName = res.nickName
        this.userForm.portrait = res.portrait
        this.userForm.gender = res.gender
        this.birthday = res.birthday
        console.log(new Date(res.birthday))
      })
      .catch(err => {
        if (err.code === 403) {
          this.$router.replace('/login')
        }
      })
  },
  mounted () {
    console.log(this.$store)
  },
  methods: {
    onSubmit () {
      if (!this.userForm.birthday && this.birthday) { this.userForm.birthday = this.birthday }
      this.$http.post(this.$apis.userUserInfo, this.userForm).then(res => {
        this.$_toast('保存成功', 'success')
        this.$store.dispatch('user/userGetUserInfoAction')
        this.$router.push('/')
      })
    },
    handlerUploadSuccess (url) {
      this.userForm.portrait = url.replace('\\', '/')
    },
    handlerReset () {
      this.$router.back()
    }
  }
}
</script>

<style lang='scss' scoped>
    .wrap {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #fff;
    }

    .form-wrap {
        width: 400px;
        padding: 35px;
    }
    .upload-label {
        float: left;
        font-size: 14px;
        color: #606266;
        margin-top: 10px;
    }
    .submit-box {
        margin-top: 50px;
        display: flex;
        justify-content: flex-start;
    }
    .birthdayLabel {
        margin-right: 25px;
    }
    .module-title {
        text-align: left;
        align-self: flex-start;
    }
    .image-box {
        width: 80px;
        height: 80px;
        &-not {
            border: 1px solid #ccc;
            background-color: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .form-item-box {
        height: 40px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
</style>
