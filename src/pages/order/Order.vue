<template>
    <div>
        <order-header></order-header>
        <order-filter></order-filter>
    </div>
</template>

<script>
    import OrderHeader from './components/Header'
    import OrderFilter from './components/Filter'
    export default {
        name: "Order",
        components:{OrderHeader,OrderFilter},
        mounted() {
            console.info(this.$route.params.personId + " " + this.$route.query.date)
        }
    }
</script>

<style scoped>

</style>
