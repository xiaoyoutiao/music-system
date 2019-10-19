<template>
    <el-row>
        <el-col :span="3" :offset="21">
            <span class="music-declaration" @click="ShowMessageBox">声明</span>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Footer",
        methods: {
            ShowMessageBox: function (e) {
                this.$alert(
                    `
        <div class="declaration-box">
            <p>本站音频文件来自各网站接口，本站不会修改任何音频文件</p>
            <p>音频版权来自各网站，本站只提供数据查询服务，不提供任何音频存储和贩卖服务</p>
        </div>
        `,
                    "本站声明",
                    {
                        dangerouslyUseHTMLString: true,
                        showConfirmButton: false
                    }
                );
            }
        }
    };
</script>

