<template>
    <div class="favorites-wrap">
        <el-table :data="list" style="width: 75%" :highlight-current-row="false" size="mini">
            <el-table-column type="index" label="序号" width="180"></el-table-column>
            <el-table-column prop="name" label="名称" width="180"></el-table-column>
            <el-table-column label="封面" width="80px">
                <template slot-scope="scope">
                    <el-image class="image" :src="scope.row.cover" fit="cover"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot="header">
                    <el-button size="mini" type="primary" @click="handlerAddPrompt">添加收藏夹</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import BaseImage from '_components/base/BaseImage'

    export default {
        components: {
            BaseImage
        },
        props: {
            list: {
                type: Array,
                required: true
            }
        },
        data () {
            return {}
        },
        computed: {},
        watch: {},
        created () { },
        mounted () { },
        methods: {
            handleCheck (index, row) {
                this.$emit('clickCheck', row)
            },
            handleEdit (index, row) {
                this.$emit('clickEdit', row)
            },
            handleDelete (index, row) {
                this.$emit('clickDelete', row)
            },
            handlerAddPrompt () {
                this.$emit('clickAdd')
            }
        }
    }
</script>

<style lang='scss' scoped>
    .image {
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }
</style>
