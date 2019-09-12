<template>
    <div>
        <div v-if="itemType == 0">
            <a-divider>旅社基本信息</a-divider>
            <div class="itemColumn"><span class="title">名称</span><span class="content">{{item.name}}</span></div>
            <div class="itemColumn"><span class="title">地区</span><span class="content">{{item.area}}</span></div>
            <div class="itemColumn"><span class="title">详细地址</span><span class="content">{{item.address}}</span></div>
            <div class="itemColumn"><span class="title">床位情况</span><span class="content">{{item.livingNum}} / {{item.totalNum}}</span></div>
            <a-divider>今日住房情况</a-divider>
            <a-date-picker @change="onDateChange" placeholder="请选择日期" format="YYYY-MM-DD"/>
            <div class="itemColumn" v-for="room of roomList" :key="room.id">
                <span class="title">{{room.name}}</span>
                <span class="content">{{room.livingNum}} / {{room.totalNum}}</span>
            </div>
        </div>
        <div v-else>
            <div class="itemIcon">
                <h1 class="iconfont iconContent"
                    v-html="iconStyle"></h1>
                <span class="amount" :style="returnAmountColor(item.amount)" v-text="'￥ ' + returnAmount(item.amount)"></span>
            </div>
            <div class="itemColumn"><span class="title">所属旅社</span><span class="content">{{item.hostelName}}</span></div>
            <div class="itemColumn">
                <span class="title">账单类型</span>
                <span class="content" v-text="returnBillTypeValue()"></span>
            </div>
            <div class="itemColumn"><span class="title">账单内容</span><span class="content">{{item.content}}</span></div>
            <div v-if="item.billType == 0">
                <div class="itemColumn">
                    <span class="title">支付方式</span>
                    <span class="content">{{billTypes[Number(item.sourceId) - 1].name}}</span>
                </div>
                <div class="itemColumn"><span class="title">入住人数</span><span class="content">{{item.livingNum}}</span></div>
                <div class="itemColumn"><span class="title">联系人</span><span class="content">{{item.personNames}}</span></div>
                <div class="itemColumn"><span class="title">入店时间</span><span class="content">{{item.checkInDate}}</span></div>
                <div class="itemColumn"><span class="title">离店时间</span><span class="content">{{item.checkOutDate}}</span></div>
            </div>
            <div class="itemColumn"><span class="title">支付时间</span><span class="content">{{item.spendTime}}</span></div>
            <div class="itemColumn"><span class="title">创建时间</span><span class="content">{{item.createTime}}</span></div>
        </div>
    </div>
</template>

<script>
    import eventBus from '../../../config/eventBus';
    import {Divider,DatePicker} from 'ant-design-vue'

    export default {
        name: "DetailContent",
        components:{
          ADivider:Divider,
          ADatePicker:DatePicker
        },
        props:{
            item:Object,
            itemType:String,
            roomList:Array
        },
        data() {
            return {
                isDisabled:true
            }
        },
        methods:{
            // returnItem(){
            //     let me = this
            //   return JSON.parse(JSON.stringify(me.$route.query.item))
            // },
            returnAmount(amount){
              if(amount > 0){
                  return "+" + amount.toFixed(2)
              }
              return amount.toFixed(2)
            },
            returnAmountColor(amount) {
                if (Number(amount) < 0) {
                    return {color: 'green'}
                }
            },
            returnBillTypeValue(){
                let value = "";
                switch (this.item.billType) {
                    case 0:
                        value = "入住账单"
                        break
                    case 1:
                        value = "其它收入账单"
                        break
                    default:
                        value = "支出账单"
                        break
                }
                return value
            },
            onDateChange(date,dateString){
                this.$parent.$emit('roomDateChangeHandle',dateString)
            }
        },
        computed:{
            iconStyle:function () {
                console.info(this.item.billType == 0 ? this.billIcon[this.item.sourceId]:this.item.billType == 1 ? this.billIcon[10] : this.billIcon[11])
                return this.item.billType == 0 ? this.billIcon[this.item.sourceId]:this.item.billType == 1 ? this.billIcon[10] : this.billIcon[11]
            },
        },
        created() {
            eventBus.$on('editHandle', (isEdit,command) => {
                switch (command) {
                    case 'submit':
                        console.info('submit')
                        break
                    case 'cancel':
                        // this.item = this.returnItem()
                        break
                    case 'edit':
                        console.info('edit')
                        break
                }
                if(isEdit){
                    this.isDisabled = false
                }else{
                    this.isDisabled = true
                }
            })
        },
        beforeDestroy() {
            eventBus.$off('editHandle')
        }
    }
</script>

<style lang="stylus" scoped>
    .itemIcon
        width 100%
        height 2.1rem
        text-align center
        margin-top:0.1rem
        .iconContent
            font-size 1.5rem
        .amount
            font-size 0.6rem
            font-weight bolder
    .itemColumn
        height 0.8rem
        line-height 0.8rem
        width 100%
        padding 0 0.2rem
        .title
            float left
            color #cacaca
        .content
            background: #fff
            float right
            text-align right
</style>
