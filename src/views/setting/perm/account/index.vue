<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1">
    <yTitle>操作员管理</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="search bg-white py-2 rounded px-1">
        <el-form
          :model="searchForm" 
          ref="searchForm" 
          label-width="120px"
          class=" d-flex border-bottom">
            <el-form-item label="关键字" prop="keyword">
              <el-input v-model="searchForm.keyword" size="small" class="yinput" placeholder="账户名/姓名/手机号"></el-input>
            </el-form-item>
            <el-form-item label="所属角色" prop="roleType">
              <ySelect
                v-model="searchForm.roleType" 
                :options="options"
                class="yselect"></ySelect>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <ySelect
                v-model="searchForm.status" 
                :options="statusOptions"
                class="yselect"></ySelect>
            </el-form-item>
            <div class="pl-5 pt">
              <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
              <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
            </div>
        </el-form>
        <el-row class="mt-2 pb-1">
          <el-col :span="20">
            <div class="btn-wrap">
              <el-button style="margin-left:20px;" @click="addAccount()" type="primary" size="mini">新增操作员</el-button>
              <el-button @click="delRolepl()" plain size="mini">批量删除</el-button>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe
          @selection-change="selectionChange"
          @sort-change="sortChange"
          :default-sort = "{prop: 'create_time', order: 'descending'}"
          style="width:100%;">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="account"
            label="账户名">
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
            prop="perm_group_name"
            label="所属角色">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div v-if="scope.row.account_type==0">
                <p v-if="scope.row.status==1">启用</p>
                <p v-if="scope.row.status==0">禁用</p>
              </div>
              <div>
                <el-button v-if="scope.row.status==1"
                  class="status" type="success" plain size="small"
                  @click="changeStatus(Number(scope.row.status),scope.row.id)">启用</el-button>
                <el-button v-if="scope.row.status==0" 
                  class="status" plain size="small"
                  @click="changeStatus(Number(scope.row.status),scope.row.id)">禁用</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_account_nickname"
            label="添加人">
          </el-table-column>
          <el-table-column
            label="创建时间"
            sortable="custom"
            prop="create_time">
            <template slot-scope="scope">
              <div>{{scope.row.create_time|formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <p class="font-sm" 
              v-if="scope.row.id==accoundId">当前账号</p>
              <p class="font-sm" 
                v-if="scope.row.account_type==0">超级账号</p>
              <div v-if="scope.row.id!=accoundId && scope.row.account_type!=0">
                <el-button @click="goEdit(scope.row.id)" type="text" size="small">编辑</el-button>
                <el-button @click="goDetail(scope.row.id)" type="text" size="small">详情</el-button>
                <el-button @click="goData(scope.row.id)" type="text" size="small">资料</el-button>
                <el-button @click="delRole(scope.row.id)" 
                type="text" size="small">删除</el-button>
              </div>
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
      accoundId:'',
      searchForm:{
        keyword:'',
        roleType:'',
        status:'-1'
      },
      options:[
        { label:'全部',value:'-1' },
      ],
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'启用',value:'1' },
        { label:'禁用',value:'0' },
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
    let _this = this
    _this.accoundId = JSON.parse(localStorage.getItem('info')).account_id
    _this.getGroupList().then(()=>{
      _this.getList()
    })
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
    selectionChange(selection){
      this.selection = selection
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
    addAccount(){
      this.$router.push({
        path:'/setting/perm/account/addEditAccount'
      })
    },
    sortChange(column){
      let _this = this
      if(column.order=='descending'){
        _this.getList(2)
      }
      if(column.order=='ascending'){
        _this.getList(1)
      }
    },
    goDetail(id){
      this.$router.push({
        path:'/setting/perm/account/accountDetail',
        query:{
          id:id
        }
      })
    },
    goData(id){
      this.$router.push({
        path:'/setting/perm/account/accountData',
        query:{
          id:id
        }
      })
    },
    goEdit(id){
      this.$router.push({
        path:'/setting/perm/account/addEditAccount',
        query:{
          id:id
        }
      })
    }
  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>

</style>