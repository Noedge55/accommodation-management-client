<template>
    <div>
        <home-header></home-header>
        <common-label :title="'订单'"></common-label>
        <home-icons></home-icons>
        <common-label :title="'我管理的旅社'"></common-label>
        <home-hostel></home-hostel>
    </div>

</template>

<script>
    import HomeHeader from "./components/Header"
    import HomeHostel from "./components/Hostel"
    import HomeIcons from "./components/Icons"
    import CommonLabel from "../common/label"
    export default {
        name: "Home",
        components:{HomeHeader,HomeHostel,HomeIcons,CommonLabel},
        mounted() {
        }
    }
</script>

<style lang="stylus" scoped>

</style>
