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
                <p>收入：￥100</p>
                <p>支出：￥100</p>
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
    import { DatePicker,Select,Button } from 'ant-design-vue';
    moment.locale('zh-cn');
    const { Option } = Select;
    export default {
        name: "OrderFilter",
        components:{
            ADatePicker:DatePicker,
            ASelect:Select,
            ASelectOption:Option,
            AButton:Button
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
                        value : '全部'
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
                isByDay:false
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
                let params = {
                    dateType:this.dateType,
                    startDate:this.startValue,
                    endDate:this.endValue
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
        },
        computed:{
        },
        watch:{
            startValue(val) {
                console.log('startValue', val)
            },
            endValue(val) {
                console.log('endValue', val)
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

    .slide-fade-enter-active
        animation: bounce-in .5s;
    @keyframes bounce-in
        0%
            transform scale(0)
        100%
            transform scale(1)

</style>
