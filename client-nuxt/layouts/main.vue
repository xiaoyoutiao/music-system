<template>
    <div class="main-layout-view">
        <header class="header-view">
            <el-menu
                class="header-menu"
                :default-active="activeIndex"
                mode="horizontal"
                :unique-opened="true"
            >
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-menu-item index="2">处理中心</el-menu-item>
                <el-menu-item index="3">处理中心</el-menu-item>
                <el-menu-item index="4">处理中心</el-menu-item>
                <el-menu-item class="last-menu-item" index="5"
                    >处理中心</el-menu-item
                >
            </el-menu>
        </header>
        <nuxt />
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            activeIndex: 0
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.header-menu {
    display: flex;
}
.last-menu-item {
    margin-left: auto;
}
</style>
