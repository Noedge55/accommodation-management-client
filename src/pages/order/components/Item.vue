<template>
    <div>
        <main class="position-box">
            <vue-better-scroll class="wrapper"
                               ref="scroll"
                               :scrollbar="true"
                               :pullDownRefresh="pullDownRefreshObj"
                               :pullUpLoad="pullUpLoadObj"
                               :startY="parseInt(startY)"
                               @pulling-down="onPullingDown"
                               @pulling-up="onPullingUp">
                <ul>
                    <li class="item border-bottom" v-for="item of billList" :key="item.id">
                        <template v-if="item.billType == 0">
                            <div class="itemIcon">
                                <span class="iconfont iconContent" v-html="billIcon[item.sourceId]"></span>
                            </div>
                            <div class="item-info">
                                <p class="info-title">
                                    <span>{{item.hostelName}}</span>
                                    <span class="amount">{{item.amount}}</span>
                                </p>
                                <p class="info-person">
                                    <span>入住人数：{{item.livingNum}}</span>
                                    <span class="name">联系人：{{item.personNames}}</span>
                                </p>
                                <p class="info-date"><span class="checkIn">入住：{{item.checkInDate}}</span><span class="checkOut">离店：{{item.checkOutDate}}</span></p>
                                <p class="info-time"><span>订单时间：</span>{{item.spendTime}}</p>
                            </div>
                            <router-link tag="button" :to="'/billDetail/' + item.id" class="iconfont to-button">&#xe617;</router-link>
                        </template>
                        <template v-else>
                            <div class="itemIcon">
                                <span class="iconfont iconContent" v-html="item.billType == 1 ?billIcon[9]:billIcon[10]"></span>
                            </div>
                            <div class="item-info">
                                <p class="info-title">
                                    <span>{{item.hostelName}}</span>
                                    <span class="amount">{{item.amount}}</span>
                                </p>
                                <p class="info-person">
                                    <span>入住人数：{{item.livingNum}}</span>
                                    <span class="name">联系人：{{item.personNames}}</span>
                                </p>
                                <p class="info-date"><span class="checkIn">入住：{{item.checkInDate}}</span><span class="checkOut">离店：{{item.checkOutDate}}</span></p>
                                <p class="info-time"><span>订单时间：</span>{{item.spendTime}}</p>
                            </div>
                            <router-link tag="button" :to="'/billDetail/' + item.id" class="iconfont to-button">&#xe617;</router-link>
                        </template>
                    </li>
                </ul>
            </vue-better-scroll>
        </main>
    </div>
</template>

<script>
    export default {
        name: "OrderItem",
        props:{
            billList:Array
        },
        data () {
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
                page:0,
                pullDownRefreshObj:{
                    threshold: 90,
                    stop: 40
                },
                // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
                pullUpLoadObj: {
                    threshold: 0,
                    txt: {
                        more: '加载更多',
                        noMore: '没有更多数据了'
                    }
                },
                startY: 0, // 纵轴方向初始化位置
                scrollToX: 0,
                scrollToY: 0,
                scrollToTime: 700,
                items: [],
                billIcon:this.billIcon,
            }
        },
        methods:{
            // 滚动到页面顶部
            scrollTo() {
                this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
            },
            getData() {
                this.$emit('paramsChange',this.page,1)
            },
            onPullingDown() {
                // 模拟下拉刷新
                console.log('下拉刷新')
                this.page = 0
                this.getData()
            },
            onPullingUp() {
                // 模拟上拉 加载更多数据
                console.log('上拉加载')
                this.page++
                this.getData()
            }
        },mounted() {
            this.onPullingDown()
            console.info(this.billIcon['1'].iconStyle);
        }
        // props:{
        //     hostelList: Array
        // }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .position-box {
        position: fixed;
        top: 1.86rem;
        left: 0;
        right: 0;
        bottom: 0;
    }
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
