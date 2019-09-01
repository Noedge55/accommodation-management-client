<template>
    <div>
        <order-header></order-header>
        <order-filter v-on:paramsChange="paramsChange"></order-filter>
        <order-item v-on:paramsChange="paramsChange"></order-item>
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
                page:0
            }
        },
        components:{OrderHeader,OrderFilter,OrderItem},
        methods:{
            paramsChange(params,type){
                if(type == 0){
                    this.page = 0;
                    this.dateType = params.dateType
                    this.startDate = params.startDate
                    this.endDate = params.endDate
                }else if(type == 1){
                    this.page = params
                }
                let param = {
                    personId:this.$store.state.user.id,
                    dateType:this.dateType,
                    startDate: this.startDate,
                    endDate:this.endDate,
                    page:this.page
                }
                this.$axios.post("/am/getOrders.html",this.$qs.stringify(param)).then(this.getOrdersSucc)
            },
            getOrdersSucc(res){
                console.info(res)
                // if(res.data){
                //     if(res.data.retCode == 0){
                //         this.orderList = res.data.result
                //     }else {
                //         alert(res.data.message)
                //     }
                // }
            }
        },
        mounted() {
            console.info(this.$route.params.personId + " " + this.$route.query.date)
        }
    }
</script>

<style scoped>

</style>
