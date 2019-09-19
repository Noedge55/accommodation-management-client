<template>
    <common-header :title="title" :is-show-left="true" :is-show-right="true" :right-type="rightType">
        <slot name="rightIcon" ></slot>
    </common-header>
</template>

<script>
    import eventBus from '../../../config/eventBus'
    import CommonHeader from '../../common/Header'
    export default {
        name: "DetailHeader",
        components:{CommonHeader},
        props:{
            itemType:String
        },
        data(){
            return{
                isEdit:false,
                title:"",
                rightType:""
            }
        },
        methods:{
            returnTitle(){
                if(this.itemType == 1){
                    this.title = "订单详情"
                    this.rightType = "add"
                }else{
                    this.title="旅社详情"
                    this.rightType = "edit"
                }
            }
        },
        mounted(){
            this.returnTitle()
        },
        created() {
            this.$on('header-right-click-handle',()=>{
                this.isEdit = !this.isEdit
                if(this.isEdit){
                    eventBus.$emit('editHandle', this.isEdit,'edit')
                }else{
                    eventBus.$emit('editHandle', this.isEdit,'submit')
                }
            });
            this.$on('header-left-click-handle',()=>{
                this.isEdit = false
                eventBus.$emit('editHandle', this.isEdit,'cancel')
            });
        },
        beforeDestroy() {
            this.$off('header-right-click-handle')
            this.$off('header-left-click-handle')
        }
    }
</script>

<style scoped>

</style>
