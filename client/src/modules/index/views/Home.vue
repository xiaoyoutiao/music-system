<template>
    <el-container class="container">
        <el-header
            id="music-header"
            v-show="!headerHidden"
        >
            <header-comp></header-comp>
        </el-header>
        <el-container>
            <el-aside
                id="music-aside"
                :width="asideWidth"
            >
                <aside-comp></aside-comp>
                <slide-aside @change="openAside"></slide-aside>
            </el-aside>
            <el-container>
                <el-main id="music-main">
                    <router-view></router-view>
                    <!-- <main-comp></main-comp> -->
                </el-main>
                <el-footer
                    id="music-footer"
                    height="50px"
                >
                    <footer-comp></footer-comp>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
// Component
import HeaderComp from '../components/Header'
import AsideComp from '../components/Aside'
// import MainComp from '../components/Main'
import FooterComp from '../components/Footer'
import SlideAside from '../components/SlideAside'
export default {
  components: {
    HeaderComp,
    AsideComp,
    // MainComp,
    FooterComp,
    SlideAside
  },
  data () {
    return {
      asideWidth: '300px',
      headerHidden: false,
      scrollTop: 0
    }
  },
  computed: {
    wrapStyle () {
      const height = window.screen.availHeight - 147
      return {
        minHeight: height + 'px'
      }
    }
  },
  created () {
    if (localStorage.getItem('tokenId')) {
      this.$store.dispatch('user/userGetUserInfoAction')
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const scrollTop =
                    document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop < 60) {
        this.headerHidden = false
      }
      if (scrollTop > 60 && scrollTop > this.scrollTop) {
        this.headerHidden = true
      } else {
        this.headerHidden = false
      }
      this.scrollTop = scrollTop
    })
  },
  methods: {
    openAside () {
      this.asideWidth = this.asideWidth === '300px' ? '0' : '300px'
    }
  }
}
</script>

<style lang="scss" scoped>
    .container {
        height: 100vh;
    }
</style>
