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
        methods: {
            getHomeHotstelList(){
                let personId = JSON.stringify(sessionStorage.getItem("user")).id
                let param = {
                    personId:personId
                }
                this.$axios.post("/am/getHomehotelList.html",this.$qs.stringify(param)).then(this.getHomeHotstelListSucc)
            },
            getHomeHotstelListSucc(res){
                console.info(res)
            }
        },
        mounted() {
            this.getHomeHotstelList()
        }
    }
</script>

<style lang="stylus" scoped>

</style>
