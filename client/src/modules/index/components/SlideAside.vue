// 侧边栏弹出开关
<template>
    <div :class="isOpen?klass[0]:klass[1]" :style="style" @click="change">
        <i v-show="!isOpen" class="el-icon-service MusicIcon music-icon-music-player"></i>
    </div>
</template>

<script>
export default {
  name: "SlideAside",
  data() {
    return {
      klass: ["music-slide-aside-open", "music-slide-aside-close"],
      isOpen: true,
      style: ""
    };
  },
  methods: {
    change() {
      let _self = this;
      this.style = "display:none";
      this.$emit("change");
      this.isOpen = !this.isOpen;
      setTimeout(() => {
        _self.style = "display:block";
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.music-slide-aside-open {
  z-index: 100;
  width: 2.5px;
  position: absolute;
  right: 0;
  top: 15px;
  border-top: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 30px solid rgba(0, 0, 0, 0.3);
  border-left: 30px solid transparent;
  transform: rotate(-90deg);
  transition: display 0.5 ease;
  cursor: pointer;
  &:hover {
    border-bottom: 30px solid rgba($color: #ccc, $alpha: 0.3);
  }
}
.music-slide-aside-close {
  width: 2px;
  z-index: 100;
  position: fixed;
  left: -2px;
  top: 45%;
  border-top: 30px solid rgba(0, 0, 0, 0.3);
  border-bottom: 30px solid transparent;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  transform: rotate(-90deg);
  transition: display 0.5 ease;
  cursor: pointer;
  &:hover {
    border-top: 30px solid rgba(0, 0, 0, 0.6);
  }
  i {
    transform: rotate(90deg);
    font-size: 20px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.6);
    position: relative;
    right: 32px;
    bottom: 15px;
  }
}
</style>
