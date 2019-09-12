<template>
    <div>
        <common-header :title="'主页'" :is-show-left="false" :is-show-right="true" :is-add="true">
            <router-link to="/addHotel.html">
                <slot name="rightIcon"></slot>
            </router-link>
        </common-header>
    </div>
</template>

<script>
    import CommonHeader from '../../common/Header'
    export default {
        name: "HomeHeader",
        components:{CommonHeader},
    }
</script>

<style lang="stylus" scoped>

</style>
