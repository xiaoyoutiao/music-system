<template>
    <div class="userinfo-container">
        <div class="userinfo-thumbnail">
            <!-- <img :src="portrait" alt="头像"/> -->
            <BaseImage :src="portrait" round class="portrait"></BaseImage>
        </div>
        <div class="userinfo-detail-box">
            <div class="userinfo-detail">
                <slot class></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import default_portrait from '../assets/user/default_user.png'
    import BaseImage from '_components/base/BaseImage'

    export default {
      components: {
        BaseImage
      },
      data() {
        return {}
      },
      computed: {
        portrait() {
          return this.$store.state.user.portrait
        }
      }
    }
</script>

<style lang="scss">
    .userinfo-container {
        width: 80px;
        height: 60px;
        display: flex;
        align-items: center;
        position: relative;
        &:hover .userinfo-thumbnail .portrait {
            // border-color: #fff;
            transform: scale(1.1);
        }
        &:hover .userinfo-detail-box {
            display: block;
        }
        .userinfo-thumbnail {
            display: inline-block;
            position: relative;
            &:hover {
                & ~ .userinfo-detail-box {
                    display: block;
                }
            }
            .portrait {
                transition: all 0.3s ease-in-out;
                cursor: pointer;
            }
        }
        .userinfo-detail-box {
            display: none;
            padding-top: 50px;
            overflow: auto;
        }
        .userinfo-detail {
            background-color: #2b2f3a;
            color: #ccc;
            position: absolute;
            left: 0;
            top: 60px;
        }
    }
</style>
