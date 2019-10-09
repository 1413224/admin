<template>
  <div>
    <div class="tab-wrap d-flex">
      <p class="item px-2 active">待审核</p>
      <p class="item px-2">待打款</p>
      <p class="item px-2">审核失败</p>
    </div>
    <div class="bg-gray rounded p-1 mt-2">
      <!-- 搜索开始 -->
      <div class="search bg-white rounded pt-2">
        <el-form
          :model="searchForm"
          :rules="searchRules"
          ref="searchFrom"
          label-width="80px">
          <el-row>
            <el-col :span="7">
              <el-form-item label="申请时间" prop="time">
                <linkageDateTimePicker v-model="searchForm.time"></linkageDateTimePicker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="关键字" prop="keyWord">
                <el-input size="small" placeholder="代理名称/手机/姓名" v-model="searchForm.keyWord"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请类型" prop="type">
                <ySelect
                  v-model="searchForm.type" 
                  :options="typeOptions" :configs="typeConfigs">
                </ySelect>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" size="small" @click="searchSubmit('searchFrom')">搜索</el-button>
              <el-button size="small" @click="resetForm('searchFrom')">清空</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 搜索end -->
      <!-- tips开始 -->
      <div class="tips rounded p-2 my-1 d-flex">
        <div class="items d-flex a-center mr-5">
          <span class="tit">符合条件的申请总数：</span>
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
            label="ID">
          </el-table-column>
          <el-table-column
            label="代理信息">
            <template slot-scope="scope">
              <div class="table-item d-flex">
                <img class="img mr-1" src="../../assets/logo.png"/>
                <span class="name">广东擦擦擦管理有限公司</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="联系人">
            <template slot-scope="scope">
              <div class="d-flex flex-column">
                <span class="name">小明哦</span>
                <span class="phone">15219152152</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="grade"
            label="申请类型">
          </el-table-column>
          <el-table-column
            prop="source"
            label="申请等级">
          </el-table-column>
          <el-table-column
            label="申请时间">
            <template slot-scope="scope">
              <div>{{12555 | formatDate}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small">去审核</el-button>
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

export default {
  data(){
    return {
      searchForm:{
        time:[],
        keyWord:'',
        type:''
      },
      searchRules:{

      },
      typeOptions:[
        { label:'全部',value:'-1' },
      ],
      typeConfigs:{},
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
      this.$refs[formName].resetFields()
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
  },
  components:{
    linkageDateTimePicker,
    ySelect
  }
}
</script>
<style lang="less" scoped>
.tab-wrap{
  .item{
    font-size: 14px;
    border-radius: 3px;
    padding-top: 8px;
    padding-bottom: 8px;
    color: #333;
    font-weight: 500;
    &:hover{
      cursor: pointer;
    }
  }
  .active{
    background: #3699FF;
    color: #fff;
  }
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