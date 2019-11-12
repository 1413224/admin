<template>
  <div class="content bg-white rounded box-shadow-page py-2 px-1">
    <div class="tab d-flex">
      <router-link class="item ml-1" to="/operate/basic/file">行业分类</router-link>
      <router-link class="item" to="/operate/basic/file/jobcate">职位管理</router-link>
      <router-link class="item active" to="">兴趣爱好</router-link>
    </div>
    <div class="bg-gray rounded p-1 mt-2">
      <div class="search bg-white p-2 rounded">
        <el-form
          :model="searchForm"
          ref="searchForm" 
          label-width="80px"
          label-position=""
          class="border-bottom d-flex">
          <el-form-item label="关键字" prop="keyword">
            <el-input size="small" 
              v-model="searchForm.keyword" 
              placeholder="兴趣爱好名称"
              class="yinput"></el-input>
          </el-form-item>
          <div class="pl-3 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
        <div class="btn-wrap mt-2">
          <el-button style="margin-left:20px;" @click="addInterest()" type="primary" size="mini">新增兴趣爱好</el-button>
          <el-button @click="delInterestPl()" plain size="mini">批量删除</el-button>
        </div>
      </div>

      <div class="table-wrap">
        <el-table
          :data="tableData"
          stripe
          @selection-change="selectionChange"
          @sort-change="sortChange"
          :default-sort = "{prop: 'update_time', order: 'descending'}"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称">
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
              <el-button @click="editInterest(scope.row.id,scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delInterest(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :title="dialogInteText"
      :visible.sync="dialogInte"
      width="652px">
      <el-form
        :model="intereForm"
        :rules="intereRules"
        ref="intereForm" 
        label-width="120px">
        <el-form-item label="名称" prop="interest">
          <el-select
            v-model="intereForm.interest"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="可直接输入选择"
            size="small"
            style="width:350px;">
            <el-option
              v-for="item in inteOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogInte = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitEditIntere('intereForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import actions from './actions/interest'
export default {
  data(){
    return {
      id:'',
      isEdit:null,
      searchForm:{
        keyword:''
      },
      tableData:[],
      selection:[],
      dialogInte:false,
      dialogInteText:'添加兴趣爱好',
      intereForm:{
        interest:[],
      },
      intereRules:{
        interest:[
          {required: true, message: '请填写兴趣爱好',trigger:'blur'}
        ]
      },
      inteOptions:[
        {label:'听音乐',value:'听音乐'},//传value
        {label:'看电影',value:'看电影'},
        {label:'绘画',value:'绘画'},
      ]
    }
  },
  created(){
    this.getList()
  },
  methods:{
    ...actions,
    searchSubmit(){
      this.getList()
    },
    resetForm(formName){
      this.$refs[formName].resetFields()
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
  }
}
</script>
<style lang="less" scoped>
.tab{
  .item{
    width: 78px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #333333FF;
    font-size: 14px;
    border-radius: 3px;
    &.active{
      background: #2589FFFF;
      color: #fff;
    }
    &:hover{
      cursor: pointer;
    }
  }
}
.addbtn{
  background-color:#2589FFFF;
  border-color:#2589FFFF;
}
.cell{
  .icon{
    font-size: 26px !important;
    &:hover{
      cursor: default !important;
    }
  }
  .iconfont{
    font-size: 20px;
    &:hover{
      cursor: pointer;
    }
  }
}
.iconfont{
  font-size: 32px;
  color: #ccc;
  &:hover{
    cursor: pointer;
  }
}
.rolelist{
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
}
</style>