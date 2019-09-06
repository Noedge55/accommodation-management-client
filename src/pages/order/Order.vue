<template>
    <div>
        <order-header></order-header>
        <order-filter :hostelList="hostelList" :hostelIds="hostelIds" :billStatistics="billStatistics" v-on:paramsChange="paramsChange"></order-filter>
        <order-item v-on:paramsChange="paramsChange" :billList="billList"></order-item>
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
                console.info(res)
                if(res.data){
                    if(res.data.retCode == 0){
                        this.billList = res.data.result.billList;
                        this.billStatistics = res.data.result.billStatistics;
                    }else {
                        alert(res.data.message)
                    }
                }
            }
        },
        mounted(){
            this.$axios.post("/am/getHostels.html").then(this.getHostelsSucc)
        }
    }
</script>

<style scoped>

</style>
