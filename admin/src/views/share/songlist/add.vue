<template>
    <div class="view-wrap">
        <div class="form-box">
            <el-form ref="songListRef" :rules="rules" :model="songList" label-width="100px">
                <el-form-item label="歌单标题" prop="title">
                    <el-input v-model="songList.title" />
                </el-form-item>
                <el-form-item label="封面">
                    <BaseUploadSingle :src.sync="songList.cover" />
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input
                        v-model="songList.description"
                        rows="3"
                        type="textarea"
                        placeholder="描述您此时的感想"
                    />
                </el-form-item>
                <el-form-item label="是否分享" prop="isSupport">
                    <el-switch v-model="songList.isShare" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="!allowSubmit" @click="onSubmit">立即添加</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import BaseUploadSingle from '@/components/base/BaseUploadSingle'
    import { songlistAdd } from '@/api/share'

    export default {
        components: {
            BaseUploadSingle
        },
        data () {
            return {
                allowSubmit: false,
                songList: {
                    title: '',
                    cover: '',
                    description: '',
                    isShare: false
                }
            }
        },
        computed: {
            rules: () => ({
                title: [ { required: true, message: '必须填写歌单标题' } ]
            })
        },
        watch: {
            songList: {
                deep: true,
                handler: function () {
                    this.validatorForm()
                }
            }
        },
        created () { },
        mounted () { },
        methods: {
            validatorForm () {
                this.$refs[ 'songListRef' ].validate(isPass => {
                    this.allowSubmit = isPass
                })
            },
            handlerOnUpload (imageUrl) {
                this.songList.cover = imageUrl
            },
            onSubmit () {
                songlistAdd(this.songList).then(() => {
                    this.$message({ message: '添加成功', type: 'success' })
                    this.$router.back()
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import url('~@/styles/global.scss');
    .form-box {
        width: 350px;
    }
</style>
