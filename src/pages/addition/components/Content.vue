<template>
    <div>
        <div v-if="itemType == 0">
            <input v-model="name" class="inputContent" placeholder="旅社名称"/>
            <a-divider class="divider"/>
            <a-cascader v-model="area" class="areaContent" :options="locationOptions" :loadData="loadData" placeholder="选择区域" size="large" changeOnSelect/>
            <a-divider class="divider"/>
            <input v-model="address" class="inputContent" placeholder="详细地址"/>
            <a-divider class="divider"/>
        </div>
        <div v-else-if="itemType == 1">
            <input v-model="name" class="inputContent" placeholder="房间名称"/>
            <a-divider class="divider"/>
            <div class="inputContent">
                床位总数：<a-input-number :min="1" v-model="totalNum"></a-input-number>
            </div>
            <a-divider class="divider"/>
        </div>
        <div v-else-if="itemType == 2">
            <div class="chooseContent">
                <a-select class="chooseLeft" placeholder="请选择旅社" @change="orderChooseHostelHandleChange">
                    <a-option v-for="hostelItem of allHostelList" :key="hostelItem.id" :value="hostelItem.id">{{hostelItem.name}}</a-option>
                </a-select>
                <a-select class="chooseRight" placeholder="请选择账单类型" @change="orderChooseBillTypeHandleChange">
                    <a-option value="0">入住账单</a-option>
                    <a-option value="1">其它收入账单</a-option>
                    <a-option value="2">支出账单</a-option>
                </a-select>
            </div>
            <a-divider class="divider"/>
            <div v-if="billType == 0">
                <div class="chooseContent">
                    <a-select class="chooseLeft" placeholder="选择入住来源" @change="orderChooseSourceHandleChange">
                        <a-option v-for="hostelItem of checkInSources" :key="hostelItem.value" :value="hostelItem.value">{{hostelItem.name}}</a-option>
                    </a-select>
                </div>
                <a-divider class="divider"/>
                <div class="inputContent">
                    入住人数：<a-input-number :min="1" v-model="orderLivingNum"></a-input-number>
                </div>
                <a-divider class="divider"/>
                <input v-model="orderPersonNames" class="inputContent" placeholder="联系人"/>
                <a-divider class="divider"/>
                <div class="chooseContent">
                    <a-date-picker class="chooseLeft"
                            :disabledDate="disabledStartDate"
                            format="YYYY-MM-DD"
                            v-model="orderCheckInDate"
                            placeholder="入住日期"
                            @openChange="handleStartOpenChange"
                    />
                    <a-date-picker class="chooseRight"
                            :disabledDate="disabledEndDate"
                            format="YYYY-MM-DD"
                            placeholder="离店日期"
                            v-model="orderCheckOutDate"
                            :open="endOpen"
                            @openChange="handleEndOpenChange"
                    />
                </div>
                <a-divider class="divider"/>
            </div>
            <div v-else>
                <input v-model="billContent" class="inputContent" placeholder="账单详情"/>
                <a-divider class="divider"/>
            </div>
            <div class="chooseContent">
                <a-date-picker class="chooseLeft" @change="onSpendTimeChange" placeholder="输入支付时间" format="YYYY-MM-DD HH:mm:ss" showTime/>
            </div>
            <a-divider class="divider"/>
            <div class="inputContent">
                金额：<a-input-number :step="0.01" v-model="amount"></a-input-number>
            </div>
            <div v-show="orderCheckOutDate && orderCheckInDate && billHostelId">
                <a-divider class="divider">入住安排</a-divider>
                <div class="inputContent">
                    <span>男生4人间：</span>
                    <a-input-number :min="0"></a-input-number>
                    <span style="float: right">剩余床位：2</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Divider,Cascader,Modal,InputNumber,Select,DatePicker} from 'ant-design-vue'
    import {province} from '../../../assets/location/province.js'
    import {city} from '../../../assets/location/city.js'
    import {county} from '../../../assets/location/county.js'
    import {town} from '../../../assets/location/town.js'
    import eventBus from '../../../config/eventBus'
    const {Option} = Select
    export default {
        name: "AdditionContent",
        components:{
            ADivider:Divider,
            ACascader:Cascader,
            AInputNumber:InputNumber,
            ASelect:Select,
            AOption:Option,
            ADatePicker:DatePicker,
        },
        data() {
            return {
                name:"",//名称
                itemType:this.$route.query.itemType,
                itemId:this.$route.query.itemId,
                isDisabled:true,
                //添加旅社的变量
                area:[],//旅社所在区域
                address:"",//旅社地址
                locationOptions:this.returnProvinceData(),
                //添加房间的变量
                totalNum:"",//房间总床位
                //添加账单的变量
                endOpen: false,
                checkInSources:this.checkInSources,
                billHostelId:"",
                billType:"",
                orderSourceId:"",
                orderPersonNames:"",
                orderLivingNum:0,
                orderCheckInDate:null,
                orderCheckOutDate:null,
                roomList:"",
                billSpendTime:"",
                billContent:"",
                amount:0,
                checkInRoomObj:null
            }
        },
        methods:{
            onCheckInRoomNumChange(value){
                this.checkInRoomObj.set(value,value)
            },
            onSpendTimeChange(moment,timeStr){
                this.billSpendTime = timeStr
            },
            orderChooseHostelHandleChange(value){
                this.billHostelId = value
            },
            orderChooseBillTypeHandleChange(value){
                this.billType = value
            },
            orderChooseSourceHandleChange(value){
                this.orderSourceId = value
            },
            disabledStartDate (orderCheckInDate) {
                const orderCheckOutDate = this.orderCheckOutDate;
                if (!orderCheckInDate || !orderCheckOutDate) {
                    return false;
                }
                return orderCheckInDate.valueOf() > orderCheckOutDate.valueOf();
            },
            disabledEndDate (orderCheckOutDate) {
                const orderCheckInDate = this.orderCheckInDate;
                if (!orderCheckOutDate || !orderCheckInDate) {
                    return false;
                }
                return orderCheckInDate.valueOf() >= orderCheckOutDate.valueOf();
            },
            handleStartOpenChange (open) {
                if (!open) {
                    this.endOpen = true;
                }
            },
            handleEndOpenChange (open) {
                this.endOpen = open;
            },
            loadData(selectedOptions) {
                const targetOption = selectedOptions[selectedOptions.length - 1];
                targetOption.loading = true;
                let child = []
                let type = targetOption.type
                switch (type) {
                    case 0:
                        child = city[targetOption.id]
                        break
                    case 1:
                        child = county[targetOption.id]
                        break
                    case 2:
                        child = town[targetOption.id]
                        break
                }
                type++
                targetOption.loading = false;
                let list = []
                if(!child){
                    targetOption.isLeaf = true
                    return
                }
                child.forEach((item)=>{
                    let tempObj = {}
                    tempObj.id = item.id
                    tempObj.value = item.name
                    tempObj.label = item.name
                    if(type < 3 && child.length > 0){
                        tempObj.isLeaf = false
                    }
                    tempObj.type = type
                    list.push(tempObj)
                })

                targetOption.children = list
                this.locationOptions = [...this.locationOptions]
            },
            errorModal(content){
                Modal.error({
                    title: '参数错误',
                    content: content,
                });
            },
            addHostel(){
                if(!this.name){
                    this.errorModal("名称不能为空")
                    return
                }
                if (this.area.length <= 0){
                    this.errorModal("区域不能为空");
                    return;
                }
                if(!this.address){
                    this.errorModal("详细地址不能为空")
                    return;
                }
                let areaStr = "";
                this.area.forEach((item)=>{
                    areaStr += item
                })

                let param = {
                    name:this.name,
                    area:areaStr,
                    address: this.address
                }
                this.$axios.post('/am/addHostel.html',this.$qs.stringify(param)).then(this.addHostelSucc)
            },
            addHostelSucc(res){
                if(res.data){
                    if(res.data.retCode == 0){
                        alert("添加旅社成功")
                        this.$router.go(-1)
                    }else {
                        alert(res.data.message)
                    }
                }
            },
            addRoom(){
                if(!this.name){
                    this.errorModal("名称不能为空")
                    return
                }
                if(!this.totalNum && this.totalNum <= 0){
                    this.errorModal("床位数不能为空且必须为大于0的整数")
                    return
                }
                if(!this.itemId){
                    this.errorModal("旅社id不能为空")
                }
                let param = {
                    hostelId:this.itemId,
                    name:this.name,
                    totalNum:this.totalNum
                }
                this.$axios.post('/am/addRoom.html',this.$qs.stringify(param)).then(this.addRoomSucc)
            },
            addRoomSucc(res){
                if(res.data){
                    if(res.data.retCode == 0){
                        alert("添加房间成功")
                        this.$router.go(-1)
                    }else {
                        alert(res.data.message)
                    }
                }
            },
            addBill(){
                if (!this.billHostelId){
                    this.errorModal("旅社id不能为空")
                }
                if (!this.billContent){
                    this.errorModal("账单内容不能为空")
                }
                if (!this.billSpendTime){
                    this.errorModal("账单支付时间不能为空")
                }
                if(!this.amount){
                    this.errorModal("金额不能为空")
                }
                if(!this.billType){
                    this.errorModal("账单类型不能为空 ")
                }
                if(this.billType == 0){
                    if(this.orderLivingNum <= 0 && !Number.isInteger(this.orderLivingNum)){
                        this.errorModal("入住人数必须为大于0的整数")
                    }
                }
            },
            returnProvinceData(){
                let proList = []
                province.forEach((item)=>{
                    let tempObj = {}
                    tempObj.id = item.id
                    tempObj.value = item.name
                    tempObj.label = item.name
                    tempObj.isLeaf = false
                    tempObj.type = 0
                    proList.push(tempObj)
                })
                return proList
            },
            getRoomMaxCanLivingNum(){
                if(this.itemType == 2 && this.billType == 0){
                    if(this.billHostelId && this.orderCheckInDate && this.orderCheckOutDate){
                        let param = {}
                        param = {
                            hostelId:this.billHostelId,
                            checkInDate:this.orderCheckInDate.format("YYYY-MM-DD"),
                            checkOutDate:this.orderCheckOutDate.format("YYYY-MM-DD")
                        }
                        this.$axios.post("/am/getHostelCanLiving.html",this.$qs.stringify(param)).then(this.getRoomMaxCanLivingNumSucc)
                    }
                }
            },
            getRoomMaxCanLivingNumSucc(res){
                console.info(res)
            }
        },
        computed:{
            // iconStyle:function () {
            //     console.info(this.item.billType == 0 ? this.billIcon[this.item.sourceId]:this.item.billType == 1 ? this.billIcon[10] : this.billIcon[11])
            //     return this.item.billType == 0 ? this.billIcon[this.item.sourceId]:this.item.billType == 1 ? this.billIcon[10] : this.billIcon[11]
            // },
            allHostelList:function () {
                let res = ""
                if(this.$route.query.hostelList){
                    res = JSON.parse(this.$route.query.hostelList)
                }
                return res
            }
        },
        mounted(){
            let me = this;
            eventBus.$on('header-right-click-handle',()=>{
                switch (me.itemType) {
                    case 0:
                        me.addHostel()
                        break
                    case 1:
                        me.addRoom();
                        break
                    case 2:
                        me.addBill();
                        break
                    default:
                        alert("itemType 不能为空")
                }
            })
        },
        watch:{
            orderCheckInDate:function(){
                this.getRoomMaxCanLivingNum()
            },
            orderCheckOutDate:function () {
                this.getRoomMaxCanLivingNum()
            },
            billHostelId:function () {
                this.getRoomMaxCanLivingNum()
            }
        },
        created() {
        },
        beforeDestroy() {
            eventBus.$off('header-right-click-handle')
        }
    }
</script>

<style lang="stylus" scoped>
    .inputContent
        width 100%
        line-height 0.8rem
        padding 0.2rem
    .chooseContent
        width 100%
        height 0.9rem
        padding 0.2rem
        .chooseLeft
            width 40%
        .chooseRight
            width 40%
            float right
    .divider
        margin 0.2rem 0
    .areaContent
        max-width 100%
        min-width 95%
        margin 0.2rem
</style>
