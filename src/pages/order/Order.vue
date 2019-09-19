<template>
    <div>
        <order-header :hostelList="hostelList"></order-header>
        <order-filter :hostelList="hostelList" :hostelIds="hostelIds" :billStatistics="billStatistics" v-on:paramsChange="paramsChange"></order-filter>
        <main class="position-box">
            <vue-better-scroll v-show="hasData"
                               class="wrapper"
                               ref="scroll"
                               :scrollbar="true"
                               :pullDownRefresh="pullDownRefreshObj"
                               :pullUpLoad="pullUpLoadObj"
                               :startY="parseInt(startY)"
                               @pulling-down="onPullingDown"
                               @pulling-up="onPullingUp">
                <order-item v-on:paramsChange="paramsChange" :billList="billList"></order-item>
            </vue-better-scroll>
            <div class="no-content" v-show="!hasData">
                暂无数据
            </div>
        </main>
    </div>
</template>

<script>
    import OrderHeader from './components/Header'
    import OrderFilter from './components/Filter'
    import OrderItem from './components/Item'
    export default {
        name: "Order",
        data(){
            return{
                hasData:true,
                hostelId:this.$route.params.personId,
                dateType:this.$route.query.date,
                startDate:'',
                endDate:'',
                page:0,
                hostelList:[],
                hostelIds:[],
                checkIds:[],
                billList:[],
                billStatistics:[{
                    0:0.00,
                    1:0.00,
                    2:0.00
                }],
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
                totalPage:0,
            }
        },
        components:{OrderHeader,OrderFilter,OrderItem},
        methods:{
            getHostelsSucc(res){
                if(res.data){
                    if(res.data.retCode == 0){
                        this.hostelList = res.data.result;
                        let ids = []
                        this.hostelList.forEach(function (value) {
                            ids.push(value.id)
                        })
                        this.hostelIds = ids
                    }
                }
            },
            paramsChange(params,type){
                if(type == 0){
                    this.page = 0;
                    this.dateType = params.dateType
                    this.startDate = params.startDate
                    this.endDate = params.endDate
                    this.checkIds = params.checkIds
                }else if(type == 1){
                    this.page = params
                }
                let param = {
                    dateType:this.dateType,
                    startDate: this.startDate,
                    endDate:this.endDate,
                    checkIds:this.checkIds.toString(),
                    page:this.page
                }
                this.$axios.post("/am/getOrders.html",this.$qs.stringify(param)).then(this.getOrdersSucc)
            },
            getOrdersSucc(res){
                let me = this;
                console.info(res)
                if(res.data){
                    if(res.data.retCode == 0){
                        this.billStatistics = res.data.result.billStatistics;
                        if(res.data.result.billList.length <= 0){
                            if(this.page == 0){
                                this.hasData = false
                            }
                            this.totalPage = this.page
                            this.$refs.scroll.forceUpdate(false)
                            return;
                        }else {
                            this.hasData = true
                        }
                        if(this.page == 0){
                            this.billList = []
                        }
                        res.data.result.billList.forEach(function (item) {
                            me.billList.push(item)
                        })
                        this.$refs.scroll.forceUpdate(true)
                    }else {
                        alert(res.data.message)
                    }
                }
            },
            // 滚动到页面顶部
            scrollTo() {
                this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
            },
            onPullingDown() {
                // 模拟下拉刷新
                console.log('下拉刷新')
                this.page = 0
                this.paramsChange(this.page,1)
            },
            onPullingUp() {
                // 模拟上拉 加载更多数据
                console.log('上拉加载')
                if(this.totalPage != 0 && this.page == this.totalPage){
                    return;
                }
                this.page++
                this.paramsChange(this.page,1)
            }
        },
        watch:{

        },
        mounted(){
            this.$axios.post("/am/getHostels.html").then(this.getHostelsSucc)
            this.onPullingDown()
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .position-box
        position: fixed;
        top: 1.86rem;
        left: 0;
        right: 0;
        bottom: 0;
        .no-content
            text-align center
            margin-top 50%
</style>
