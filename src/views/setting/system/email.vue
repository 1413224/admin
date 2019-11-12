<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1">
    <yTitle>邮箱服务</yTitle>
    <div class=" bg-gray rounded p-1 mt-2 pb-5">
      <div class="search p-1 bg-white rounded">
        <div class="pt">
          <el-button class="search-btn" type="primary" size="mini" 
            @click="sendEmail()">发送测试邮件</el-button>
          <!-- <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button> -->
        </div>
      </div>

      <div class="form-wrap mt-1 bg-white pt-2 rounded pb-5">
        <el-form
          :model="sendForm"
          :rules="sendSearchForm"
          ref="sendForm" 
          label-width="220px">
          <el-form-item label="STMP服务器" prop="stmpType" required>
            <el-radio-group v-model="sendForm.stmpType">
              <el-radio :label="1">网易邮箱服务器</el-radio>
              <el-radio :label="2">QQ邮箱服务器</el-radio>
              <el-radio :label="3">自定义</el-radio>
            </el-radio-group>
            <span class="tips ml-2">有特殊需要请自定义AMTP服务器</span>
          </el-form-item>
          <div v-if="sendForm.stmpType==1">
            <el-form-item label="发送账户用户名" prop="userName">
                <el-input v-model="sendForm.userName" size="small" 
                  style="width:518px;" placeholder="请输入发送账户用户名">
                </el-input>
                <span class="tips ml-2">指定发送邮件的用户名，例如：test@163.com</span>
            </el-form-item>
            <el-form-item label="客户端授权密码" prop="pass">
                <el-input v-model="sendForm.pass" size="small"
                  style="width:518px;" placeholder="请输入客户端授权密码">
                </el-input>
                <span class="tips ml-2">指定发送邮件的密码</span>
            </el-form-item>
            <el-form-item label="发件人名称" prop="sendName">
                <el-input v-model="sendForm.sendName" size="small" 
                  style="width:518px;" placeholder="请输入发件人名称">
                </el-input>
                <span class="tips ml-2">指定发送邮件的密码</span>
            </el-form-item>
            <el-form-item label="邮件签名" prop="desc">
              <el-input type="textarea" style="width:440px;" 
                placeholder="请输入..."
                :rows="3" v-model="sendForm.desc"></el-input>
                <span class="tips textArea ml-2">指定邮件末尾添加的签名信息</span>
            </el-form-item>
          </div>

          <div v-if="sendForm.stmpType==2">
            <el-form-item label="发送账户用户名" prop="qquserName">
                <el-input v-model="sendForm.qquserName" size="small" 
                  style="width:518px;" placeholder="请输入发送账户用户名">
                </el-input>
                <span class="tips ml-2">指定发送邮件的用户名，例如：test@163.com</span>
            </el-form-item>
            <el-form-item label="客户端授权密码" prop="qqpass">
                <el-input v-model="sendForm.qqpass" size="small"
                  style="width:518px;" placeholder="请输入客户端授权密码">
                </el-input>
                <span class="tips ml-2">指定发送邮件的密码</span>
            </el-form-item>
            <el-form-item label="发件人名称" prop="qqsendName">
                <el-input v-model="sendForm.qqsendName" size="small" 
                  style="width:518px;" placeholder="请输入发件人名称">
                </el-input>
                <span class="tips ml-2">指定发送邮件的密码</span>
            </el-form-item>
            <el-form-item label="邮件签名" prop="qqdesc">
              <el-input type="textarea" style="width:440px;" 
                placeholder="请输入..."
                :rows="3" v-model="sendForm.qqdesc"></el-input>
                <span class="tips textArea ml-2">指定邮件末尾添加的签名信息</span>
            </el-form-item>
          </div>

          <div class="zdy-wrap" v-if="sendForm.stmpType==3">
            <el-form-item label="STMP服务器地址" prop="zdyStmURL">
                <el-input v-model="sendForm.zdyStmURL" size="small" 
                  style="width:518px;" placeholder="请输入STMP服务器地址">
                </el-input>
                <span class="tips ml-2">指定STMP服务器的地址</span>
            </el-form-item>
            <el-form-item label="STMP服务器端口" prop="zdyStmpro">
                <el-input v-model="sendForm.zdyStmpro" size="small" 
                  style="width:518px;" placeholder="请输入STMP服务器端口">
                </el-input>
                <span class="tips ml-2">指定STMP服务器的端口</span>
            </el-form-item>
            <el-form-item label="使用SSL加密" prop="zdySSLtype" required>
              <el-radio-group v-model="sendForm.zdySSLtype">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
              <span class="tips ml-2">开启此项后，连接将用的SSL的形式，此项需要SMTP服务器支持</span>
            </el-form-item>
            <el-form-item label="发送账户用户名" prop="zdySendUser">
                <el-input v-model="sendForm.zdySendUser" size="small" 
                  style="width:518px;" placeholder="请输入发送账户用户名">
                </el-input>
                <span class="tips ml-2">指定发送邮件的用户名，例如test@163.com</span>
            </el-form-item>
            <el-form-item label="SMTP客户端授权密码" prop="zdySendCode">
                <el-input v-model="sendForm.zdySendCode" size="small"
                  style="width:518px;" placeholder="请输入SMTP客户端授权密码">
                </el-input>
                <span class="tips ml-2">指定发送邮件的密码，QQ邮箱此处为授权码</span>
            </el-form-item>
            <el-form-item label="发件人名称" prop="zdySendName">
                <el-input v-model="sendForm.zdySendName" size="small" 
                  style="width:518px;" placeholder="请输入发件人名称">
                </el-input>
                <span class="tips ml-2">指定发送邮件的发信人名称</span>
            </el-form-item>
            <el-form-item label="邮件签名" prop="adyEmailDesc">
              <el-input type="textarea" style="width:440px;" 
                placeholder="请输入..."
                :rows="3"
                v-model="sendForm.adyEmailDesc"></el-input>
                <span class="tips textArea ml-2">指定邮件末尾添加的签名信息</span>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-button @click="goBackList()" size="small">取消</el-button>
      <el-button @click="submitManage('sendForm')" size="small" type="primary">保存</el-button>
    </div>

    <el-dialog
      title="发送测试邮件"
      :visible.sync="sendEmailDialog"
      width="640px">
      <div>
        <el-form
          :model="sendEmailForm" 
          :rules="sendEmailRules" ref="sendEmailForm" 
          label-width="140px">
          <el-form-item label="收件人邮箱：" prop="email">
            <el-input size="small" style="width:346px;" 
              v-model="sendEmailForm.email" placeholder="请填写邮件人邮箱地址"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendEmailDialog = false">取 消</el-button>
        <el-button type="primary" @click="sendEmailSubmit('sendEmailForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import actions from './actions/email'
