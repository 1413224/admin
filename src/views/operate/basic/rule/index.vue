<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1">
    <yTitle>协议信息</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="search px-1 pt-2 bg-white rounded">
        <el-form
          :model="searchForm" 
          ref="searchForm" 
          label-width="120px"
          class=" d-flex">
          <el-form-item label="关键字" prop="keyword">
            <el-input v-model="searchForm.keyword" size="small" class="yinput" placeholder="协议类类型/描述"></el-input>
          </el-form-item>
          <div class="pl-5 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
      </div>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe>
          <el-table-column
            prop="name"
            label="协议类型">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="协议描述">
          </el-table-column>
          <el-table-column
            prop="status"
            label="是否开启">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#eee"
                @change="changeStatus(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="goDetail(scope.row.id)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination
      ref="paging" 
      class="pagination mt-2 text-right"
      @size-change="handleSize"
      @current-change="handleCurrent"
      :current-page="curPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNums">
    </el-pagination>
  </div>
</template>
<script>
import actions from './actions/index'
export default {
  data(){
    return {
      searchForm:{
        keyword:''
      },
      tableData:[],
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
    ...actions,
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.getList()
    },
    searchSubmit(formName){
      this.getList()
    },
    handleSize(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      this.getList()
    },
    handleCurrent(currentVal){
      this.curPage = currentVal
      this.getList()
    },
    goDetail(id){
      this.$router.push({
        path:'/operate/basic/rule/editRule',
        query:{
          id:id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>