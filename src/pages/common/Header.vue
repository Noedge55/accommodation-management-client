<template>
    <div>
        <div class="header">
            <div class="header-warp">
                <div class="header-left">
                    <div class="iconfont back-icon"></div>
                </div>
                <div class="header-title">
                    主页
                </div>
                <router-link to="/addHotel">
                    <div class="header-right">
                        <span class="iconfont add-icon">&#xe61e;</span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CommonHeader",
        props:{
            title:String
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
            .header-left
                float: left
                min-width: 1.04rem
                .back-icon
                    text-align:center
                    font-size:.4rem
            .header-title
                flex:1
                text-align center
                font-size 0.3rem
                color: #333333
                font-weight bolder
                letter-spacing 0.1rem
            .header-right
                min-width:1.04rem
                float:right
                text-align:center
                color: #fff
                .add-icon
                    font-size: 0.4rem
</style>
