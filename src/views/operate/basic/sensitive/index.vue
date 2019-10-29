<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1">
    <yTitle class="mb-2">敏感词</yTitle>
    <div class=" bg-gray rounded p-1">
      <numberTips class="numberTips d-flex flex-column">
        <div class="item">1.可以同时添加多个敏感词，每行只允许有一个，敏感词与被替代字符之间用等号隔开，例如：法轮功=*。
        </div>
        <div class="item mt-1">2.可以通过直接导入的方式添加敏感词导入文件的格式与程序手动中添加要求一致。
        </div>
        <div class="item mt-1">3.为了不影响程序效率，请不要设置过多不需要的过滤内容。</div>
      </numberTips>
      <div class="search bg-white rounded py-2 px-1 mt-1">
        <el-form
          :model="searchForm" 
          ref="searchForm" 
          label-width="80px"
          class=" d-flex border-bottom">
          <el-form-item label="关键字" prop="keyword">
            <el-input v-model="searchForm.keyword" size="small" class="yinput" placeholder="敏感词"></el-input>
          </el-form-item>
          <div class="pl-5 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
        <div class="btn-wrap mt-2">
          <el-button style="margin-left:20px;" @click="add()" type="primary" size="mini">新增敏感词</el-button>
          <el-button class="daobtn" @click="del()" plain size="mini">
            <i class="iconfont icon-download"></i>  导入
          </el-button>
          <el-button class="daobtn" @click="del()" plain size="mini">
            <i class="iconfont icon-upload"></i>  导出
          </el-button>
          <el-button @click="delAccount()" plain size="mini">批量删除</el-button>
          <el-button @click="de()" class="fr mr-2" type="text" size="mini">下载导入模板</el-button>
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
            prop="keyword"
            label="关键字">
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

    <el-dialog
      title="添加敏感词"
      :visible.sync="mgcDialog"
      width="640px">
      <el-form
        :model="mgcForm" 
        :rules="mgcRules"
        ref="WXform" 
        label-width="120px">
        <el-form-item label="敏感词" prop="mgc">
            <el-input v-model="mgcForm.mgc" 
              size="small" class="form-input"
              type="textarea" :rows="3" 
              placeholder="请输入...">
            </el-input>
            <p class="tips font-sm">可批量添加，一行一个敏感词</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import numberTips from '@/components/numberTips/numberTips'

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
      mgcDialog:false,
      mgcForm:{
        mgc:''
      },
      mgcRules:{
        mgc:[
          {required: true, message: '请输入敏感词',trigger:'blur'}
        ]
      }
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
    handleSize(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      this.getList()
    },
    handleCurrent(currentVal){
      this.curPage = currentVal
      this.getList()
    },
    getList(){

    },
    add(){
      let _this = this
      _this.mgcDialog = true
    }
  },
  components:{
    numberTips
  }
}
</script>
<style lang="less" scoped>
.numberTips{
  margin-top: 0;
}
.daobtn{
  padding: 5px 15px;
  position: relative;
  top: 2px;
}
.tips{
  color: #999999FF;
}
</style>