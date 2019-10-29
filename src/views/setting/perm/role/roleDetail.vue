<template>
  <div class="content bg-white box-shadow-page rounded p-1">
    <div class=" bg-gray rounded p-1">
      <div class=" bg-white rounded px-1 py-4">
        <el-form :model="ruleForm" :rules="rules" 
          ref="ruleForm" label-width="120px">
          <el-form-item label="角色名称" class="item">
            <p class="text font-sm">{{detailData.name}}</p>
          </el-form-item>
          <el-form-item label="角色描述" class="item">
            <p class="text font-sm">{{detailData.remark}}</p>
          </el-form-item>
          <el-form-item label="权限" class="item">
            <el-collapse v-model="activeNames" class="rounded">
              <el-collapse-item title="一致性 Consistency" name="0">
                <div class="list-item">
                  <p class="tit p-1">首页导航图标</p>
                  <div class="cont-wrap d-flex py-1">
                    <p class="label">查看列表</p>
                    <p class="label">查看列表</p>
                    <p class="label">查看列表</p>
                    <p class="label">查看列表</p>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item label="状态" class="item">
            <p class="text font-sm">{{detailData.status == 1 ? '启用' : '禁用'}}</p>
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
      ruleForm:{},
      rules:{},
      activeNames:['0'],
      detailData:'',
      permList:[]
    }
  },
  created(){
    this.getDetail()
    // this.GetPerm()
  },
  methods:{
    // GetPerm(){
    //   let _this = this
    //   _this.$http.post(_this.cloudUrl + _this.url.cloud.Perm.GetPermByRoleType,{
    //     role_type:_this.url.role_type
    //   }).then((res)=>{
    //     if(res.data.ret==200){
    //       let data = res.data.data
    //     }
    //   })
    // },
    getDetail(){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.commonPermGroup.GetInfoById,{
        token:_this.$utils.getToken(),
        id:this.$route.query.id
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.detailData = data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.text{
  color: #22242F;
  line-height: 40px;
}
.item{
  margin-bottom: 0;
}
.item /deep/ .el-form-item__label{
  color:#686A73;
}
.item /deep/ .el-form-item__label{
  padding: 0 30px 0 0;
}
.el-collapse{
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  width: 700px;
  overflow: hidden;
}
.el-collapse /deep/ .el-collapse-item__header{
  background: #FAFAFA;
  padding-left: 10px;
}
.list-item{
  .tit{
    color: #686A73;
  }
  .cont-wrap{
    background: #F2F2F6;
    .label{
      padding: 0 20px;
    }
  }
}
</style>