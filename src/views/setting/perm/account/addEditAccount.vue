<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1 pb-1">
    <div class=" bg-gray p-1 rounded">
      <div class="cont rounded bg-white p-1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm" label-width="120px" class="mt-3">
          <el-form-item label="账户名称" prop="name">
              <el-input v-model="ruleForm.name" size="small" 
                style="width:518px;" placeholder="请输入操作员账户名称">
              </el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
              <el-input v-model="ruleForm.nickName" size="small" 
                style="width:518px;" placeholder="请输入操作员昵称">
              </el-input>
          </el-form-item>
          <el-form-item label="操作员编号" prop="nums">
              <el-input v-model="ruleForm.nums" size="small" 
                style="width:518px;" placeholder="请输入操作员编号">
              </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone" v-if="!isEdit">
              <el-input v-model="ruleForm.phone" size="small" 
                style="width:518px;" placeholder="请输入手机号"
                @input="changePhone()">
              </el-input>
          </el-form-item>
          <el-form-item label="手机号" v-if="isEdit">
            <p class="font-sm" style="margin-top:2px;">
              {{info.mobile ? info.mobile : '未设置'}}
            </p>
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
          <el-form-item label="所属角色" prop="role">
            <ySelect
                v-model="ruleForm.role" 
                :options="roleOptions"
                @changeSel="changeRoleSel"
                placeholder="请选择所属角色">
            </ySelect>
            <p class="font-sm tips ml-2">如果您选择了角色，则此用户本身就继承了此角色的所有权限</p>
          </el-form-item>
          <el-form-item label="操作员描述" prop="desc">
              <el-input v-model="ruleForm.desc" size="small" 
                style="width:440px;" placeholder="请输入..." 
                type="textarea" :rows="4" maxlength="50" show-word-limit>
              </el-input>
          </el-form-item>
          <el-form-item label="权限选择" required>
            <div v-show="isSuperAccount" class="font-sm" style="margin-top:2px;">
              {{superAccountText}}
            </div>
            <div v-show="!isSuperAccount">
              <el-collapse v-model="activeNames" class="collapse">
                <el-collapse-item :name="index" 
                  v-for="(item,index) in roleList" :key="index">
                  <template slot="title">
                    <el-checkbox 
                      :indeterminate="item.isIndeterminate"
                      v-model="item.checked" 
                      @change="checked => oneChange(checked,item,index)"></el-checkbox> 
                    <p class=" ml-1">{{item.name}}</p>
                  </template>
                  <div class="item-collapse"
                    v-for="(itm,idx) in item.children" :key="idx">
                    <el-checkbox :indeterminate="itm.isIndeterminate" class="checkall pl-4 py-1" 
                      v-model="itm.checkAll" @change="checked => handleCheckAllChange(checked,itm,index,idx)">
                      {{itm.name}}
                    </el-checkbox>
                    
                    <div class="list bg-gray py-1 pl-7" v-if="itm.children.length!=0">
                      <el-checkbox-group
                        v-model="itm.checkedCities" @change="value => handleCheckedCitiesChange(value,itm,index,idx)">
                        <el-checkbox v-for="(listItem,i) in itm.children" 
                          :label="listItem.id" :key="i"
                          :checked="listItem.checked">
                          {{listItem.name}}
                        </el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
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
import ySelect from '@/components/ySelect/index'
import actions from './actions/addEditAccount'
export default {
  data(){
    return {
      isSuperAccount:false,
      superAccountText:'',
      isEdit:null,
      activeYZM:false,
      showChangePhoneTime:true,
      timesChangePhone:'',
      ruleForm:{
        name:'',
        nickName:'',
        nums:'',
        phone:'',
        yzm:'',
        pass:'',
        newPass:'',
        desc:'',
        status:1,
        role:'',
      },
      rules:{
        name:[
          {required: true, message: '请输入操作员账户名称',trigger:'blur'}
        ],
        pass:[
          {required: true, message: '请输入账户密码',trigger:'blur'}
        ],
        role:[
          {required: true, message: '请选择所属角色',trigger:'blur'}
        ]
      },
      roleOptions:[
        {}
      ],
      roleList:[],
      activeNames:['0'],
      showEditPass:false,
      ids:null,
      info:{}
    }
  },
  created(){
    let _this = this
    if(_this.$route.query.id){
      _this.isEdit = true
      _this.GetPermList().then(()=>{
        _this.getGroupList().then(()=>{
          _this.getInfo()
        })
      })
    }else{
      _this.isEdit = false
    }
    _this.GetPermList()
    _this.getGroupList()
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
  },
  components:{
    ySelect
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