<template>
    <div class="header">
        <div class="header-warp">
            <div class="header-left" v-show="isShowLeft" @click="headerLeftClickHandle">
                <div class="iconfont back-icon" v-html="leftText"></div>
            </div>
            <div class="header-title">
                {{title}}
            </div>
            <slot name="rightIcon">
                <div class="header-right" v-show="isShowRight" @click="headerRightClickHandle">
                    <span class="iconfont add-icon" v-html="rightText"></span>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    import eventBus from '../../config/eventBus'
    export default {
        name: "CommonHeader",
        props:{
            title:String,
            isShowLeft:Boolean,
            isShowRight:Boolean,
            isAdd:Boolean,
            rightType:String
        },
        data(){
            return{
                // rightText:'&#xe63c;',
                leftText:'&#xe624;',
                count:0
            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            headerLeftClickHandle(){
              if(this.leftText == '&#xe624;'){
                  this.back()
              }else{
                  this.$parent.$emit('header-left-click-handle')
                  this.changeIconText();
              }
            },
            headerRightClickHandle(){
                if(this.isShowRight){
                    eventBus.$emit('header-right-click-handle')
                }
            },
            changeIconText(){
                // if(this.rightText == '&#xe63c;'){
                //     this.rightText = '完成'
                //     this.leftText = '取消'
                // }else{
                //     this.rightText = '&#xe63c;'
                //     this.leftText = '&#xe624;'
                // }
            },
        },
        computed:{
            rightText:function () {
                let text = "&#xe61e;"
                switch (this.rightType) {
                    case "add":
                        text = "&#xe61e;"
                        break
                    case "edit":
                        text = "&#xe63c;"
                        break
                    case "done":
                        text = "保存"
                        break
                    default:
                        text = "&#xe61e;"
                        break
                }
                return text
            }
        },
        mounted() {
            console.info(this.isAdd)
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .header
        height:$HeaderHeight
        .header-warp
            display : flex
            background: $bgColor
            color:#fff
            position: fixed
            top: 0
            right: 0
            left: 0
            line-height:$HeaderHeight
            z-index 1
            .header-left
                float: left
                min-width: 1.04rem
                position fixed
                left 0
                .back-icon
                    text-align:center
                    font-size:.4rem
            .header-title
                flex:1
                text-align center
                font-size 0.3rem
                font-weight bolder
                letter-spacing 0.1rem
                color: #333333
            .header-right
                position fixed
                right 0
                min-width:1.04rem
                float:right
                text-align:center
                color: #fff
                .add-icon
                    font-size: 0.4rem
</style>
