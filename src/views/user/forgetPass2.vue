<template>
  <div class="page-login d-flex a-center j-center">
    <div class="content d-flex">
      <div class="left-wrap">
        <div class="tit-wrap">
          <p class="tit">后台管理系统</p>
          <ul class="ul-wrap mt-3">
            <li>应用商城，海量应用</li>
            <li>扩展用户渠道和资源</li>
          </ul>
        </div>
      </div>

      <div class="right-wrap">
        <div class="cont">
          <div class="top d-flex j-sb">
            <p class="tit">忘记密码</p>
            <p class="login-text a-self-end" @click="goLogin()">登录<i class="iconfont icon-right-s ml"></i></p>
          </div>
          <el-form
            label-width="0px" 
            :model="passForm" 
            :rules="passRules" 
            ref="passForm" style="margin-top:50px;">
            <el-form-item prop="user" class="form-item">
              <el-input v-model="passForm.user" placeholder="请输入手机号/邮箱">
                <i slot="prefix" class="iconfont icon-shouji icouser"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="yam" class="form-item">
              <el-input 
                v-model="passForm.yam" placeholder="请输入验证码"
                style="width:215px;">
                <i slot="prefix" class="iconfont icon-mima icouser"></i>
              </el-input>
              <div class="yzm-btn">
                <span class=" text" v-if="showChangePhoneTime" @click="getYzmChangePhone">获取验证码</span>
                <span v-if="!showChangePhoneTime">{{timesChangePhone}}</span>
              </div>
            </el-form-item>
            <el-form-item prop="newPass" class="form-item">
              <el-input v-model="passForm.newPass" 
                type="password" 
                placeholder="新密码（8-16位必须包含数字和字母）">
                <i slot="prefix" class="iconfont icon-mima" style="top:2px;left:12px;position:relative;"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="pass" class="form-item">
              <el-input v-model="passForm.pass" 
                type="password" 
                placeholder="确认新密码">
                <i slot="prefix" class="iconfont icon-mima" style="top:2px;left:12px;position:relative;"></i>
              </el-input>
            </el-form-item>
          </el-form>
          <div class="btn-rem" @click="changePassword">确认修改</div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      passForm:{
        user:'',
        newPass:'',
        pass:'',
        yam:''
      },
      passRules:{
        user:[
          {required: true, message: '请输入手机号/邮箱',trigger:'blur'}
        ],
        newPass:[
          {required: true, message: '新密码（8-16位必须包含数字和字母）',trigger:'blur'}
        ],
        pass:[
          {required: true, message: '确认新密码',trigger:'blur'}
        ],
        yam:[
          {required: true, message: '请输入验证码',trigger:'blur'}
        ]
      },
      showChangePhoneTime:true,
      timesChangePhone:'',
    }
  },
  created(){

  },
  methods:{
    getYzmChangePhone(){
      let _this = this 
      _this.changePhoneCountDown()
      return
      _this.$http.post(_this.baseUrl + _this.url.user.GetPublicCode,{
        role_type:_this.url.role_type,
        token:_this.$utils.getToken(),
        mobile:_this.passForm.user,
        type:3
      }).then((res)=>{
        if(res.data.ret==200){
          _this.changePhoneCountDown()
        }
      })
    },
    changePhoneCountDown(){
      let _this = this,
          time = 60;
      let timer = setInterval(()=>{
        _this.showChangePhoneTime = false
        time--;
        _this.timesChangePhone = time + 's'
        if(time == 0){
          clearInterval(timer)
          _this.showChangePhoneTime = true
        }
      },1000)
    },
    changePassword(){
      let _this = this
      if(_this.passForm.user==''){
        this.$message('请输入手机号码')
        return 
      }
      if(_this.passForm.yzm==''){
        this.$message('请输入验证码')
        return 
      }
      if(_this.passForm.newPass==''){
        this.$message('请输入密码')
        return 
      }
      if(_this.$utils.testPhone(_this.passForm.user)){
        this.$message('请输入正确的手机号码')
        return
      }
      _this.$http.post(_this.baseUrl + _this.url.user.ForgetPassword,{
        role_type:_this.url.role_type,
        account:_this.passForm.user,
        verification_code:_this.passForm.yzm,
        new_password:_this.MD5(_this.passForm.newPass)
      }).then((res)=>{
        if(res.data.ret==200){
          this.$message(res.data.data.title)
          _this.$router.push({
            path:'/login'
          })
        }
      })
    },
    goLogin(){
      this.$router.push({
        path:'/login'
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./style/login2.less');
@import url('./style/forgetPass2.less');
.form-item /deep/ .el-input__inner{
  background: #F2F2F6FF !important;
  border-radius: 20px;
  border: none;
  padding-left: 43px;
}
</style>