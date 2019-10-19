<template>
    <div class="songlist-wrap" @click="toListSongsPage">
        <BaseImage :src="songlist.cover" width="180px" height="180px" :repeat="true"/>
        <div class="songlist-title">{{songlist.title}}</div>
    </div>
</template>

<script>
    import BaseImage from '_components/base/BaseImage'

    export default {
      components: {
        BaseImage
      },
      props: {
        songlist: {
          type: Object,
          required: true
        }
      },
      data() {
        return {}
      },
      computed: {},
      watch: {},
      created() {},
      mounted() {},
      methods: {
        toListSongsPage() {
          this.$router.push({
            name: 'songlistSongs',
            params: {
              songs: this.songlist.songs,
              title: this.songlist.title
            }
          })
        }
      }
    }
</script>

<style lang='scss' scoped>
    .songlist-wrap {
        margin: 0 10px;
        box-shadow: 1px 3px 5px #e5e5e5;
        transition: all 0.35s ease-in-out;
        cursor: pointer;
        &:hover {
            transform: translateY(-10px);
            opacity: 0.65;
        }
    }
    .songlist-title {
        font-size: 18px;
        padding: 5px 0;
    }
</style>
