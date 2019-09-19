<template>
    <div>
        <ul>
            <li class="item border-bottom" v-for="item of hostelList" :key="item.id">

                <!--<img class="item-img" :src="item.imgUrl"/>-->
<!--                <span class="iconfont item-img">&#xe61c;</span>-->
                <div class="item-info">
                        <p class="info-title">{{item.name}}</p>
                        <p class="info-desc"><span>床位情况：</span>{{item.livingNum}} / {{item.totalNum}}</p>
                    <router-link :to="'/editHostel/' + item.id" :hostelId="item.hostelId" class="iconfont edit-button">&#xe63c;</router-link>
                </div>
                <router-link tag="button" :to="{path:'/detail',query:{item:JSON.stringify(item),itemType:'0'}}" class="iconfont to-button">&#xe627;</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "HomeHostel",
        data () {
            return {
                hostelList1: [{
                    "id":1,
                    "imgUrl":"12313",
                    "title":"辣鸡",
                    "totalNum":20,
                    "livingNum":3
                },{
                    "id":2,
                    "imgUrl":"12313",
                    "title":"辣鸡",
                    "totalNum":20,
                    "livingNum":3
                }]
            }
        },
        props:{
            hostelList: Array
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .item
        overflow: hidden
        display: flex
        height: 1.9rem
        .item-img
            height:1.7rem
            width 1.7rem
            padding .1rem
            font-size 1rem
        .item-info
            flex 1
            padding .1rem
            min-width 0
            .info-title
                line-height .54rem
                font-size .32rem
                ellipsis()
            .info-desc
                line-height .4rem
                color #ccc
                ellipsis()
            .edit-button
                line-height .44rem
                margin-top .16rem
                color black
                padding 0 .2rem
                border-radius .06rem
        .to-button
            background $bgColor
            float right
            width 20%
            font-size 0.5rem
</style>
