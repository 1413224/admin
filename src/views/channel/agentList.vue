<template>
  <div>
    <yTitle>
      代理列表<template v-slot:desc>展示代理账户的信息</template>
    </yTitle>
    <div class="content bg-gray rounded p-1 mt-2">
      <!-- search开始 -->
      <div class="search bg-white rounded p-1">
        <el-form
          :model="searchForm"
          :rules="searchRules"
          ref="searchFrom"
          label-width="80px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="代理时间" prop="time">
                <linkageDateTimePicker v-model="searchForm.time"></linkageDateTimePicker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="关键字" prop="keyWord">
                <el-input size="small" placeholder="代理名称/手机/姓名" v-model="searchForm.keyWord"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态" prop="status">
                <ySelect
                  v-model="searchForm.status" 
                  :options="statusOptions" :configs="statusConfigs">
                </ySelect>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="代理等级" prop="grade">
                <ySelect
                  v-model="searchForm.grade" 
                  :options="gradeOptions" :configs="gradeConfigs">
                </ySelect>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="代理来源" prop="source">
                <ySelect
                  v-model="searchForm.source" 
                  :options="sourceOptions" :configs="sourceConfigs">
                </ySelect>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="收益区间" prop="minProfit">
                <ySlot>
                  <el-col :span="10"><el-input v-model="searchForm.minProfit" size="small" placeholder="最小收益"></el-input></el-col>
                  <el-col :span="2" style="text-align:center;"><span>-</span></el-col>
                  <el-col :span="10"><el-input v-model="searchForm.maxProfit" size="small" placeholder="最大收益"></el-input></el-col>
                </ySlot>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" size="small" @click="searchSubmit('searchFrom')">搜索</el-button>
              <el-button size="small" @click="resetForm('searchFrom')">清空</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="btn-wrap pt-2 pb-1">
          <el-button type="primary" size="small" @click="goAddAgent()">新增代理</el-button>
          <el-button size="small">导出代理</el-button>
        </div>
      </div>
      <!-- search end -->
      <!-- tips开始 -->
      <div class="tips rounded p-2 my-1 d-flex">
        <div class="items d-flex a-center mr-5">
          <span class="tit">符合条件的代理总数：</span>
          <span class="num">925</span>
        </div>
        <div class="items d-flex a-center mr-5">
          <span class="tit">符合条件的代理收益总和：</span>
          <span class="num">925</span>
        </div>
      </div>
      <!-- tips end -->
      <!-- 表格开始 -->
      <div class="tab-wrap bg-white rounded pb-2">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            width="150">
          </el-table-column>
          <el-table-column
            label="代理信息"
            width="200">
            <template slot-scope="scope">
              <div class="table-item d-flex">
                <img class="img mr-1" src="../../assets/logo.png"/>
                <span class="name">广东擦擦擦管理有限公司</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="联系人"
            width="150">
            <template slot-scope="scope">
              <div class="d-flex flex-column">
                <span class="name">小明哦</span>
                <span class="phone">15219152152</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="grade"
            label="代理等级"
            width="120">
          </el-table-column>
          <el-table-column
            prop="source"
            label="代理来源"
            width="120">
          </el-table-column>
          <el-table-column
            prop="profit"
            label="累计收益"
            width="120">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="180">
            <template slot-scope="scope">
              <div @click="changeStatus(Number(scope.row.status),scope.row.id)">
                <el-button v-if="scope.row.status==1" class="status" type="success" size="small">可用</el-button>
                <el-button v-if="scope.row.status==0" class="status" type="danger" size="small">禁用</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="代理时间"
            width="100">
            <template slot-scope="scope">
              <div>{{12555 | formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goAgentDetail(scope.row.id)">详情</el-button>
              <el-button type="text" size="small">收益</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="tableData.length > 0" 
          ref="paging" 
          class="pagination mt-4"
          @size-change="handleSize" 
          @current-change="handleCurrent" 
          :current-page.sync="curPage" 
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          layout="sizes, prev, slot, next" 
          prev-text="上一页" next-text="下一页" 
          :total="totalNums">
          <span style="text-align: center;">{{curPage}}/{{totalPages}}</span>
        </el-pagination>
      </div>
      <!-- 表格end -->
    </div>
  </div>
</template>
<script>
import linkageDateTimePicker from '@/components/dateTimePicker/linkageDateTimePicker'
import ySelect from '@/components/ySelect/index'
import ySlot from '@/components/ySlot/ySlot'
export default {
  data(){
    return {
      searchForm:{
        time:[],
        keyWord:'',
        status:'-1',
        grade:'-1',
        source:'-1',
        minProfit:'',
        maxProfit:''
      },
      searchRules:{

      },
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'可用',value:'1' },
        { label:'禁用',value:'0' },
      ],
      statusConfigs:{},
      gradeOptions:[
        { label:'全部',value:'-1' },
      ],
      gradeConfigs:{},
      sourceOptions:[
        { label:'全部',value:'-1' },
      ],
      sourceConfigs:{},
      tableData:[
        {
          id:'asfdasf'
        }
      ],
      multipleSelection: [],
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
    }
  },
  methods:{
    resetForm(formName){
      // alert(9)
      this.$refs[formName].resetFields()
      this.searchForm.minProfit = ''
      this.searchForm.maxProfit = ''
    },
    searchSubmit(formName){
      this.$refs[formName].validate((valid)=>{
        if(!valid){
          return false
        }
        this.getList()
      })
    },
    handleSelectionChange(val){
      this.multipleSelection = val
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
    goAddAgent(){
      this.$router.push({
        path:'/channel/addEditAgent'
      })
    },
    goAgentDetail(id){
      this.$router.push({
        path:'/channel/agentDetail',
        query:{
          id:id
        }
      })
    }
  },
  components:{
    linkageDateTimePicker,
    ySelect,
    ySlot
  }
}
</script>
<style lang="less" scoped>
.btn-wrap{
  border-top: 1px solid #E3E2E5;
}
.tips{
  border: 1px solid rgba(145,212,255,1);
  background: rgba(237,244,255,1);
  .items{
    .tit{
      color: #333333;
      font-size: 12px;
    }
    .num{
      font-size: 16px;
      color: #3699FF;
      font-weight: bold;
    }
  }
}
.table-item{
  .img{
    width: 44px;
    height: 44px;
  }
}
.pagination{
  text-align: center;
}
</style>