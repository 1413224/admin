<template>
  <div class="content bg-white rounded box-shadow-page p-1">
    <div class=" bg-gray rounded p-1">
      <div class="cont rounded py-2 bg-white px-1">
        <el-form :model="ruleForm" ref="ruleForm" label-width="140px">
          <el-form-item label="账户名称" class="item">
            <p class="text font-sm">{{info.account}}</p>
          </el-form-item>
          <el-form-item label="昵称" class="item">
            <p class="text font-sm">{{info.nickname}}</p>
          </el-form-item>
          <el-form-item label="操作员编号" class="item">
            <p class="text font-sm">{{info.number}}</p>
          </el-form-item>
          <el-form-item label="手机号" class="item">
            <p class="text font-sm">{{info.mobile ? info.mobile : '未设置'}}</p>
          </el-form-item>
          <!-- <el-form-item label="账户密码" class="item">
            <p class="text font-sm">阿发</p>
          </el-form-item> -->
          <el-form-item label="所属角色" class="item">
            <p class="text font-sm">{{info.perm_group_name}}</p>
          </el-form-item>
          <el-form-item label="角色描述" class="item desc">
            <p class="text font-sm ellipsis">{{info.remark ? info.remark : '未设置'}}</p>
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
            <p class="text font-sm" v-if="info.status==1">启用</p>
            <p class="text font-sm" v-if="info.status==0">禁用</p>
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
      activeNames:['0'],
      info:{}
    }
  },
  created(){
    this.getDetail(this.$route.query.id)
  },
  methods:{
    getDetail(id){
      // console.log(id)
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.PermAccount.GetInfoById,{
        token:_this.$utils.getToken(),
        id:id
      }).then((res)=>{
        let data = res.data.data
        _this.info = data
      })
    }
  }
}
</script>
<style lang="less" scoped>
.text{
  color: #22242F;
  line-height: 40px;
  margin-top: 1px;
}
.desc{
  width: 700px;
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