<template>
  <div>
    <yTitle>新增代理</yTitle>
    <div class="bg-gray py-3 px-2 mt-2 rounded">
      <span class="tit">基础信息</span>
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addFrom"
        label-width="110px"
        class="mt-2"
        style="padding-left:130px;">
        <el-row>
          <el-col :span="6">
            <el-form-item label="ID" prop="id">
              <el-input v-model="addForm.id" size="small" placeholder="请输入id"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="代理名称" prop="name">
              <el-input v-model="addForm.name" size="small" placeholder="请输入代理名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="代理logo" prop="logo">
              <upLoadImage v-model="addForm.logo"></upLoadImage>
              <p style="color:#999;font-size:12px;">尺寸建议750x750像素以上，大小2M以下。</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系人姓名" prop="cname">
              <el-input v-model="addForm.cname" size="small" placeholder="请输入联系人姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="联系人手机" prop="phone">
              <el-input v-model="addForm.phone" size="small" placeholder="请输入联系人手机"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="申请类型" prop="type">
              <ySelect
                v-model="addForm.type" 
                :options="typeOptions" :configs="typeConfigs"
                placeholder="请选择申请类型"
                style="width:100%;">
              </ySelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="申请等级" prop="grade">
              <ySelect
                v-model="addForm.grade" 
                :options="gradeOptions" :configs="gradeConfigs"
                placeholder="请选择申请等级"
                style="width:100%;">
              </ySelect>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="bg-gray py-3 px-2 mt-2 rounded">
      <span class="tit">申请信息</span>
      
    </div>
    <div class="footer bg-white py-1 d-flex j-center">
      <div>
        <el-button size="small" @click="backPrev()">取消</el-button>
        <el-button size="small" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import upLoadImage from '@/components/upLoadImage/upLoadImage'
export default {
  data(){
    return {
      addForm:{
        id:'',
        name:'',
        logo:'',
        cname:'',
        phone:'',
        type:'',
        grade:''
      },
      addRules:{
        id:[
          {required: true, message: '请输入ID',trigger:'blur'}
        ],
        name:[
          {required: true, message: '请输入代理名称',trigger:'blur'}
        ],
        logo:[
          {required: true, message: '请选择代理logo',trigger:'blur'}
        ],
        cname:[
          {required: true, message: '请输入联系人姓名',trigger:'blur'}
        ],
        phone:[
          {required: true, message: '请输入联系人手机',trigger:'blur'}
        ],
        type:[
          {required: true, message: '请选择申请类型',trigger:'blur'}
        ],
        grade:[
          {required: true, message: '请选择申请等级',trigger:'blur'}
        ]
      },
      typeOptions:[

      ],
      typeConfigs:{},
      gradeOptions:[

      ],
      gradeConfigs:{}
    }
  },
  methods:{
    backPrev(){
      this.$refs['addFrom'].resetFields()
      this.$router.back()
    }
  },
  components:{
    ySelect,
    upLoadImage
  }
}
</script>
<style lang="less" scoped>
.tit{
  color: #333;
  font-size: 14px;
  font-weight: bold;
}
.footer{
  box-shadow:0px 0px 5px 0px rgba(34,36,47,0.1);
  border-radius: 10px 10px 0 0;
  position: fixed;
  bottom: 0;
  left: 262px;
  width: calc(100% - 272px);
  .el-button--small{
    padding: 9px 25px;
  }
}
</style>