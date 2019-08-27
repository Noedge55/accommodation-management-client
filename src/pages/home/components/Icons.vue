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
                <td rowspan="2" class="first">
                    <div class="order">
                        <span class="iconfont order-icons">&#xe60d;</span>
                    </div>
                    <span>订单</span>
                </td>
                <td class="others">本月订单</td>
                <td class="others">本周订单</td>
            </tr>
            <tr id="row2" class="row">
                <td class="others">昨日订单</td>
                <td class="others">今日订单</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "HomeIcons"
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
