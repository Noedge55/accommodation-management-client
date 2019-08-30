<template>
    <div>
        <order-header></order-header>
        <order-filter></order-filter>
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
                data:this.$route.query.date
            }
        },
        components:{OrderHeader,OrderFilter,OrderItem},
        mounted() {
            console.info(this.$route.params.personId + " " + this.$route.query.date)
        }
    }
</script>

<style scoped>

</style>
