<template>
    <div>
        <order-header></order-header>
    </div>
</template>

<script>
    import OrderHeader from './components/Header'
    export default {
        name: "Order",
        components:{OrderHeader},
        mounted() {
            console.info(this.$route.params.personId + " " + this.$route.query.date)
        }
    }
</script>

<style scoped>

</style>
