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
        <div class="right d-flex a-center">
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
            <img class="a-img" v-if="!bindInfo.is_bind_mobile" src="../../../../assets/account/phone.png"/>
            <img class="a-img" v-else src="../../../../assets/account/phone.png"/>
          </div>
          <div class="tit ml-2">绑定手机</div>
          <div class="desc ml-3" v-if="!bindInfo.is_bind_mobile">用于登录、保护、找回密码</div>
          <div class="desc ml-3" v-else>{{bindInfo.mobile}}</div>
        </div>
        <div class="right d-flex a-center">
          <div class="bangding" v-if="!bindInfo.is_bind_mobile" @click="showBdPhoneDialog()">绑定</div>
          <div class="bangding" v-else @click="showChangePhoneDialog()">修改手机号</div>
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
            <img class="a-img" v-if="!bindInfo.is_bind_emergency" src="../../../../assets/account/user.png"/>
            <img class="a-img" v-else src="../../../../assets/account/user_a.png"/>
          </div>
          <div class="tit ml-2">紧急联系人</div>
          <div class="desc ml-3" v-if="!bindInfo.is_bind_emergency">系统管理员可通过紧急联系人联系到您</div>
          <div class="desc ml-3" v-else>
            {{bindInfo.emergency_info.emergency}}
            {{bindInfo.emergency_info.egmobile}}
          </div>
        </div>
        <div class="right d-flex a-center">
          <div class="bangding" v-if="!bindInfo.is_bind_emergency" @click="lianxiBtn()">绑定</div>
          <div class="jie-wrap d-flex" v-else>
            <div class="edit" @click="editEmergency">修改</div>
            <div class="jie ml-1" @click="unbindEmergency">解绑</div>
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
            <img class="a-img" v-if="!bindInfo.is_bind_qq" src="../../../../assets/account/qq.png"/>
            <img class="a-img" v-else src="../../../../assets/account/qq_a.png"/>
          </div>
          <div class="tit ml-2">绑定QQ</div>
          <div class="desc ml-3">可用绑定的QQ扫码登录</div>
        </div>
        <div class="right d-flex a-center">
          <div class="bangding" v-if="!bindInfo.is_bind_qq">绑定</div>
          <div class="jiebang" v-else>解绑</div>
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
            <img class="a-img" v-if="!bindInfo.is_bind_wechat" src="../../../../assets/account/wx.png"/>
            <img class="a-img" v-else src="../../../../assets/account/wx_a.png"/>
          </div>
          <div class="tit ml-2">绑定微信</div>
          <div class="desc ml-3">可用绑定的微信扫码登录</div>
        </div>
        <div class="right d-flex a-center">
          <div class="bangding" v-if="!bindInfo.is_bind_wechat" @click="showBindWX()">绑定</div>
          <div class="jiebang" v-else>解绑</div>
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
            <img class="a-img" v-if="!bindInfo.is_bind_email" src="../../../../assets/account/email.png"/>
            <img class="a-img" v-else src="../../../../assets/account/email_a.png"/>
          </div>
          <div class="tit ml-2">绑定邮箱</div>
          <div class="desc ml-3" v-if="!bindInfo.is_bind_email">可用绑定的邮箱找回密码</div>
          <div class="desc ml-3" v-else>{{bindInfo.email}}</div>
        </div>
        <div class="right d-flex a-center">
          <div class="bangding" v-if="!bindInfo.is_bind_email" @click="showEmailDialog()">绑定</div>
          <div class="jie-wrap d-flex" v-else>
            <div class="edit" @click="editEmail()">修改</div>
            <div class="jie ml-1" @click="dialogEmailUnbind=true">解绑</div>
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
        <el-button type="primary" @click="SubmitBdPhome('bdPhoneForm')">开启保护</el-button>
      </span>
    </el-dialog>
    <!-- 绑定手机弹框end -->
    <!-- 修改手机弹框 -->
    <el-dialog
      title="修改手机号"
      :visible.sync="dialogChangePhone"
      :before-close="closeDialogChangePhone"
      width="640px">
      <el-form
        label-width="130px" 
        :model="changePhoneForm" :rules="changePhoneRules" 
        ref="changePhoneForm">
        <el-form-item label="当前手机号" prop="phone">
          <p class="font-sm" style="margin-top:2px;color:#333333FF;">{{userInfo.mobile}}</p>
        </el-form-item>
        <el-form-item label="账户密码" prop="pass">
          <el-input class="item-input" 
            v-model="changePhoneForm.pass" placeholder="请填写账户密码"
            type="password" 
            size="small"></el-input>
        </el-form-item>
        <el-form-item label="新手机号" prop="newPhone">
          <el-input class="item-input" 
            v-model="changePhoneForm.newPhone" placeholder="请填写新手机号码"
            size="small"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="yzm">
          <el-input 
            style="width:239px;"
            v-model="changePhoneForm.yzm" 
            placeholder="请输入邮箱收到的验证码" size="small"></el-input>
            <span class="bdPhone-yzm" v-if="showChangePhoneFormByYzm" @click="getYzmByChangePhoneForm">获取验证码</span>
            <span class="bdPhone-yzm-s" v-if="!showChangePhoneFormByYzm">{{timesChangePhoneForm}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogChangePhone = false">取 消</el-button>
        <el-button type="primary" @click="SubmitChangePhome('changePhoneForm')">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改手机弹框end -->
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
    <!-- 紧急联系人解绑弹框 -->
    <el-dialog
      title="解绑邮箱"
      :visible.sync="dialogEmerUnbind"
      width="428px">
      <p style="line-height:25px;">
        <i style="color:#E6A23CFF" class="iconfont icon-warning-circle"></i> 
        删除后系统管理员将无法通过 <span style="color:#2589FFFF"> 紧急联系人</span>
        联系到您，请确认操作！！
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEmerUnbind=false">取消</el-button>
        <el-button type="primary" @click="unBindEmer()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 紧急联系人解绑弹框end -->
    <!-- 邮箱绑定弹框 -->
    <el-dialog
      :title="emailTitle"
      :visible.sync="dialogEmail"
      :before-close="closeDialogEmail"
      width="640px">
      <el-form
        label-width="130px" 
        :model="EmailForm" :rules="EmailRules" 
        ref="EmailForm">
        <el-form-item label="当前邮箱" v-if="isEmailEdit">
          <p style="margin-top:2px;">{{bindInfo.email}}</p>
        </el-form-item>
        <el-form-item label="账号密码" prop="pass" v-if="isEmailEdit">
          <el-input v-model="EmailForm.pass"
            style="width:346px;" type="password"
            placeholder="请输入账号密码" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" v-if="!isEmailEdit">
          <el-input v-model="EmailForm.email"
            style="width:346px;"
            placeholder="请输入邮箱账号" size="small"></el-input>
        </el-form-item>
        <el-form-item label="新邮箱" prop="newEmail" v-if="isEmailEdit">
          <el-input v-model="EmailForm.newEmail"
            style="width:346px;"
            placeholder="请输入新邮箱" size="small"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="yzm">
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
        <el-button type="primary" @click="changeEmail('EmailForm')">开启保护</el-button>
      </span>
    </el-dialog>
    <!-- 邮箱绑定弹框end -->

    <!-- 邮箱解绑弹框 -->
    <el-dialog
      title="解绑邮箱"
      :visible.sync="dialogEmailUnbind"
      width="428px">
      <p>
        <i style="color:#E6A23CFF" class="iconfont icon-warning-circle"></i> 
        解绑后将无法通过<span style="color:#2589FFFF"> 邮箱</span>
        找回密码，请确认操作！
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button>修改密码</el-button>
        <el-button type="primary" @click="unBindEmail()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 邮箱解绑弹框end -->

    <!-- 绑定QQ弹框 -->
    <!-- <el-dialog
      title="绑定QQ"
      :visible.sync="dialogQQ"
      :before-close="closeDialogQQ"
      width="640px">
      <el-form>

      </el-form>
    </el-dialog> -->
    <!-- 绑定QQ弹框end -->
    <!-- 绑定微信弹框 -->
    <el-dialog
      title="微信"
      :visible.sync="dialogWX"
      width="280px">
      <div id="qrcode-wx" class=" d-flex a-center j-center"></div>
      <p class="wxtips font-sm mt-5 pb-2">请使用微信扫一扫以绑定</p>
    </el-dialog>
    <!-- 绑定微信弹框end -->
  </div>
</template>
<script>
import QRCode  from "qrcodejs2"
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
      bindInfo:{},
      dialogEmerUnbind:false,
      dialogEmailUnbind:false,
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
      dialogChangePhone:false,
      timesChangePhoneForm:'',
      showChangePhoneFormByYzm:true,
      dialogWX:false,
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
      isEmergencyEdit:null,
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
      isEmailEdit:false,
      emailTitle:'',
      EmailForm:{
        email:'',
        yzm:'',
        pass:'',
        newEmail:''
      },
      EmailRules:{
        email:[
          {required: true, message: '请输入邮箱账号',trigger:'blur'}
        ],
        yzm:[
          {required: true, message: '请输入邮箱收到的验证码',trigger:'blur'}
        ],
        pass:[
          {required: true, message: '请输入账号密码',trigger:'blur'}
        ],
        newEmail:[
          {required: true, message: '请输入新邮箱',trigger:'blur'}
        ]
      },
      changePhoneForm:{
        pass:'',
        yzm:'',
        newPhone:''
      },
      changePhoneRules:{
        pass:[
          {required: true, message: '请填写账户密码',trigger:'blur'}
        ],
        newPhone:[
          {required: true, message: '请填写新手机号码',trigger:'blur'}
        ],
        yzm:[
          {required: true, message: '请输入短信验证码',trigger:'blur'}
        ]
      }
    }
  },
  created(){
    this.getInfo()
    this.getBindInfo()
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
      let _this = this
      _this.emailTitle = '绑定邮箱',
      _this.isEmailEdit = false
      _this.EmailForm.email = ''
      _this.EmailForm.yzm = ''
      this.dialogEmail = true
    },
    editEmail(){
      let _this = this
      _this.emailTitle = '修改邮箱',
      _this.isEmailEdit = true
      _this.dialogEmail = true
    },
    showBdPhoneDialog(){
      this.dialogPhonebd = true
    },
    showBindWX(){
      this.dialogWX = true
      this.$nextTick (function () {
        document.getElementById("qrcode-wx").innerHTML = ""
        this.qrcode();
      })
    },
    qrcode(){
      let _this = this
      let qrcode = new QRCode('qrcode-wx',{
        width:120,
        height:120,
        text:'sdfsd'
      })
    }
  },
  components:{
    numberTips,
    ySelect,
    QRCode
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
.wxtips{
  text-align: center;
}
</style>