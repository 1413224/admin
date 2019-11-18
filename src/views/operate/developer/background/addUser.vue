<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1 pb-1">
    <div class=" bg-gray p-1 rounded">
      <div class="cont rounded bg-white p-1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm" label-width="120px" class="mt-3">
          <el-form-item label="账户名称" prop="name" v-if="!isEdit">
              <el-input v-model="ruleForm.name" size="small" 
                style="width:518px;" placeholder="请输入账户名称">
              </el-input>
          </el-form-item>
          <el-form-item label="账户名称" v-if="isEdit">
            <p>{{account}}</p>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
              <el-input v-model="ruleForm.nickName" size="small" 
                style="width:518px;" placeholder="请输入账户昵称">
              </el-input>
          </el-form-item>
          <el-form-item label="手机号" v-if="isEdit">
            <p>{{phone}}</p>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" v-if="!isEdit">
              <el-input v-model="ruleForm.phone" size="small" 
                style="width:518px;" placeholder="请输入手机号"
                @input="changePhone()">
              </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="yzm" v-if="!isEdit">
              <el-input v-model="ruleForm.yzm" size="small" 
                style="width:380px;" placeholder="请输入手机验证码">
              </el-input>
              <div class="yzm" :class="{'active':activeYZM}"
                @click="sendYZM()" v-if="showChangePhoneTime">获取验证码</div>
              <div class="second" v-if="!showChangePhoneTime">{{timesChangePhone}}</div>
          </el-form-item>
          <el-form-item label="账户密码" prop="pass" v-if="!isEdit">
              <el-input v-model="ruleForm.pass" size="small" 
                style="width:518px;" type="password" placeholder="请输入账户密码">
              </el-input>
          </el-form-item>
          <!-- 编辑 -->
          <el-form-item v-if="isEdit" label="账户密码" class="">
            <div v-if="!showEditPass" style="display:inline-block;">
              <el-button type="text" @click="editPass">修改密码</el-button>
            </div>

            <div v-if="showEditPass" style="display:inline-block;">
              <el-input style="width:518px;" v-model="ruleForm.newPass" 
                placeholder="请输入新密码" size="small" type="password"
                class="mr-1"></el-input>
              <el-button type="text" @click="cancel()">取消</el-button>
            </div>
            <span class="edit-text font-sm">修改密码后可能导致<span>用户无法登录</span>，请谨慎操作！</span>
          </el-form-item>
          <!-- 编辑end -->
          <el-form-item label="账户描述" prop="desc">
            <el-input v-model="ruleForm.desc" size="small" 
              style="width:518px;" type="textarea" placeholder="请输入..."
              :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status" required>
            <el-radio-group v-model="ruleForm.status">
              <el-radio :label="1">可用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-button @click="goBackList()" size="small">取消</el-button>
      <el-button @click="submitManage('ruleForm')" size="small" type="primary">确定</el-button>
    </div>
  </div>
</template>
<script>
import actions from './actions/addUser'
export default {
  data(){
    return {
      isEdit:false,
      activeYZM:false,
      showChangePhoneTime:true,
      timesChangePhone:'',
      ruleForm:{
        name:'',
        phone:'',
        yzm:'',
        pass:'',
        desc:'',
        status:1,
        nickName:'',
        newPass:''
      },
      rules:{
        name:[
          {required: true, message: '请输入账户名称',trigger:'blur'}
        ],
        phone:[
          {required: true, message: '请输入手机号',trigger:'blur'}
        ],
        pass:[
          {required: true, message: '请输入账户密码',trigger:'blur'}
        ],
        status:[
          {required: true, message: '请选择状态',trigger:'blur'}
        ],
        nickName:[
          {required: true, message: '请输入账户昵称',trigger:'blur'}
        ]
      },
      showEditPass:false,
      account:'',
      phone:''
    }
  },
  created(){
    let _this = this
    if(_this.$route.query.id){
      _this.isEdit = true
      _this.getInfo()
    }
  },
  methods:{
    ...actions,
    changePhone(){
      // console.log(this.ruleForm.phone)
      let _this = this
      if(!_this.$utils.testPhone(_this.ruleForm.phone)){
        _this.activeYZM = true
      }else{
        _this.activeYZM = false
      }
    },
    editPass(){
      let _this = this
      _this.ruleForm.newPass = ''
      _this.showEditPass = true
    },
    cancel(){
      this.showEditPass = false
    },
    goBackList(){
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  margin-bottom: 70px;
}
.yzm{
  width: 120px;
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  color: #999999FF;
  background: #F2F2F6FF;
  border-radius: 3px;
  text-align: center;
  display: inline-block;
  margin-left: 13px;
  &.active{
    background: #2589FFFF;
    color: #fff;
    &:hover{
      cursor: pointer;
    }
  }
}
.second{
  display: inline-block;
  width: 120px;
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  color: #999999FF;
  background: #F2F2F6FF;
  border-radius: 3px;
  text-align: center;
  margin-left: 13px;
}
.tips{
  color: #999999FF;
  display: inline-block;
}
.bottom{
  position: fixed;
  bottom: 0;
  left: 262px;
  width: calc(100% - 274px);
  padding: 10px 0;
  text-align: center;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px 5px 0 0;
  z-index: 1;
  .el-button--small{
    padding: 8px 30px;
  }
}
.collapse{
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  border-radius: 5px;
  overflow: hidden;
  width: 700px;
}
.collapse /deep/ .el-collapse-item__header{
  background: #FAFAFA;
  padding-left: 10px;
}
.collapse /deep/ .el-checkbox+.el-checkbox{
  margin-left: 0;
}
.edit-text{
  color: #999999FF;
  display: inline-block;
  margin-left: 20px;
  span{
    color: #F56C6CFF;
  }
}
</style>