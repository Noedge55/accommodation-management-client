<template>
    <div>
        <ul>
            <li class="item border-bottom" v-for="item of billList" :key="item.id">
                <div class="itemIcon">
                    <span class="iconfont iconContent"
                          v-html="item.billType == 0 ? billIcon[item.sourceId]:item.billType == 1 ? billIcon[10] : billIcon[11]"></span>
                </div>
                <div class="item-info">
                    <p class="info-title">
                        <span>{{item.hostelName}}</span>
                        <span class="amount" :style="returnAmountColor(item.amount)">{{item.amount.toFixed(2)}}</span>
                    </p>
                    <template v-if="item.billType == 0">
                        <p class="info-person">
                            <span>入住人数：{{item.livingNum}}</span>
                            <span class="name">联系人：{{item.personNames}}</span>
                        </p>
                        <p class="info-date"><span class="checkIn">入住：{{item.checkInDate}}</span><span class="checkOut">离店：{{item.checkOutDate}}</span>
                        </p>
                    </template>
                    <template v-else>
                        <p class="info-content">收支描述：{{item.content}}</p>
                    </template>
                    <p class="info-time"><span>支付时间：</span>{{item.spendTime}}</p>
                </div>
                <router-link tag="button" :to="{path:'/detail',query:{item:JSON.stringify(item),itemType:'1'}}" class="iconfont to-button">&#xe617;</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "OrderItem",
        props: {
            billList: Array
        },
        data() {
            return {
                // hostelList: [{
                //     "id":1,
                //     "imgUrl":"12313",
                //     "title":"辣鸡",
                //     "totalNum":20,
                //     "livingNum":3
                // },{
                //     "id":2,
                //     "imgUrl":"12313",
                //     "title":"辣鸡",
                //     "totalNum":20,
                //     "livingNum":3
                // }],
                page: 0,
                items: [],
                billIcon: this.billIcon,
            }
        },
        methods: {
            returnAmountColor(amount) {
                if (Number(amount) < 0) {
                    return {color: 'green'}
                }
            },
            getData() {
                this.$emit('paramsChange', this.page, 1)
            },
        }, mounted() {
        }
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
                height: 1.7rem
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

            .info-content
                height: .8rem;

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
