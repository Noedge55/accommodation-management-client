<template>
    <div>
        <common-header :title="'主页'" :is-show-left="false" :is-show-right="true" :is-add="true">
            <slot name="rightIcon"></slot>
        </common-header>
    </div>
</template>

<script>
    import CommonHeader from '../../common/Header'
    export default {
        name: "HomeHeader",
        components:{CommonHeader},
        mounted(){
            let me = this
            me.$eventBus.$on('header-right-click-handle',function () {
                me.$router.push({
                    path:"/addition",
                    query:{itemType:0}
                })
            })
        },
        created(){

        },
        beforeDestroy() {
            this.$eventBus.$off('header-right-click-handle')
        }
    }
</script>

<style lang="stylus" scoped>

</style>
