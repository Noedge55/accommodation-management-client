<template>
    <div class="content" :style="content">
        <div class="form">
            <div class="tip">Welcome</div>
            <input id ="login_id" class="input" type="text" v-model="loginId" placeholder="请输入用户名/手机号/邮箱"/><br>
            <input id ="password" class="input" type="password" v-model="password" placeholder="请输入密码"/><br>
            <button id="login_btn" class="btn" @click="loginClick()">登录</button>
        </div>
        <div class="forget_password">
            <span>忘记密码</span>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5'
export default {
    name: "Login",
    data () {
      return {
          content:{
              height:'100px'
          },
          loginId:"",
          password:""
      }
    },
    created() {
        this.content.height  = document.documentElement.clientHeight + 'px';
    },
    methods:{
        loginClick(){
            if(!this.loginId || !this.password){
                alert("用户名或者密码不能为空")
                return
            }
            this.login(this.loginId,this.password);
        },
        login(loginId,password){
            //前端加密
            let Base64 = require('js-base64').Base64;
            password = Base64.encode(md5(password))
            let person = {
                "loginId":loginId,
                "password":password
            }
            this.$axios.post("/am/login.html",this.$qs.stringify(person)).then(this.loginSuccess)
        },
        loginSuccess(res){
            console.info(res)
            if(res && res.data){
                res = res.data
                alert(res.message)
                if(res.retCode == 1){
                    this.$store.commit("setUser",res.result)
                    this.$router.push('/')
                }
            }
        },
    },
    mounted() {

    }
}
</script>

<style lang="stylus" scoped>
    .content
        width 100%
        position absolute
        .form
            vertical-align center
            width 100%
            text-align center
            margin-top 50%
            .tip
                font-size .8rem
            .input
                box-sizing border-box
                border solid 1px #cacaca
                width 70%
                border-radius 0.06rem
                line-height .62rem
                height .62rem
                text-align center
                color #666
                padding 0 .1rem
                margin-top 0.2rem
            .btn
                height: 1rem;
                width: 2rem;
                margin-top: 0.3rem;
                background: white;
                border: solid 1px;
                border-radius: 0.6rem;
        .forget_password
            width 100%
            position absolute
            bottom 1rem
            text-align center
            span
                color #cacaca
</style>
