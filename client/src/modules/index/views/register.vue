<template>
    <el-container
        direction="vertical"
        class="register-page-container"
    >
        <h1 class="register-title">
            <span class="space-line"></span>
            <span>注册</span>
            <span class="space-line"></span>
        </h1>
        <div class="register-form">
            <el-input
                v-model="account"
                placeholder="帐号"
                class="register-input"
            >
                <i
                    slot="prefix"
                    class="music-icon miconzhanghu"
                ></i>
            </el-input>
            <el-input
                v-model="password"
                type="password"
                placeholder="密码"
                class="register-input"
            >
                <i
                    slot="prefix"
                    class="music-icon miconmima"
                ></i>
            </el-input>
            <p class="router-link-box">
                <router-link
                    tag="span"
                    to="/"
                    class="router-link"
                >返回主页</router-link>
                <router-link
                    tag="span"
                    to="/login"
                    class="router-link"
                >登录</router-link>
            </p>
            <el-button
                type="primary"
                class="register-submit"
                @click="register"
            >立即注册</el-button>
        </div>
    </el-container>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      account: '',
      password: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    checkParams () {
      if (!this.account.length) {
        this.$_notify('请输入登录帐号', 'error')
        return
      }
      if (!this.password.length) {
        this.$_notify('请输入密码', 'error')
        return
      }
      return true
    },
    register () {
      if (this.checkParams()) {
        const params = {
          user: this.account,
          pwd: this.password
        }
        this.$http
          .post(this.$apis.register, params)
          .then(resData => {
            this.$_toast('注册成功', 'success')
            this.$router.replace('/login')
          })
          .catch(() => { })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
    .register-page-container {
        display: flex;
        height: 100%;
        background-image: linear-gradient(to bottom, #303133, #282c34);
        justify-content: center;
        padding: 100px 0;
    }

    .register-title {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .space-line {
        display: inline-block;
        height: 1px;
        width: 45%;
        background-color: #fff;
    }
    .register-form {
        width: 300px;
        margin-left: 50%;
        transform: translateX(-150px);
    }
    .register-input {
        margin: 15px 0 15px 0;
    }
    .register-submit {
        display: inline-block;
        width: 100%;
    }
    .router-link {
        margin: 0 15px;
        color: #409eff;
        text-decoration: none;
        cursor: pointer;
        &-box {
            display: flex;
            justify-content: space-between;
        }
    }
    .music-icon::before {
        font-size: 26px;
        line-height: 40px;
    }
</style>
