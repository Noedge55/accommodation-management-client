<template>
    <div class="title">{{title}}</div>
</template>

<script>
    export default {
        name: "CommonLabel",
        props:{
            title:String
        }
    }
</script>

<style lang="stylus" scoped>
    .title
        margin-top:.2rem
        line-height: .8rem
        background:#eee
        text-indent: .2rem
</style>
