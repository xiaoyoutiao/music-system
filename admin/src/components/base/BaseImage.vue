<template>
  <div class="image-wrap">
    <!-- <img
            v-if="src"
            :src="src"
            class="image-box"
            :style="imageStyle"
        >-->
    <div v-if="src" class="image-box" :style="imageStyle" />
    <div v-else class="image-box image-box-not" :style="imageStyle">
      <i class="el-icon-picture-outline" style="font-size: 32px;" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50px'
    },
    height: {
      type: String,
      default: '50px'
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    imageStyle() {
      return {
        width: this.width,
        height: this.height,
        backgroundImage: `url('${this.src}')`,
        borderRadius: this.round ? '50%' : '0'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
    .image-box {
        // width: 50px;
        // height: 50px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% auto;
        &-not {
            border: 1px solid #ccc;
            background-color: #f5f7fa;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
