<template>
    <div>
        <el-dialog
            title="我的收藏夹"
            :visible.sync="show"
            width="30%"
            :before-close="close"
        >
            <div
                v-for="item in favorites"
                :key="item.id"
                class="cell"
                @click="handlerClickCell(item)"
            >
                <span>{{ item.name }}</span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
components: {},
props: {
    show: {
        type: Boolean,
        default: false
    }
},
data () {
return {}
},
computed: {
    favorites () {
        return this.$store.state.user.favorites
    }
},
watch: {},
created () {
    if (!this.$store.state.user.favorites.length) {
        this.$store.dispatch('user/USER_GET_FAVORITES')
    }
},
mounted () {
},
methods: {
    close () {
        this.$emit('update:show', false)
    },
    handlerClickCell (item) {
        this.$emit('on-picker', item)
        this.close()
    }
}
}
</script>

<style lang='scss' scoped>
    .cell {
        border-bottom: 1px solid #e1e1e1;
        padding: 15px;
        cursor: pointer;
    }
    .cell:hover {
        background-color: #ecf5ff;
    }
</style>
