<template>
    <div>
        <detail-header :itemType="itemType"></detail-header>
        <detail-content :item="item" :itemType="itemType" :roomList="roomList" :checkRoomList="checkRoomList"></detail-content>
    </div>
</template>

<script>
    import DetailHeader from './components/Header'
    import DetailContent from './components/Content'
    export default {
        name: "Details",
        components:{DetailHeader,DetailContent},
        data(){
            return{
                item:this.$route.query.item,
                itemType: this.$route.query.itemType,
                roomList:[],
                checkRoomList:[],
                newRoomDate:''
            }
        },
        methods:{
            getRoomList(newDate){
                let hostelId = this.item.hostelId
                let param = {}
                if(this.itemType == '0' && hostelId){
                    param = {
                        hostelId:hostelId,
                        date:newDate
                    }
                }
                this.$axios.post("/am/getRoomList.html",this.$qs.stringify(param)).then(this.getRoomListSucc)
            },
            getRoomListSucc(res){
                console.info(res)
                if(res.data){
                    if(res.data.retCode == 0){
                        this.roomList = res.data.result
                    }else {
                        alert(res.data.message)
                    }
                }
            },
            getCheckRoomList(){
                let orderId = this.item.id;
                let param = {
                    "orderId":orderId
                }
                this.$axios.post("/am/getCheckInRoomByOrderId.html",this.$qs.stringify(param)).then(this.getCheckRoomListSucc)
            },
            getCheckRoomListSucc(res){
                console.info(res)
                if(res.data){
                    if(res.data.retCode == 0){
                        this.checkRoomList = res.data.result
                    }
                }
            }
        },
        mounted (){
            if(this.itemType == '0'){
                this.getRoomList()
            }else if(this.item.billType == '0'){
                this.getCheckRoomList()
            }
            this.$on('roomDateChangeHandle',(newDate)=>{
                this.getRoomList(newDate)
            })
        }
    }

</script>

<style scoped>

</style>
