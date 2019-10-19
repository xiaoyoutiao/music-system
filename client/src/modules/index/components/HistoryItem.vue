<template>
    <div class="wrap" @click="emitClick">
        <img :src="history.album" alt="专辑图片" class="image">
        <span>{{ history.songname | omit(15)}}</span>
    </div>
</template>

<script>
export default {
components: {},
props: {
    history: {
        type: Object,
        required: true
    }
},
data () {
return {}
},
computed: {},
watch: {},
created () {},
mounted () {},
filters: {
  omit (value, max) {
      return value.length > max ? value.slice(0, max) + '...' : value
  }
},
methods: {
    emitClick () {
        this.$emit('clickItem')
    }
}
}
</script>

<style lang='scss' scoped>
.wrap {
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.image {
    width: 20px;
    height: 20px;
    margin: 0 10px;
}
</style>
