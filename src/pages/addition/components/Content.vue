<template>
    <div>
        <div>
<!--            <a-divider>旅社基本信息</a-divider>-->
            <input v-model="name" class="inputContent" placeholder="旅社名称"/>
            <a-divider class="divider"/>
            <a-cascader v-model="area" class="areaContent" :options="locationOptions" :loadData="loadData" placeholder="选择区域" size="large" changeOnSelect/>
            <a-divider class="divider"/>
            <input v-model="address" class="inputContent" placeholder="详细地址"/>
            <a-divider class="divider"/>
        </div>
    </div>
</template>

<script>
    import {Divider,Cascader} from 'ant-design-vue'
    import {province} from '../../../assets/location/province.js'
    import {city} from '../../../assets/location/city.js'
    import {county} from '../../../assets/location/county.js'
    import {town} from '../../../assets/location/town.js'
    import eventBus from '../../../config/eventBus'
    export default {
        name: "AdditionContent",
        components:{
            ADivider:Divider,
            ACascader:Cascader
        },
        props:{
            roomList:Array,
            checkRoomList:Array
        },
        data() {
            return {
                name:"",
                area:[],
                address:"",
                isDisabled:true,
                itemType:this.$route.query.itemType,
                locationOptions:this.returnProvinceData()
            }
        },
        methods:{
            loadData(selectedOptions) {
                const targetOption = selectedOptions[selectedOptions.length - 1];
                targetOption.loading = true;
                let child = []
                let type = targetOption.type
                switch (type) {
                    case 0:
                        child = city[targetOption.id]
                        break
                    case 1:
                        child = county[targetOption.id]
                        break
                    case 2:
                        child = town[targetOption.id]
                        break
                }
                type++
                targetOption.loading = false;
                let list = []
                child.forEach((item)=>{
                    let tempObj = {}
                    tempObj.id = item.id
                    tempObj.value = item.name
                    tempObj.label = item.name
                    if(type < 3){
                        tempObj.isLeaf = false
                    }
                    tempObj.type = type
                    list.push(tempObj)
                })

                targetOption.children = list
                this.locationOptions = [...this.locationOptions]


                // load options lazily
                // setTimeout(() => {
                //     targetOption.loading = false;
                //     targetOption.children = [{
                //         label: `${targetOption.label} Dynamic 1`,
                //         value: 'dynamic1',
                //     }, {
                //         label: `${targetOption.label} Dynamic 2`,
                //         value: 'dynamic2',
                //     }];
                //     this.locationOptions = [...this.locationOptions]
                // }, 1000);
            },
            returnAmount(amount){
              if(amount > 0){
                  return "+" + amount.toFixed(2)
              }
              return amount.toFixed(2)
            },
            returnAmountColor(amount) {
                if (Number(amount) < 0) {
                    return {color: 'green'}
                }
            },
            returnBillTypeValue(){
                let value = "";
                switch (this.item.billType) {
                    case 0:
                        value = "入住账单"
                        break
                    case 1:
                        value = "其它收入账单"
                        break
                    default:
                        value = "支出账单"
                        break
                }
                return value
            },
            returnProvinceData(){
                let proList = []
                province.forEach((item)=>{
                    let tempObj = {}
                    tempObj.id = item.id
                    tempObj.value = item.name
                    tempObj.label = item.name
                    tempObj.isLeaf = false
                    tempObj.type = 0
                    proList.push(tempObj)
                })
                return proList
            }
        },
        computed:{
            // iconStyle:function () {
            //     console.info(this.item.billType == 0 ? this.billIcon[this.item.sourceId]:this.item.billType == 1 ? this.billIcon[10] : this.billIcon[11])
            //     return this.item.billType == 0 ? this.billIcon[this.item.sourceId]:this.item.billType == 1 ? this.billIcon[10] : this.billIcon[11]
            // },
        },
        mounted(){
            eventBus.$on('header-right-click-handle',()=>{
                console.info(this.name + " " + this.area + " " +this.address)
            })
        },
        created() {
        },
        beforeDestroy() {
            eventBus.$off('header-right-click-handle')
        }
    }
</script>

<style lang="stylus" scoped>
    .inputContent
        width 100%
        line-height 0.8rem
        padding 0.2rem
    .divider
        margin 0.2rem 0
    .areaContent
        max-width 100%
        min-width 95%
        margin 0.2rem
</style>
