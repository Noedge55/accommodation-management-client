<template>
    <div class="filter-container">
        <div class="filter">
            <div class="title" @click="showHandle()">
                <span class="content">
                    <span>全部</span>
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
                    <span class="content" style="border: solid 1px;background: #dedede">
                        <span>按月选择</span>
                        <span class="iconfont arrow">&#xe64a;</span>
                    </span>
                </div>
                <div>
                    <a-date-picker :defaultValue="moment('2015-01-01', 'YYYY-MM-DD')" />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    import { DatePicker } from 'ant-design-vue';
    moment.locale('zh-cn');

    export default {
        name: "OrderFilter",
        components:{
            ADatePicker:DatePicker
        },
        data(){
            return{
                isShow:false,
                moment
            }
        },
        methods:{
            showHandle(){
                this.isShow = !this.isShow
            }
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
    .slide-fade-enter-active
        animation: bounce-in .5s;
    @keyframes bounce-in
        0%
            transform scale(0)
        100%
            transform scale(1)



</style>
