<template>
    <div>
        <div
            class="wrap"
            v-if="historys.length"
        >
            <div class="clear">
                <span>最近播放</span>
                <span
                    class="clear-text"
                    @click="clearAllHistoryConfirm"
                >清除</span>
            </div>
            <HistoryItem
                v-for="item in historys"
                :key="item.songName"
                :history="item"
            ></HistoryItem>
            <div class="more-history">
                <el-button
                    @click="toPage('/login')"
                    size="small"
                    type="primary"
                    plain
                >更多记录</el-button>
            </div>
        </div>
        <div v-else>
            <div v-if="!isLogin">
                <h4 class="login-title">登录查看</h4>
                <el-button
                    @click="toPage('/login')"
                    size="small"
                >立即登录</el-button>
            </div>
            <div v-else>
                <p class="not-history-text">没有播放记录哦 , 快去添加几条吧</p>
            </div>
        </div>
    </div>

</template>

<script>
import HistoryItem from './HistoryItem'
export default {
components: {
    HistoryItem
},
props: {
    historys: {
        type: Array,
        default: () => []
    }
},
data () {
return {}
},
computed: {
    isLogin () {
        return !!localStorage.getItem('tokenId')
    }
},
watch: {},
created () {
},
mounted () {},
methods: {
    toPage (path) {
        this.$router.push(path)
    },
    clearAllHistoryConfirm () {
        const option = { confirmButtonText: '确定', cancelButtonText: '取消', type: '' }
        this.$confirm('清空之后就什么都没有了哦~', '' , option).then(this.clearAllHistory)
    },
    clearAllHistory () {
        this.$http.post(this.$apis.userHistoryClearAll).then(() => {
            this.$_toast('清除成功', 'success')
            this.$store.dispatch('music/getHistory')
        })
    }
}
}
</script>

<style lang='scss' scoped>
    .login-title {
        color: #2c3e50;
        margin-left: 15px;
    }
    .clear {
        color: #ababab;
        position: relative;
        &-text {
            position: absolute;
            top: 0;
            right: 10px;
            cursor: pointer;
            color: #56b6c2;
        }
    }
    .more-history {
        text-align: right;
    }
    .not-history-text {
        font-size: 12px;
        color: #2c3e50;
    }
</style>
