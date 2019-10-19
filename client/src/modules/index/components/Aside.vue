<template>
    <div>
        <music-player :defaultPic="img" :list="list" :index="playIndex"></music-player>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from "vuex";
    const { mapState } = createNamespacedHelpers("music");
    import defaultPic from "../assets/images/default.jpg";
    import MusicPlayer from "./MusicPlayer";
    export default {
        components: {
            MusicPlayer
        },
        data () {
            return {
                img: defaultPic
            };
        },
        computed: {
            list () {
                return this.$store.state.music.list
            },
            playIndex: mapState([ "playIndex" ]).playIndex
        },
        created () {
            let a = [ 1, 2, 3 ];
        }
    };
</script>
<style>
</style>
