<template>
    <div>
        <home-header></home-header>
        <common-label  :title="'订单'"></common-label>
        <home-order :hostelList="hostelList"></home-order>
        <common-label :title="'我管理的旅社'"></common-label>
        <home-hostel :hostelList="hostelList"></home-hostel>
    </div>

</template>

<script>
    import HomeHeader from "./components/Header"
    import HomeHostel from "./components/Hostel"
    import HomeOrder from "./components/Order"
    import CommonLabel from "../common/label"
    export default {
        name: "Home",
        components:{HomeHeader,HomeHostel,HomeOrder,CommonLabel},
        data(){
          return{
              hostelList: []
          }
        },
        methods: {
            getHomeHotstelList(){
                let personId = this.$store.state.user.id;
                console.info(personId)
                let param = {
                    personId:personId
                }
                this.$axios.post("/am/getHomehostelList.html",this.$qs.stringify(param)).then(this.getHomeHotstelListSucc)
            },
            getHomeHotstelListSucc(res){
                console.info(res)
                if(res.data){
                    if(res.data.retCode == 0){
                        this.hostelList = res.data.result
                    }else {
                        alert(res.data.message)
                    }
                }
            }
        },
        mounted() {
            this.getHomeHotstelList()
        }
    }
</script>

<style lang="stylus" scoped>

</style>