export default {
  data(){
    return {
      sendForm:{
        stmpType:1,
        userName:'',
        pass:'',
        sendName:'',
        zdySSLtype:0,
        zdyStmURL:'',
        zdyStmpro:'',
        zdySendUser:'',
        zdySendCode:'',
        zdySendName:'',
        adyEmailDesc:'',

        qquserName:'',
        qqpass:'',
        qqsendName:'',
        qqdesc:''

      },
      sendSearchForm:{
        userName:[
          {required: true, message: '请输入发送账户用户名',trigger:'blur'}
        ],
        qquserName:[
          {required: true, message: '请输入发送账户用户名',trigger:'blur'}
        ],
        pass:[
          {required: true, message: '请输入客户端授权密码',trigger:'blur'}
        ],
        qqpass:[
          {required: true, message: '请输入客户端授权密码',trigger:'blur'}
        ],
        sendName:[
          {required: true, message: '请输入发件人名称',trigger:'blur'}
        ],
        qqsendName:[
          {required: true, message: '请输入发件人名称',trigger:'blur'}
        ],
        zdyStmURL:[
          {required: true, message: '请输入STMP服务器地址',trigger:'blur'}
        ],
        zdyStmpro:[
          {required: true, message: '请输入STMP服务器端口',trigger:'blur'}
        ],
        zdySendUser:[
          {required: true, message: '请输入发送账户用户名',trigger:'blur'}
        ],
        zdySendCode:[
          {required: true, message: '请输入SMTP客户端授权密码',trigger:'blur'}
        ],
        zdySendName:[
          {required: true, message: '请输入发件人名称',trigger:'blur'}
        ]
      },
      sendEmailDialog:false,
      sendEmailForm:{
        email:''
      },
      sendEmailRules:{
        email:[
          {required: true, message: '请输入邮件人邮箱地址',trigger:'blur'}
        ]
      },
      Info:{}
    }
  },
  created(){
    let _this = this
    _this.getInfo()
  },
  methods:{
    ...actions,
    sendEmail(){
      let _this = this
      _this.sendEmailForm.email = ''
      _this.sendEmailDialog = true
    },
    goBackList(){
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.form-wrap{
  .tips{
    font-size: 12px;
    color: #999999FF;
    display: inline-block;
  }
  .textArea{
    position: relative;
    top: -40px;
  }
}
.bg-gray{
  padding-bottom: 120px;
}
.bottom{
  position: fixed;
  bottom: 0;
  left: 264px;
  width: calc(100% - 274px);
  padding: 10px 0;
  text-align: center;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px 5px 0 0;
  .el-button--small{
    padding: 8px 30px;
  }
}
</style>