<template>
  <div class="content bg-white rounded box-shadow-page p-1">
    <div class=" bg-gray rounded p-1">
      <div class=" bg-white rounded pt-3 pb-1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px">
          <el-form-item label="协议类型" prop="ruleType">
            <el-input v-model="ruleForm.ruleType" size="small" 
                style="width:518px;" placeholder="填写协议类型">
              </el-input>
          </el-form-item>
          <el-form-item label="协议描述" prop="ruleDesc">
            <el-input v-model="ruleForm.ruleDesc" size="small" 
                style="width:518px;" placeholder="请简要描述协议信息">
              </el-input>
          </el-form-item>
          <el-form-item label="协议详情" prop="ruleXq">
            <yUeditor style="width:760px;" v-model="ruleForm.ruleXq"></yUeditor>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-button @click="goBackList()" size="small">取消</el-button>
      <el-button @click="submitManage('ruleForm')" size="small" type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
import yUeditor from '@/components/yUeditor/yUeditor'
export default {
  data(){
    return {
      ruleForm:{
        ruleType:'',
        ruleDesc:'',
        ruleXq:''
      },
      rules:{
        ruleType:[
          {required: true, message: '填写协议类型',trigger:'blur'}
        ],
        ruleDesc:[
          {required: true, message: '请简要描述协议信息',trigger:'blur'}
        ],
        ruleXq:[
          {required: true, message: '请输入协议详情',trigger:'blur'}
        ]
      }
    }
  },
  created(){

  },
  methods:{
    goBackList(){
      this.$router.go(-1)
    }
  },
  components:{
    yUeditor
  }
}
</script>
<style lang="less" scoped>
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