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
    <el-dialog 
      :visible.sync="dialog"
      width="431.5px"
      :show-close="false" class="dialog">
      <div v-if="0==1">
        <img class="bg" src="../../../../assets/bg-v.png" alt="">
        <div class="text">
          <p class="tit">发现新版本</p>
          <p class="bv mt-1">V.1.0.773</p>
        </div>
        <div class="cont mt ml-5">
          <p>1.解决部分已知bug;</p>
          <p>2.添加分享功能;</p>
          <p>3.收费站详情界面改版；</p>
        </div>
        <div class="btn">立即体验</div>
        <div>
          <el-progress 
          :text-inside="true" 
          :stroke-width="26" 
          :percentage="70" style="width:378px;margin:0 auto;"></el-progress>
          <p style="color:#999999FF;font-size:14px;" class="mt-1 pl-5">系统更新中，请耐心等候...</p>
        </div>
      </div>
      <div class="success-wrap">
        <img class="check" src="../../../../assets/check.png" alt="">
        <p style="color:#333333FF;font-size:30px;margin-top:34px;">系统更新成功！</p>
        <p style="color:#999999FF;font-size:20px;margin-top:19px;">当前版本号：V.1.0.773</p>
        <div class="isee-btn">我知道了</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return {
      dialog:true,
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
.dialog /deep/ .el-dialog__header{
  padding: 0 !important;
}
.dialog /deep/ .el-dialog__body{
  padding: 0 !important;
}
.dialog /deep/ .el-dialog{
  border-radius: 18px;
  // overflow: hidden;
  padding-bottom: 30px;
}
.dialog{
  padding-bottom: 20px;
  // position: relative;
  .check{
    margin: 50px auto 0;
  }
  .success-wrap{
    text-align: center;
  }
  .isee-btn{
    width:317px;
    height:56px;
    line-height: 56px;
    background:linear-gradient(90deg,rgba(66,116,250,1),rgba(67,155,248,1));
    border:1px solid rgba(217,226,235,1);
    border-radius:28px;
    margin: 70px auto 0;
    color: #fff;
    font-size: 26px;
    &:hover{
      cursor: pointer;
    }
  }
  .text{
    color: #fff;
    position: absolute;
    top: 37px;
    left: 26px;
    .tit{
      font-size: 30px;
      font-weight: bold;
    }
    .bv{
      font-size: 24px;
      font-weight: bold;
    }
  }
  .bg{
    margin-top: -50px;
  }
  .cont{
    p{
      font-size: 14px;
      color: #000000FF;
      line-height: 23px;
    }
  }
  .btn{
    width:317px;
    height:56px;
    line-height: 56px;
    text-align: center;
    color: #fff;
    font-size: 24px;
    background:linear-gradient(90deg,rgba(66,116,250,1),rgba(67,155,248,1));
    border-radius:28px;
    margin: 30px auto 0;
    &:hover{
      cursor: pointer;
    }
  }
}

</style>