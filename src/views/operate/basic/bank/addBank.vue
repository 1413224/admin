<template>
  <div class="content bg-white rounded box-shadow-page p-1">
    <div class=" bg-gray rounded p-1">
      <div class=" bg-white rounded pt-3 pb-3">
        <el-form
          :model="rulesForm" 
          :rules="rules"
          ref="rulesForm" 
          label-width="120px">
          <el-form-item label="银行名称" prop="bankName">
            <el-input v-model="rulesForm.bankName" 
              class="form-input" placeholder="输入银行名称"
              size="small"></el-input>
          </el-form-item>
          <el-form-item label="银行logo" prop="logo">
            <p class="tips font-sm">尺寸建议750x750像素以上，大小2M以下</p>
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
export default {
  data(){
    return {
      rulesForm:{
        bankName:'',
        logo:''
      },
      rules:{
        bankName:[
          {required: true, message: '输入银行名称',trigger:'blur'}
        ],
        logo:[
          {required: true, message: '输选择银行logo',trigger:'blur'}
        ]
      }
    }
  },
  created(){

  },
  methods:{

  }
}
</script>
<style lang="less" scoped>
.tips{
  color: #999999FF;
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