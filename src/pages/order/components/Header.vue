<template>
    <div>
        <div class="header">
            <div class="header-left" @click="back()">
                <div class="iconfont back-icon">&#xe624;</div>
            </div>
            <div class="header-title">
                入住订单
            </div>
            <router-link to="/addOrder">
                <div class="header-right">
                    <span class="iconfont add-icon">&#xe61e;</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderHeader",
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
        display : flex
        line-height:$HeaderHeight
        background: $bgColor
        color:#fff
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
