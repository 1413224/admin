<template>
  <div class=" bg-white rounded box-shadow-page py-2 px-1">
    <yTitle>应用工厂</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded px-1 py-2">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="110px" class="mt-1 d-flex border-bottom">
          <el-form-item label="关键字" prop="keyword">
            <el-input class="yinput" size="small" v-model="ruleForm.keyword"
              placeholder="账户名/姓名/手机号"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <ySelect
              v-model="ruleForm.status"
              :options="statusOptions"></ySelect>
          </el-form-item>
          <div class="pl-3 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('ruleForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('ruleForm')">清空</el-button>
          </div>
        </el-form>
        <div class="btn-wrap mt-2">
          <el-button style="margin-left:20px;" @click="addUser()" type="primary" size="mini">新增账户</el-button>
          <el-button @click="delUserPl()" plain size="mini">批量删除</el-button>
        </div>
      </div>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe
          @selection-change="selectionChange"
          @sort-change="sortChange"
          :default-sort = "{prop: 'create_time', order: 'descending'}"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div @click="changeStatus(Number(scope.row.status),scope.row.id)">
                <el-button v-if="scope.row.status==1" class="status" type="success" plain size="small">显示</el-button>
                <el-button v-if="scope.row.status==0" class="status" plain size="small">隐藏</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_account_name"
            label="添加人">
          </el-table-column>
          <el-table-column
            label="创建时间"
            sortable="custom"
            prop="create_time"
            :sort-orders="['ascending', 'descending']">
            <template slot-scope="scope">
              <div>{{scope.row.create_time|formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="editUser(scope.row.id,scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="goData(scope.row.id,scope.row)" type="text" size="small">资料</el-button>
              <el-button @click="delUser(scope.row.id)" type="text" size="small">删除</el-button>
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
import ySelect from '@/components/ySelect/index'
import actions from './actions/index'
export default {
  data(){
    return {
      ruleForm:{
        keyword:'',
        status:'-1'
      },
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'显示',value:'1' },
        { label:'隐藏',value:'0' },
      ],
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
    ...actions,
    sortChange(column){
      let _this = this
      if(column.order=='descending'){
        _this.getList(2)
      }
      if(column.order=='ascending'){
        _this.getList(1)
      }
    },
    addUser(){
      let _this = this
      _this.$router.push({
        path:'/operate/developer/app/addUser'
      })
    },
    editUser(id){
      let _this = this
      _this.$router.push({
        path:'/operate/developer/app/addUser',
        query:{
          id:id
        }
      })
    },
    goData(id){
      let _this = this
      _this.$router.push({
        path:'/operate/developer/app/userData',
        query:{
          id:id
        }
      })
    },
    handleSize(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      this.getList()
    },
    handleCurrent(currentVal){
      this.curPage = currentVal
      this.getList()
    }
  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>

</style>