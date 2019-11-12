<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1">
    <yTitle>合作银行</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded p-1">
        <el-form
          :model="searchForm" 
          ref="searchForm" 
          label-width="80px"
          class=" d-flex border-bottom">
          <el-form-item label="关键字" prop="keyword">
            <el-input v-model="searchForm.keyword" size="small" class="yinput" placeholder="银行名称"></el-input>
          </el-form-item>
          <div class="pl-5 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
        <div class="btn-wrap mt-2 mb-1">
          <el-button style="margin-left:20px;" @click="add()" type="primary" size="mini">新增合作银行</el-button>
          <el-button @click="delAccount()" plain size="mini">批量删除</el-button>
        </div>
      </div>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe
          @selection-change="selectionChange"
          @sort-change="sortChange"
          :default-sort = "{prop: 'update_time', order: 'descending'}"
          style="width:100%;">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="bankName"
            label="银行名称">
            <template slot-scope="scope">
              <div class=" d-flex a-center">
                <img class="logo" :src="scope.row.logo" alt="">
                <p class="ml-1">{{scope.row.name}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="更新时间"
            sortable="custom"
            prop="update_time"
            :sort-orders="['ascending', 'descending']">
            <template slot-scope="scope">
              <div>{{scope.row.update_time|formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="goEdit(scope.row.id)" type="text" size="small">编辑</el-button>
              <el-button 
              v-if="scope.row.type!=0"
              @click="delRole(scope.row.id)" 
              type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      searchForm:{
        keyword:''
      },
      tableData:[],
      selection:[],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
    }
  },
  created(){
    this.getList()
  },
  methods:{
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.getList()
    },
    searchSubmit(formName){
      this.getList()
    },
    selectionChange(selection){
      this.selection = selection
    },
    sortChange(column){
      // console.log(column)
      let _this = this
      if(column.order=='descending'){
        _this.getList(2)
      }
      if(column.order=='ascending'){
        _this.getList(1)
      }
    },
    getList(sort){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.Bank.GetList,{
        token:_this.$utils.getToken(),
        keyword:_this.searchForm.keyword,
        status:-1,
        sort:sort ? sort : 2
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.tableData = data.list
        }
      })
    },
    delRole(id){
      let _this = this
      _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        _this.$http.post(_this.baseUrl + _this.url.Bank.DeleteBankByIds,{
          token:_this.$utils.getToken(),
          ids:id
        }).then((res)=>{
          if(res.data.ret==200){
            _this.$message({
              type: 'success',
              message: '删除成功!'
            })
            _this.getList()
          }
        })
      }).catch(()=>{
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    delAccount(){
      let _this = this,
        idsArr = [],
        ids = '';
      if(_this.selection.length==0){
        _this.$message({
          type: 'warning',
          message: '请选择需要删除的数据!'
        })
        return false
      }
      _this.selection.map((item,index)=>{
        idsArr.push(item.id)
      })
      ids = idsArr.toString()

      _this.$confirm('此操作将永久删除该信息, 是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        _this.$http.post(_this.baseUrl + _this.url.Bank.DeleteBankByIds,{
          token:_this.$utils.getToken(),
          ids:ids
        }).then((res)=>{
          if(res.data.ret==200){
            _this.$message({
              type: 'success',
              message: '删除成功!'
            })
            _this.getList()
          }
        })
      }).catch(()=>{
        _this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add(){
      this.$router.push({
        path:'/operate/basic/bank/addBank',
      })
    },
    goEdit(id){
      this.$router.push({
        path:'/operate/basic/bank/addBank',
        query:{
          id:id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.logo{
  width: 36px;
  height: 36px;
}
</style>