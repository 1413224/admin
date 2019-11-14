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
      <div class="right-wrap pt">
        <!-- 微信扫码 -->
        <div class="top d-flex fr" v-show="!isWX" @click="isLoginType()">
          <div class="saoma-wrap mt">
            <i class="iconfont icon-weixin-copy ico mr"></i>微信扫码登录
          </div>
          <div class="erwei-wrap">
            <i class="iconfont icon-erweima"></i>
            <div class="sanjiao"></div>
          </div>
        </div>
        <!-- 微信扫码end -->
        <!-- 账号密码登录 -->
        <div class="top d-flex fr" v-show="isWX" @click="isLoginType()">
          <div class="saoma-wrap mt" style="height:13px;padding:4px 10px;">
            账号密码登录
          </div>
          <div class="erwei-wrap">
            <i class="iconfont icon-diannao" 
              style="font-size:28px;position:relative;left:10px;top:2px;"></i>
            <div class="sanjiao"></div>
          </div>
        </div>
        <!-- 账号密码登录end -->

        <!-- 内容开始 -->
        <div class="cont-wrap">
          <div class="from-wrap" v-if="!isWX">
            <ul class=" d-flex">
              <li class="item" :class="{'active':idx == index}" 
              v-for="(item,index) in navList" 
              :key="index"
              @click="tab(index)">{{item.name}}</li>
            </ul>
            <div >
              <el-form
                label-width="0px" 
                :model="passForm" 
                :rules="passRules" 
                ref="passForm" v-if="idx==0">
                <el-form-item prop="user" class="form-item">
                  <el-input v-model="passForm.user" placeholder="请输入登陆账号">
                    <i slot="prefix" class="iconfont icon-user icouser"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="pass" class="form-item">
                  <el-input v-model="passForm.pass" 
                    type="password" 
                    placeholder="请输入登陆密码" @keyup.enter.native="login()">
                    <i slot="prefix" class="iconfont icon-mima" style="top:2px;left:12px;position:relative;"></i>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <p class="fr forget" v-if="idx==0" @click="forgetPass()">忘记密码？</p>

            <!-- 验证码登录 -->
            <div>
              <el-form
                label-width="0px" 
                :model="yzmForm" 
                :rules="yzmRules" 
                ref="yzmForm"  v-if="idx==1">
                <el-form-item prop="user" class="form-item">
                  <el-input v-model="yzmForm.userp" placeholder="请输入手机号/邮箱">
                    <i slot="prefix" class="iconfont icon-shouji icouser"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="yam" class="form-item">
                  <el-input 
                    v-model="yzmForm.yam" placeholder="请输入验证码"
                    style="width:215px;">
                    <i slot="prefix" class="iconfont icon-mima icouser"></i>
                  </el-input>
                  <div class="yzm-btn">
                    <span class=" text" v-if="showChangePhoneTime" @click="getYzmChangePhone">获取验证码</span>
                    <span v-if="!showChangePhoneTime">{{timesChangePhone}}</span>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <!-- 验证码登录end -->

            <div class="btn-login" @click="login()">立即登录</div>
            <div class="other d-flex">
              <p>其他账号登录</p>
              <i class="iconfont icon-qq-copy ico-qq"></i>
            </div>
          </div>
          <!-- 微信授权登录 -->
          <div v-if="isWX" class="wx-wrap">
            <div class="top d-flex a-center j-center">
              <i class="iconfont icon-weixin-copy"></i>
              <span>微信扫码登录</span>
            </div>
            <div class="erwei-wrap d-flex a-center j-center">
              <div id="erweima"></div>
            </div>
            <p style="font-size:14px;">打开微信，扫一扫登录</p>
          </div>
          <!-- 微信授权登录end -->
        </div>
        <!-- 内容结束 -->
      </div>
    </div>
  </div>
</template>
<script>
import QRCode  from "qrcodejs2"
import actions from './actions/login2'
export default {
  data(){
    return {
      isWX:false,
      idx:0,
      showChangePhoneTime:true,
      timesChangePhone:'',
      navList:[
        {name:'密码登录'},
        {name:'验证码登录'},
      ],
      passForm:{
        user:'',
        pass:''
      },
      passRules:{
        user:[
          {required: true, message: '请输入登陆账号',trigger:'blur'}
        ],
        pass:[
          {required: true, message: '请输入登陆密码',trigger:'blur'}
        ]
      },
      yzmForm:{
        yam:'',
        userp:'',
      },
      yzmRules:{
        userp:[
          {required: true, message: '请输入手机号/邮箱',trigger:'blur'}
        ],
        yam:[
          {required: true, message: '请输入验证码',trigger:'blur'}
        ]
      }
    }
  },
  created(){

  },
  methods:{
    ...actions,
    tab(index){
      let _this = this
      _this.idx = index
    },
    isLoginType(){
      let _this = this
      if(_this.isWX){
        _this.isWX = false
      }else{
        _this.isWX = true
        this.$nextTick (function () {
          document.getElementById("erweima").innerHTML = ""
          this.qrcode();
        })
      }
    },
    qrcode(){
      let _this = this
      let qrcode = new QRCode('erweima',{
        width:140,
        height:140,
        text:'sdfsd'
      })
    },
    forgetPass(){
      this.$router.push({
        path:'/forgetPass2'
      })
    }
  },
  components:{
    QRCode
  }
}
</script>
<style lang="less" scoped>
@import url('./style/login2.less');
.form-item{
}
.form-item /deep/ .el-input__inner{
  background: #F2F2F6FF !important;
  border-radius: 20px;
  border: none;
  padding-left: 43px;
}
</style>
<style lang="less">
.ul-wrap{
  li{
    list-style: disc !important;
  }
}
</style>