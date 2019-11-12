<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1">
    <yTitle>操作日志</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded px-1 pb-1 pt-2">
        <el-form
          :model="searchForm" 
          ref="searchForm" 
          label-width="120px"
          class=" d-flex">
          <el-form-item label="操作人" prop="name">
            <ySelect
              v-model="searchForm.name"
              :options="options"
              class="yselect"></ySelect>
          </el-form-item>
          <el-form-item label="操作模块" prop="modelName">
            <ySelect
              v-model="searchForm.modelName"
              :options="modelOptions"
              class="yselect"></ySelect>
          </el-form-item>
          <el-form-item label="操作时间">
            <linkageDateTimePicker v-model="searchForm.dateTime"></linkageDateTimePicker>
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
          stripe
          style="width:100%;">
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <p class="name">{{scope.row.account_name}}</p>
              <p class="phone">{{scope.row.account_mobile}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="module_name"
            label="操作模块">
          </el-table-column>
          <el-table-column
            prop="page_name"
            label="操作页面">
          </el-table-column>
          <el-table-column
            label="操作时间"
            prop="create_time">
            <template slot-scope="scope">
              <div>{{scope.row.create_time|formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="操作内容">
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
import linkageDateTimePicker from '@/components/dateTimePicker/linkageDateTimePicker'

export default {
  data(){
    return {
      searchForm:{
        name:'',
        modelName:'',
        dateTime:[]
      },
      options:[],
      modelOptions:[],
      tableData:[],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
    }
  },
  created(){
    let _this = this
    _this.getAccountList()
    _this.getLogTypeList()
  },
  mounted(){
    this.getList()
  },
  methods:{
    searchSubmit(){
      this.getList()
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
      this.searchForm.dateTime = []
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
    getAccountList(){
      let _this = this
      return new Promise((resolve,reject)=>{
        _this.$http.post(_this.baseUrl + _this.url.PermAccount.GetAllAccountList,{
          token:_this.$utils.getToken()
        }).then((res)=>{
          if(res.data.ret==200){
            let data = res.data.data
            data.list.map((item,index)=>{
              _this.options.push({
                label:item.nickname,
                value:item.id
              })
            })
            _this.options.unshift({ label:'全部',value:'' })
            resolve()
          }
        })
      })
    },
    getLogTypeList(){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.PermAccount.GetAllLogTypeList,{
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          data.list.map((item,index)=>{
            _this.modelOptions.push({
              label:item.name,
              value:item.code
            })
          })
          _this.modelOptions.unshift({ label:'全部',value:'' })
        }
      })
    },
    getList(){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.PermAccount.GetOperationLogList,{
        token:_this.$utils.getToken(),
        account_id:_this.searchForm.name,
        start_time:_this.searchForm.dateTime ? _this.searchForm.dateTime[0] : '',
        end_time:_this.searchForm.dateTime ? _this.searchForm.dateTime[1] : '',
        type_code:_this.searchForm.modelName,
        keyword:'',
        page_size:_this.pageSize,
        page_num:_this.curPage
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.tableData = data.list
        }
      })
    }
  },
  components:{
    ySelect,
    linkageDateTimePicker
  }
}
</script>
<style lang="less" scoped>

</style>