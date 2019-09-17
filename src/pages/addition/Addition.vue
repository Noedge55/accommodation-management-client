<template>
    <div>
        <addition-header></addition-header>
        <addition-content></addition-content>
    </div>
</template>

<script>
    import AdditionHeader from './components/Header'
    import AdditionContent from './components/Content'
    export default {
        name: "Addition",
        components:{AdditionHeader,AdditionContent}
    }
</script>

<style lang="stylus" scoped>


</style>
