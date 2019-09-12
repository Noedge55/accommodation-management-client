<template>
    <common-header :title="returnTitle()" :is-show-left="true" :is-show-right="true" :is-add="false">
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
                isEdit:false
            }
        },
        methods:{
            returnTitle(){
                if(this.itemType == 1){
                    return '订单详情';
                }else{
                    return '旅社详情';
                }
            }
        },
        mounted(){

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
