<template>
    <el-container
        direction="vertical"
        class="login-page-container"
    >
        <h1 class="login-title">欢迎登录</h1>
        <div class="login-form">
            <el-input
                v-model="account"
                placeholder="帐号"
                class="login-input"
            >
                <i
                    slot="prefix"
                    class="music-icon miconzhanghu"
                ></i>
            </el-input>
            <el-input
                v-model="password"
                placeholder="密码"
                class="login-input"
            >
                <i
                    slot="prefix"
                    class="music-icon miconmima"
                ></i>
            </el-input>
            <p class="router-link-box">
                <router-link
                    tag="a"
                    to="/"
                    class="router-link"
                >
                    <a>返回主页</a>
                </router-link>
                <router-link
                    tag="a"
                    to="/register"
                    class="router-link"
                >
                    <a>注册</a>
                </router-link>
            </p>
            <el-button
                type="primary"
                class="login-submit"
                @click="login"
            >登录</el-button>
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
  computed: {
    enableSubmit () {
      return this.account.length && this.password.length
    }
  },
  watch: {
  },
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
    async login () {
      if (this.checkParams()) {
        const params = {
          u: this.account,
          p: this.password
        }
        const data = await this.$http.post(this.$apis.login, params)
        if (data.tokenId) {
          localStorage.setItem('tokenId', data.tokenId)
          this.$_toast('登录成功', 'success')
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
    .login-page-container {
        display: flex;
        height: 100%;
        background-image: linear-gradient(to bottom, #303133, #282c34);
        justify-content: center;
        padding: 100px 0;
    }
    .login-title {
        color: #fff;
        text-align: center;
    }
    .login-form {
        width: 300px;
        // margin-top: 100px;
        margin-left: 50%;
        transform: translateX(-150px);
    }
    .login-input {
        margin: 15px 0 15px 0;
    }
    .login-submit {
        display: inline-block;
        width: 100%;
    }
    .router-link {
        margin: 0 15px;
        color: #409eff;
        text-decoration: none;
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
