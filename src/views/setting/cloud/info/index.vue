<template>
  <div class=" bg-white rounded box-shadow-page py-2 px-1">
    <yTitle>授权管理</yTitle>
    <div class=" bg-gray rounded mt-2 p-1">
      <div class=" bg-white rounded py-2">
        <el-form
          :model="ruleForm" 
          :rules="rules" 
          ref="ruleForm" 
          label-width="150px">
          <el-form-item label="域名">
            <p class="text font-sm">http://pms.9yetech.com</p>
          </el-form-item>
          <el-form-item label="站点IP">
            <p class="text font-sm">http://pms.9yetech.com</p>
          </el-form-item>
          <el-form-item label="站点ID">
            <p class="text font-sm">http://pms.9yetech.com</p>
          </el-form-item>
          <el-form-item label="授权码" prop="code" class="">
            <el-input 
              v-model="ruleForm.code" 
              size="small" placeholder="请输入授权码"
              style="width:518px;"></el-input>
            <span class="text stext font-sm">请联系客服将IP及站点ID提交给客服，索取授权码，保护好您的授权码，避免泄露</span>
          </el-form-item>
          <el-form-item label="授权状态">
              <el-button class="status" type="success" plain size="mini">已授权</el-button>
              <el-button class="status" type="" plain size="mini">未授权</el-button>
          </el-form-item>
          <el-form-item label="更新服务时间">
            <p class="text font-sm">2019-02-01</p>
          </el-form-item>
          <el-form-item label="官方网站">
            <p class="text font-sm">http://pms.9yetech.com</p>
          </el-form-item>
          <el-form-item label="版权信息">
            <p class="text font-sm">已装1.2.3.69877</p>
            <p class=" font-sm" style="color:#2589FFFF;">升级1.2.3.69877</p>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">验证授权</el-button>
            <el-button type="success" size="mini">系统升级</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      ruleForm:{
        code:''
      },
      rules:{
        code:[
          {required: true, message: '请输入授权码',trigger:'blur'}
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
.text{
  color: #333333FF;
  margin-top: 2px;
}
.stext{
  display: inline-block;
  height: 45px;
  line-height: 15px;
  width: 300px;
  position: relative;
  top: 8px;
  left: 10px;
}
</style>