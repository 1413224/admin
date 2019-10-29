<template>
  <div class="content bg-white box-shadow-page rounded px-1 py-2">
    <div class="tab-wrap d-flex pl-1">
      <div class="item" @click="goUser()">个人信息</div>
      <div class="item active">账号管理</div>
    </div>
    <div class="cont bg-gray rounded px-1 mt-2 pt-1 pb-3">
      <numberTips>
        <div class="tips">当前账号 <span>{{userInfo.nickname}}</span></div>
      </numberTips>
      <!-- 登录密码 -->
      <div class="item d-flex bg-white rounded mt-1 py-2">
        <div class="left d-flex a-center j-end">
          <img src="../../../../assets/account/check.png" alt="">
        </div>
        <div class="center d-flex a-center">
          <div class="img d-flex a-center j-center">
            <img class="a-img" src="../../../../assets/account/suo.png"/>
          </div>
          <div class="tit ml-2">登陆密码</div>
          <div class="desc ml-3">定期更换有助于账号安全</div>
        </div>
        <div class="right  d-flex a-center">
          <div class="bangding" @click="showPassDialog()">修改密码</div>
        </div>
      </div>
      <!-- 登录密码end -->
      <!-- 绑定手机 -->
      <div class="item d-flex bg-white rounded mt-1 py-2">
        <div class="left d-flex a-center j-end">
          <img src="../../../../assets/account/check.png" alt="">
        </div>
        <div class="center d-flex a-center">
          <div class="img d-flex a-center j-center">
            <img class="a-img" src="../../../../assets/account/phone.png"/>
            <img class="a-img" src="../../../../assets/account/phone.png"/>
          </div>
          <div class="tit ml-2">绑定手机</div>
          <div class="desc ml-3">用于登录、保护、找回密码</div>
        </div>
        <div class="right d-flex a-center">
          <div class="bangding" @click="showBdPhoneDialog()">绑定</div>
          <div class="bangding">修改手机号</div>
        </div>
      </div>
      <!-- 绑定手机end -->
      <!-- 紧急联系人 -->
      <div class="item d-flex bg-white rounded mt-1 py-2">
        <div class="left d-flex a-center j-end">
          <img src="../../../../assets/account/check.png" alt="">
        </div>
        <div class="center d-flex a-center">
          <div class="img d-flex a-center j-center">
            <img class="a-img" src="../../../../assets/account/user.png"/>
            <img class="a-img" src="../../../../assets/account/user_a.png"/>
          </div>
          <div class="tit ml-2">紧急联系人</div>
          <div class="desc ml-3">系统管理员可通过紧急联系人联系到您</div>
        </div>
        <div class="right d-flex a-center">
          <div class="bangding" @click="lianxiBtn()">绑定</div>
          <div class="jie-wrap d-flex">
            <div class="edit">修改</div>
            <div class="jie ml-1">解绑</div>
          </div>
        </div>
      </div>
      <!-- 紧急联系人 -->
      <!-- 绑定QQ -->
      <div class="item d-flex bg-white rounded mt-1 py-2">
        <div class="left d-flex a-center j-end">
          <img src="../../../../assets/account/check.png" alt="">
        </div>
        <div class="center d-flex a-center">
          <div class="img d-flex a-center j-center">
            <img class="a-img" src="../../../../assets/account/qq.png"/>
            <img class="a-img" src="../../../../assets/account/qq_a.png"/>
          </div>
          <div class="tit ml-2">绑定QQ</div>
          <div class="desc ml-3">可用绑定的QQ扫码登录</div>
        </div>
        <div class="right d-flex a-center">
          <div class="bangding">绑定</div>
          <div class="jiebang">解绑</div>
        </div>
      </div>
      <!-- 绑定QQend -->
      <!-- 绑定微信 -->
      <div class="item d-flex bg-white rounded mt-1 py-2">
        <div class="left d-flex a-center j-end">
          <img src="../../../../assets/account/check.png" alt="">
        </div>
        <div class="center d-flex a-center">
          <div class="img d-flex a-center j-center">
            <img class="a-img" src="../../../../assets/account/wx.png"/>
            <img class="a-img" src="../../../../assets/account/wx_a.png"/>
          </div>
          <div class="tit ml-2">绑定微信</div>
          <div class="desc ml-3">可用绑定的微信扫码登录</div>
        </div>
        <div class="right d-flex a-center">
          <div class="bangding">绑定</div>
          <div class="jiebang">解绑</div>
        </div>
      </div>
      <!-- 绑定微信end -->
      <!-- 绑定邮箱 -->
      <div class="item d-flex bg-white rounded mt-1 py-2">
        <div class="left d-flex a-center j-end">
          <img src="../../../../assets/account/check.png" alt="">
        </div>
        <div class="center d-flex a-center">
          <div class="img d-flex a-center j-center">
            <img class="a-img" src="../../../../assets/account/email.png"/>
            <img class="a-img" src="../../../../assets/account/email_a.png"/>
          </div>
          <div class="tit ml-2">绑定邮箱</div>
          <div class="desc ml-3">可用绑定的邮箱找回密码</div>
        </div>
        <div class="right d-flex a-center">
          <div class="bangding" @click="showEmailDialog()">绑定</div>
          <div class="jie-wrap d-flex">
            <div class="edit">修改</div>
            <div class="jie ml-1">解绑</div>
          </div>
        </div>
      </div>
      <!-- 绑定邮箱end -->
    </div>
    <!-- 修改密码弹框 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogPass"
      :before-close="closeDialogPass"
      width="640px">
      <el-form
        label-width="130px" 
        :model="passForm" :rules="passRules" 
        ref="passForm">
        <el-form-item label="当前账号" prop="phone">
          <p style="margin-top:2px;color:#333333FF;" class="font-sm">{{userInfo.mobile}}</p>
        </el-form-item>
        <el-form-item label="账户密码" prop="pass" v-if="usePassChange">
          <el-input class="item-input" 
            v-model="passForm.pass" placeholder="请输入账户密码"
            type="password" 
            size="small"></el-input>
        </el-form-item>

        <el-form-item label="短信验证码" prop="yzm" v-if="!usePassChange">
          <el-input 
            style="width:239px;"
            v-model="passForm.yzm" 
            placeholder="请输入短信验证码" size="small"></el-input>
            <span class="yzm" v-if="showChangePassByYzm" @click="getYzmByChangePass">获取验证码</span>
            <span class="yzm-s" v-if="!showChangePassByYzm">{{timesChangePass}}</span>
        </el-form-item>

        <el-form-item label="新密码" prop="newPass">
          <el-input v-model="passForm.newPass" type="password"
          placeholder="请输入新密码" class="item-input" size="small"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="renewPass" required>
          <el-input v-model="passForm.renewPass" type="password"
          placeholder="请输入新密码" class="item-input" size="small"></el-input>
        </el-form-item>
        <el-form-item label="" style="margin-bottom:0;">
          <p class="tips font-sm" style="color:#2589FFFF;width:110px;"
          v-show="usePassChange" 
          @click="passChangeBtn()">通过手机验证码修改</p>
        </el-form-item>
        <el-form-item label="">
          <p class="tips font-sm" style="color:#2589FFFF;width:100px;"
          v-show="!usePassChange"
          @click="yzmChangeBtn()">通过账户密码修改</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPass = false">取 消</el-button>
        <el-button type="primary" @click="changePass('passForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码弹框end -->
    <!-- 绑定手机弹框 -->
    <el-dialog
      title="绑定手机"
      :visible.sync="dialogPhonebd"
      :before-close="closeDialogPhonebd"
      width="640px">
      <el-form
        label-width="130px" 
        :model="bdPhoneForm" :rules="bdPhoneRules" 
        ref="bdPhoneForm">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="bdPhoneForm.phone"
            style="width:346px;"
            placeholder="请输入要绑定的手机号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="yzm">
          <el-input 
            style="width:239px;"
            v-model="bdPhoneForm.yzm" 
            placeholder="请输入邮箱收到的验证码" size="small"></el-input>
            <span class="bdPhone-yzm" v-if="showbdPhoneFormByYzm" @click="getYzmByBdPhoneForm">获取验证码</span>
            <span class="bdPhone-yzm-s" v-if="!showbdPhoneFormByYzm">{{timesChangeBdPhoneForm}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPhonebd = false">取 消</el-button>
        <el-button type="primary" @click="SubmitBdPhome('bdPhoneForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 绑定手机弹框end -->
    <!-- 紧急联系人弹框 -->
    <el-dialog
      title="紧急联系人"
      :visible.sync="dialogEmergency"
      :before-close="closeDialogEmergency"
      width="640px">
      <el-form
        label-width="130px" 
        :model="EmergencyForm" :rules="EmergencyRules" 
        ref="EmergencyForm">
        <el-form-item label="联系人类型" prop="emergencyType">
          <el-select v-model="EmergencyForm.emergencyType" 
          placeholder="选择联系人类型" clearable size="small">
            <el-option 
              v-for="(item,index) in optionsData"
              :key="index"
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="EmergencyForm.name"
            style="width:346px;"
            placeholder="请填写紧急联系人姓名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="EmergencyForm.phone"
            style="width:346px;"
            placeholder="请填写紧急联系人手机号码" size="small"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="EmergencyForm.remack" style="width:346px;"
          placeholder="请输入..." type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEmergency = false">取 消</el-button>
        <el-button type="primary" @click="changeEmergency('EmergencyForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 紧急联系人弹框end -->
    <!-- 邮箱绑定弹框 -->
    <el-dialog
      title="绑定邮箱"
      :visible.sync="dialogEmail"
      :before-close="closeDialogEmail"
      width="640px">
      <el-form
        label-width="130px" 
        :model="EmailForm" :rules="EmailRules" 
        ref="EmailForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="EmailForm.email"
            style="width:346px;"
            placeholder="请输入邮箱账号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="yzm">
          <el-input 
            style="width:239px;"
            v-model="EmailForm.yzm" 
            placeholder="请输入邮箱收到的验证码" size="small"></el-input>
            <span class="email-yzm" v-if="showChangeEmailByYzm" @click="getYzmByChangeEmail">获取验证码</span>
            <span class="email-yzm-s" v-if="!showChangeEmailByYzm">{{timesChangeEmail}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEmail = false">取 消</el-button>
        <el-button type="primary" @click="changeEmail('EmailForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 邮箱绑定弹框end -->
  </div>
</template>
<script>
import numberTips from '@/components/numberTips/numberTips'
import actions from './actions/index'
import ySelect from '@/components/ySelect/index'

export default {
  data(){
    let validateRenewPass = (rule, value, callback) => {
      if(value==''){
        callback(new Error('请重新输入密码'))
      }else if(this.passForm.renewPass!=this.passForm.newPass){
        callback(new Error('两次密码不一致'))
      }else{
        callback()
      }
    }
    return {
      usePassChange:true,
      showChangePassByYzm:true,
      timesChangePass:'',
      userInfo:'',
      dialogPass:false,
      dialogEmergency:false,
      dialogEmail:false,
      timesChangeEmail:'',
      showChangeEmailByYzm:true,
      dialogPhonebd:false,
      showbdPhoneFormByYzm:true,
      timesChangeBdPhoneForm:'',
      passForm:{
        pass:'',
        newPass:'',
        renewPass:'',
        yzm:''
      },
      passRules:{
        pass:[
          {required: true, message: '请输入账户密码',trigger:'blur'}
        ],
        newPass:[
          {required: true, message: '请输入新密码',trigger:'blur'}
        ],
        renewPass:[
          { validator: validateRenewPass, trigger: 'blur' }
        ],
        yzm:[
          {required: true, message: '请输入短信验证码',trigger:'blur'}
        ]
      },
      bdPhoneForm:{
        phone:''
      },
      bdPhoneRules:{
        phone:[
          {required: true, message: '请输入要绑定的手机号',trigger:'blur'}
        ]
      },
      EmergencyForm:{
        emergencyType:'',
        name:'',
        phone:'',
        remack:''
      },
      EmergencyRules:{
        emergencyType:[
          {required: true, message: '选择联系人类型',trigger:'blur'}
        ],
        name:[
          {required: true, message: '请填写紧急联系人姓名',trigger:'blur'}
        ],
        phone:[
          {required: true, message: '请填写紧急联系人手机号码',trigger:'blur'}
        ]
      },
      optionsData:[
        {label:'配偶',value:1},
        {label:'同事',value:2},
        {label:'直系亲属',value:3},
        {label:'朋友',value:4},
        {label:'其他',value:5},
      ],
      EmailForm:{
        email:'',
        yzm:''
      },
      EmailRules:{
        email:[
          {required: true, message: '请输入邮箱账号',trigger:'blur'}
        ],
        yzm:[
          {required: true, message: '请输入邮箱收到的验证码',trigger:'blur'}
        ]
      }
    }
  },
  created(){
    this.getInfo()
  },
  methods:{
    ...actions,
    goUser(){
      this.$router.push({
        path:'/setting/account/info'
      })
    },
    showPassDialog(){
      this.dialogPass = true
    },
    showEmailDialog(){
      this.dialogEmail = true
    },
    showBdPhoneDialog(){
      this.dialogPhonebd = true
    }
  },
  components:{
    numberTips,
    ySelect
  }
}
</script>
<style lang="less" scoped>
@import url('./actions/index.less');
.tips{
  margin-top: -10px;
  &:hover{
    cursor: pointer;
  }
}
</style>