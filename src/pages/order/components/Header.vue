<template>
    <div>
        <common-header :title="'订单'" :is-show-left="true" :is-show-right="true" :right-type="'add'">
            <slot name="rightIcon"></slot>
        </common-header>
    </div>
</template>

<script>
    import CommonHeader from '../../common/Header'
    export default {
        name: "OrderHeader",
        components: {CommonHeader},
        props:{
            hostelList:Array
        },
        methods:{
            back(){
                this.$router.go(-1)
            }
        },
        mounted() {
            let me = this
            me.$eventBus.$on('header-right-click-handle',()=>{
                me.$router.push({
                    path:"/addition",
                    query:{itemType:2,hostelList:JSON.stringify(this.hostelList)}
                })
            })
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .header
        display : flex
        line-height:$HeaderHeight
        background: $bgColor
        color:#fff
        .header-left
            float: left
            min-width: 1.04rem
            .back-icon
                text-align:center
                font-size:.4rem
        .header-title
            flex:1
            text-align center
            font-size 0.3rem
            color: #333333
            font-weight bolder
            letter-spacing 0.1rem
        .header-right
            min-width:1.04rem
            float:right
            text-align:center
            color: #fff
            .add-icon
                font-size: 0.4rem
</style>
