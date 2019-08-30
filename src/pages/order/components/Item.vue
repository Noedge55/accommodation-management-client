<template>
    <div>
        <ul>
            <li class="item border-bottom" v-for="item of hostelList" :key="item.id">
                <div class="itemIcon">
                    <span class="iconfont iconContent">&#xe6ad;</span>
                </div>
                <div class="item-info">
                    <p class="info-title">
                        <span>{{item.title}}</span>
                        <span class="amount">￥100</span>
                    </p>
                    <p class="info-person">
                        <span>入住人数：{{item.livingNum}}</span>
                        <span class="name">联系人：小明</span>
                    </p>
                    <p class="info-date"><span class="checkIn">入住：2019-08-31</span><span class="checkOut">离店：2019-09-01</span></p>
                    <p class="info-time"><span>订单时间：</span>2019-08-31 10:00:00</p>
                </div>
                <router-link tag="button" :to="'/hostelDetail/' + item.id" :hostelId="item.hostelId" class="iconfont to-button">&#xe617;</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "OrderItem",
        data () {
            return {
                hostelList: [{
                    "id":1,
                    "imgUrl":"12313",
                    "title":"辣鸡",
                    "totalNum":20,
                    "livingNum":3
                },{
                    "id":2,
                    "imgUrl":"12313",
                    "title":"辣鸡",
                    "totalNum":20,
                    "livingNum":3
                }]
            }
        },
        // props:{
        //     hostelList: Array
        // }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .item
        overflow: hidden
        display: flex
        height: 1.9rem
        .itemIcon
            display inline-block
            /*line-height 1.9rem*/
            text-align center
            vertical-align center
            .iconContent
                height:1.7rem
                width 1.7rem
                padding .1rem
                font-size 1rem
        .item-info
            flex 1
            padding .1rem
            min-width 0
            .info-title
                line-height .54rem
                font-size .32rem
                ellipsis()
                .amount
                    float right
            .info-person
                line-height .4rem
                ellipsis()
                .name
                    float right
            .info-date
                line-height .4rem
                font-size .25rem
                ellipsis()
                .checkOut
                    float right
            .info-time
                line-height .4rem
                color #cacaca
                font-size .1rem
                ellipsis()
            .edit-button
                line-height .44rem
                margin-top .16rem
                color black
                padding 0 .2rem
                border-radius .06rem
        .to-button
            background white
            float right
            width 20%
            font-size 0.5rem
</style>
