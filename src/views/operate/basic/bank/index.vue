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
                <img class="logo" src="../../../../assets/logo.png" alt="">
                <p class="ml-1">中国银行</p>
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
              <!-- <el-button @click="goDetail(scope.row)" type="text" size="small">详情</el-button> -->
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
      tableData:[{}],
      selection:[],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
    }
  },
  created(){

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
        _this.getList(null,2)
      }
      if(column.order=='ascending'){
        _this.getList(null,1)
      }
    },
    getList(){

    },
    add(){
      this.$router.push({
        path:'/operate/basic/bank/addBank',
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