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
            <linkageDateTimePicker></linkageDateTimePicker>
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
              <p class="name">名字</p>
              <p class="phone">152111111</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="model"
            label="操作模块">
          </el-table-column>
          <el-table-column
            prop="aPage"
            label="操作页面">
          </el-table-column>
          <el-table-column
            label="操作时间"
            prop="update_time">
            <template slot-scope="scope">
              <div>{{scope.row.update_time|formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="content"
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
        modelName:''
      },
      options:[
        { label:'全部',value:'-1' },
      ],
      modelOptions:[
        { label:'全部',value:'-1' },
      ],
      tableData:[
        {}
      ],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
    }
  },
  created(){

  },
  methods:{
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