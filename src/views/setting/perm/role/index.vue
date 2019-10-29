<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1">
    <yTitle>角色管理</yTitle>
    <div class="bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded px-1 pt-2 pb-1">
        <el-row class="pb-1">
          <el-col :span="20">
            <div class="btn-wrap">
              <el-button style="margin-left:10px;" @click="goAddRole()" type="primary" size="mini">新增角色</el-button>
              <!-- <el-button @click="delPiRole()" plain size="mini">批量删除</el-button> -->
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="table-wrap mt-2 rounded">
        <el-table
          :data="tableData"
          stripe
          style="width:100%;">
          <el-table-column
            prop="name"
            label="角色名称">
            <template slot-scope="scope">
              <p class="name">{{scope.row.name}} 
                <span class="lab" v-if="scope.row.type==0">官</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="角色描述"
            width="300">
          </el-table-column>
          <el-table-column
            prop="nums"
            label="人数">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div>
                <el-button v-if="scope.row.status==1"
                  class="status" type="success" plain size="small"
                  @click="changeStatus(Number(scope.row.status),scope.row.id)">显示</el-button>
                <el-button v-if="scope.row.status==0" 
                  class="status" plain size="small"
                  @click="changeStatus(Number(scope.row.status),scope.row.id)">隐藏</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="goDetail(scope.row)" type="text" size="small">详情</el-button>
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
  </div>
</template>
<script>
import actions from './actions/index.js'
export default {
  data(){
    return {
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
    this.getList()
  },
  methods:{
    ...actions,
    goAddRole(){
      this.$router.push({
        path:'/setting/perm/role/addRole'
      })
    },
    goDetail(row){
      if(row.type==0){
        this.$router.push({
          path:'/setting/perm/role/roleDetail',
          query:{
            id:row.id
          }
        })
      }else{
        this.$router.push({
          path:'/setting/perm/role/addRole',
          query:{
            id:row.id
          }
        })
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
  }
}
</script>
<style lang="less" scoped>
.name{
  .lab{
    border: 1px solid #2589FFFF;
    border-radius: 2px;
    font-size: 12px;
    color: #2589FFFF;
    margin-left: 10px;
    // transform: scale(.8);
    display: inline-block;
    width: 13px;
    height: 14px;
    position: relative;
    line-height: 16px;
    // padding: 2px;
  }
}
</style>