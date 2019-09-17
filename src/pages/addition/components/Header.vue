<template>
    <common-header :title="title" :is-show-left="true" :is-show-right="true" :rightType="'done'"></common-header>
</template>

<script>
    import CommonHeader from "../../common/Header"
    export default {
        name: "AdditionHeader",
        data(){
          return{
              itemType:this.$route.query.itemType
          }
        },
        components:{CommonHeader},
        computed:{
            title:function () {
                let title = "新增旅社"
                switch (this.itemType) {
                    case 0:
                        title = "新增旅社"
                        break
                }
                return title
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>
