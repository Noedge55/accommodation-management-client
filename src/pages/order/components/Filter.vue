<template>
    <div class="filter-container">
        <div class="filter">
            <div class="title" @click="showHandle()">
                <span class="content">
                    <span>{{dateTypeValue}}</span>
                    <span class="iconfont arrow">&#xe64a;</span>
                </span>
            </div>
            <div class="totalAmount">
                <p>收入：{{(billStatistics[0]['0'] + billStatistics[0]['1']).toFixed(2)}}</p>
                <p>支出：{{billStatistics[0]['2'].toFixed(2)}}</p>
            </div>
        </div>
        <transition name="slide-fade">
            <div class="filter-details" v-if="isShow" >
                <div class="details-header">
                    选择时间
                </div>
                <div class="title">
                    <a-select defaultValue="all" style="width: 120px" v-model="dateType" >
                        <a-select-option :value="item.key" :key="item.id" v-for="item in dateTypeList">
                            {{item.value}}
                        </a-select-option>
                    </a-select>
                </div>
                <a-checkbox-group class="aCheckGroup" :defaultValue="hostelIds" @change="onChange">
                    <a-row>
                        <a-col :span="12" class="aCheckBok" :key="item.id" v-for="item in hostelList">
                            <a-checkbox :value="item.id">{{item.name}}</a-checkbox>
                        </a-col>
                    </a-row>
                </a-checkbox-group>
                <div class="date-picker" v-if="isByDay">
                    <a-date-picker
                            :disabledDate="disabledStartDate"
                            format="YYYY-MM-DD"
                            v-model="startValue"
                            placeholder="开始时间"
                            @openChange="handleStartOpenChange"
                    />
                    ~
                    <a-date-picker
                            :disabledDate="disabledEndDate"
                            format="YYYY-MM-DD"
                            placeholder="结束时间"
                            v-model="endValue"
                            :open="endOpen"
                            @openChange="handleEndOpenChange"
                    />

                </div>
                <div class="my-button">
                    <a-button class="cancel-button" @click="cancelHandle()">取消</a-button>
                    <a-button class="ok-button" @click="okHandle()">完成</a-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    import { DatePicker,Select,Button,Checkbox,Row,Col } from 'ant-design-vue';
    moment.locale('zh-cn');
    const { Option } = Select;
    const { Group } = Checkbox;
    export default {
        name: "OrderFilter",
        components:{
            ADatePicker:DatePicker,
            ASelect:Select,
            ASelectOption:Option,
            AButton:Button,
            ACheckboxGroup:Group,
            ACheckbox:Checkbox,
            ARow:Row,
            ACol:Col
        },
        props:{
            hostelList:Array,
            hostelIds:Array,
            billStatistics:Array
        },
        data(){
            return{
                isShow:false,
                moment,
                startValue: null,
                endValue: null,
                endOpen: false,
                dateType:this.$route.query.date?this.$route.query.date:'all',
                dateTypeList:[
                    {
                        id : 0,
                        key : 'all',
                        value : '全部时间'
                    },{
                        id : 1,
                        key : 'today',
                        value : '今日'
                    },{
                        id : 2,
                        key : 'thisWeek',
                        value : '本周'
                    },{
                        id : 3,
                        key : 'thisMonth',
                        value : '本月'
                    },{
                        id : 4,
                        key : 'byDay',
                        value : '按日选择'
                    }
                ],
                dateTypeValue:'',
                isByDay:false,
                checkIds:null
            }
        },
        methods:{
            showHandle(){
                this.isShow = !this.isShow
                this.dateType = this.returnDateObj(this.dateTypeValue).key
            },
            cancelHandle(){
                this.isShow = false
            },
            okHandle(){
                this.isShow = false
                this.dateTypeValue = this.returnDateObj(this.dateType).value
                if(!this.checkIds){
                    this.checkIds = this.hostelIds
                }
                // if(this.startValue && this.endValue){
                //     this.startValue = this.startValue.format('YYYY-MM-DD')
                //     this.endValue = this.endValue.format('YYYY-MM-DD')
                // }
                let params = {
                    dateType:this.dateType,
                    startDate:this.startValue?this.startValue.format('YYYY-MM-DD'):'',
                    endDate:this.endValue?this.endValue.format('YYYY-MM-DD'):'',
                    checkIds: this.checkIds
                }
                this.$emit('paramsChange',params,0)
            },
            returnDateObj(dateObj){
                return this.dateTypeList[this.dateTypeList.findIndex(function (element) {
                  return (element.key == dateObj || element.value == dateObj)
                })]
            },
            disabledStartDate (startValue) {
                const endValue = this.endValue;
                if (!startValue || !endValue) {
                    return false;
                }
                return startValue.valueOf() > endValue.valueOf();
            },
            disabledEndDate (endValue) {
                const startValue = this.startValue;
                if (!endValue || !startValue) {
                    return false;
                }
                return startValue.valueOf() >= endValue.valueOf();
            },
            handleStartOpenChange (open) {
                if (!open) {
                    this.endOpen = true;
                }
            },
            handleEndOpenChange (open) {
                this.endOpen = open;
            },
            onChange (checkedValues) {
                this.checkIds = checkedValues
                console.log('checked = ', this.checkIds)
            },
        },
        computed:{
        },
        watch:{
            startValue(val) {
                console.log('startValue', val.format('YYYY-MM-DD'))
            },
            endValue(val) {
                console.log('endValue', val.format('YYYY-MM-DD'))
            },
            dateType:function (val) {
                if(val == 'byDay'){
                    this.isByDay = true
                }else {
                    this.isByDay = false
                }
            }
        },
        mounted() {
            this.dateTypeValue = this.returnDateObj(this.dateType).value
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .filter-container
        height 1rem
        .filter
            background #ededed
            height 1rem
            width 100%
            position fixed
            z-index 1
            .title
                display inline-block
                width auto
                line-height 1rem
                text-align center
                /*vertical-align center*/
                .content
                    background white
                    padding 0.15rem
                    border-radius .8rem
                    margin-left 0.2rem
                    .arrow
                        font-size 0.2rem
                        margin-left 0.1rem
                        color #919191
    .totalAmount
        display inline-block
        float right
        line-height .5rem
        text-align center
        margin-right .2rem
        color #919191
    .filter-details
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        background white
        z-index 999
        .details-header
            height $HeaderHeight
            line-height $HeaderHeight
            text-align center
            font-size 0.3rem
            font-weight bolder
            letter-spacing 0.1rem
            color: #333333
            background $bgColor
        .title
            margin 0.2rem
        .date-picker
            margin 0.1rem
            margin-top 1rem
        .my-button
            position fixed
            width 100%
            padding 0.2rem
            text-align center
            .cancel-button
                margin-right 0.2rem
            .ok-button
                margin-left 0.2rem
        .aCheckGroup
            margin 0.2rem
            width 100%
            .aCheckBok
                width 40%
    .slide-fade-enter-active
        animation: bounce-in .5s;
    @keyframes bounce-in
        0%
            transform scale(0)
        100%
            transform scale(1)

</style>
