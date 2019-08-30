<template>
    <div class="header">
        <div class="header-warp">
            <div class="header-left" v-show="isShowLeft" @click="back()">
                <div class="iconfont back-icon">&#xe624;</div>
            </div>
            <div class="header-title">
                {{title}}
            </div>
            <slot name="rightIcon">
                <div class="header-right" v-show="isShowRight">
                    <span class="iconfont add-icon">&#xe61e;</span>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommonHeader",
        props:{
            title:String,
            isShowLeft:Boolean,
            isShowRight:Boolean
        },
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .header
        height:$HeaderHeight
        .header-warp
            display : flex
            background: $bgColor
            color:#fff
            position: fixed
            top: 0
            right: 0
            left: 0
            line-height:$HeaderHeight
            z-index 1
            .header-left
                float: left
                min-width: 1.04rem
                position fixed
                left 0
                .back-icon
                    text-align:center
                    font-size:.4rem
            .header-title
                flex:1
                text-align center
                font-size 0.3rem
                font-weight bolder
                letter-spacing 0.1rem
                color: #333333
            .header-right
                position fixed
                right 0
                min-width:1.04rem
                float:right
                text-align:center
                color: #fff
                .add-icon
                    font-size: 0.4rem
</style>
