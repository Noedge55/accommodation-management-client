<template>
    <div>
        <order-header></order-header>
        <order-filter v-on:paramsChange="paramsChange"></order-filter>
        <order-item></order-item>
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
                dateType:this.$route.query.date
            }
        },
        components:{OrderHeader,OrderFilter,OrderItem},
        methods:{
            paramsChange(params){
                console.info("params" + params.dateType)
            }
        },
        mounted() {
            console.info(this.$route.params.personId + " " + this.$route.query.date)
        }
    }
</script>

<style scoped>

</style>
