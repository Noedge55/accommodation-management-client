// global.REQUEST_URL = 'http://192.168.50.153:8070/am/'
export default {
    install(Vue){
        Vue.prototype.billIcon = {
            1:"&#xe65f;",    //{name:"支付宝",iconStyle:"&#xe65f;"},
            2:"&#xe619;",    //{name:"微信",iconStyle: "&#xe619;"},
            3:"&#xe642;",    //{name:"长租",iconStyle: "&#xe61c;"},
            4:"&#xe634;",    //{name:"美团",iconStyle: "&#xe634;"},
            5:"&#xe6ad;",    //{name:"榛果",iconStyle: "&#xe6ad;"},
            6:"&#xe64f;",    //{name:"爱彼迎",iconStyle: "&#xe64f;"},
            7:"&#xe61a;",    //{name:"途家",iconStyle: "&#xe61a;"},
            8:"&#xe7e5;",    //{name:"携程",iconStyle: "&#xe7e5;"},
            9:"&#xe64d;",    //{name:"去哪儿",iconStyle: "&#xe64d;"},
            10:"&#xe68f;",      //收入
            11:"&#xe62b;"       //支出
        }
    }

}
