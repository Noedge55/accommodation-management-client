<template>
    <div>
        <home-header></home-header>
        <div>this is Home</div>
    </div>

</template>

<script>
    import HomeHeader from "./components/Header"
    export default {
        name: "Home",
        components:{HomeHeader},
        mounted() {
        }
    }
</script>

<style scoped>

</style>
