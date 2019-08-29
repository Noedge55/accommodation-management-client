<template>
    <!--<div class="icons">-->
        <!--<div class="icon">-->
            <!--<span class="title">订单</span>-->
        <!--</div>-->
        <!--<div class="icon">-->
            <!--<span class="title">订单</span>-->
        <!--</div>-->
    <!--</div>-->
    <div>
        <table class="icons">
            <tr id="row1" class="row">
                <router-link tag="td" rowspan="2" class="first" :to="{path:'/order/' + personId,query:{date:'all'}}">
                    <div class="order">
                        <span class="iconfont order-icons">&#xe60d;</span>
                    </div>
                    <span>订单</span>
                </router-link>
                <router-link tag="td" class="others" :to="{path:'/order/' + personId,query:{date:'today'}}">今日订单</router-link>
                <router-link tag="td" class="others" :to="{path:'/order/' + personId,query:{date:'yesterday'}}">昨日订单</router-link>
            </tr>
            <tr id="row2" class="row">
                <router-link tag="td" class="others" :to="{path:'/order/' + personId,query:{date:'week'}}">本周订单</router-link>
                <router-link tag="td" class="others" :to="{path:'/order/' + personId,query:{date:'month'}}">本月订单</router-link>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "HomeOrder",
        data(){
            return {
                personId : this.$store.state.user.id
            }
        },
        methods:{
        }
    }
</script>

<style lang="stylus" scoped>
    .icons
        width 100%
        text-align center
        .row
            height .8rem
            font-size .35rem
            border-right hidden
            border-left hidden
        .first
            border-top hidden
            border-bottom hidden
            .order
                height 1rem
                span
                    font-size 0.7rem
        td
            border solid 1px #cacaca
    #row1>
        border-top hidden
        :nth-child(1)
            background #f55
        :nth-child(2)
            background #00a7f7
        :nth-child(3)
            background #7cb832
    #row2
        border-bottom hidden
        :nth-child(1)
            background #f90
        :nth-child(2)
            background #f55
</style>
