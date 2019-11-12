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
          <el-form-item label="银行编码" prop="code">
            <el-input v-model="rulesForm.code" 
              class="form-input" placeholder="输入银行编码"
              size="small"></el-input>
          </el-form-item>
          <el-form-item label="银行logo" prop="logo">
            <div class="nopic d-flex a-center j-center"
              @click="showDialog()" 
              v-if="!rulesForm.logo">+</div>
            <div class="pic" v-if="rulesForm.logo"
              @click="showDialog()">
              <img :src="rulesForm.logo" alt="">
            </div>
            <p class="tips font-sm">尺寸建议750x750像素以上，大小2M以下</p>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="rulesForm.status">
              <el-radio label="1">显示</el-radio>
              <el-radio label="0">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-button @click="goBackList()" size="small">取消</el-button>
      <el-button @click="submitManage('rulesForm')" size="small" type="primary">保存</el-button>
    </div>
    <uploadPicture v-model="showPicture" @selPictureUrl="getPicUrl"></uploadPicture>
  </div>
</template>
<script>
import uploadPicture from '@/components/uploadPicture/uploadPicture'

export default {
  data(){
    return {
      showPicture:false,
      isEdit:false,
      rulesForm:{
        bankName:'',
        logo:'',
        code:'',
        status:'1'
      },
      rules:{
        bankName:[
          {required: true, message: '请输入银行名称',trigger:'blur'}
        ],
        logo:[
          {required: true, message: '输选择银行logo',trigger:'blur'}
        ],
        code:[
          {required: true, message: '请输入银行编码',trigger:'blur'}
        ]
      }
    }
  },
  created(){
    let _this = this
    if(_this.$route.query.id){
      _this.isEdit = true
      _this.getInfoById()
    }else{
      _this.isEdit = false
    }
  },
  methods:{
    goBackList(){
      this.$router.go(-1)
    },
    getInfoById(){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.Bank.GetInfoById,{
        token:_this.$utils.getToken(),
        id:_this.$route.query.id
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.rulesForm.logo = data.logo
          _this.rulesForm.bankName = data.name
          _this.rulesForm.code = data.bank_code
          _this.rulesForm.status = data.status.toString()
        }
      })
    },
    submitManage(formName){
      let _this = this,
        url = '',
        params = {};
      _this.$refs[formName].validate((valid)=>{
        if(!valid){
          return false
        }

        params = {
          token:_this.$utils.getToken(),
          name:_this.rulesForm.bankName,
          bank_code:_this.rulesForm.code,
          logo:_this.rulesForm.logo,
          status:_this.rulesForm.status
        }

        if(!_this.isEdit){
          url = _this.baseUrl + _this.url.Bank.Add
        }else{
          url = _this.baseUrl + _this.url.Bank.ChangeInfoById
          params.id = _this.$route.query.id
        }
        _this.$http.post(url,params).then((res)=>{
          if(res.data.ret==200){
            if(!_this.isEdit){
              _this.$message({
                type: 'success',
                message: '新增成功!'
              })
            }else{
              _this.$message({
                type: 'success',
                message: '编辑成功!'
              })
            }
            this.$router.push({
              path:'/operate/basic/bank'
            })
          }
        })
      })
    },
    getPicUrl(url){
      this.rulesForm.logo = url
    },
    showDialog(){
      this.showPicture = true
    }
  },
  components:{
    uploadPicture
  }
}
</script>
<style lang="less" scoped>
.nopic{
  width: 120px;
  height: 120px;
  border-radius: 3px;
  border: 1px dashed #E3E2E5FF;
  font-size: 28px;
  color: #ccc;
  &:hover{
    cursor: pointer;
  }
}
.pic{
  width: 120px;
  height: 120px;
  border-radius: 3px;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
  }
  &:hover{
    cursor: pointer;
  }
}
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