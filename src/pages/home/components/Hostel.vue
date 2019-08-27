<template>
    <div>
        <ul>
            <router-link tag="li" :to="'/detail/' + item.id" class="item border-bottom" v-for="item of hostelList" :key="item.id">
                <!--<img class="item-img" :src="item.imgUrl"/>-->
                <span class="iconfont item-img">&#xe61c;</span>
                <div class="item-info">
                    <p class="info-title">{{item.title}}</p>
                    <p class="info-desc"><span>床位情况：</span>{{item.totalNum}} / {{item.livingNum}}</p>
                    <button class="info-button">查看详情</button>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "HomeHostel",
        data () {
            return {
                hostelList: [{
                    "id":1,
                    "imgUrl":"12313",
                    "title":"辣鸡",
                    "totalNum":20,
                    "livingNum":3
                }]
            }
        }
    }
</script>

<style lang="stylus" scoped>
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
            .info-button
                line-height .44rem
                margin-top .16rem
                background #ff9300
                padding 0 .2rem
                border-radius .06rem
                color #fff
</style>
