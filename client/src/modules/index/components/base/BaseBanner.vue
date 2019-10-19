<template>
    <h3 class="module-title">
        <i :class="[icon]"></i>
        {{ label }}
    </h3>
</template>

<script>
    export default {
      components: {},
      props: {
        label: {
          type: String,
          default: '标题'
        },
        icon: {
          type: String,
          default: ''
        }
      },
      data() {
        return {}
      },
      computed: {},
      watch: {},
      created() {},
      mounted() {},
      methods: {}
    }
</script>

<style lang='scss' scoped>
    @import url('../../styles/global.scss');
</style>
