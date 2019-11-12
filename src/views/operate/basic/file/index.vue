<template>
  <div class="content bg-white rounded box-shadow-page py-2 px-1">
    <div class="tab d-flex">
      <router-link class="item active ml-1" to="">行业分类</router-link>
      <router-link class="item" to="/operate/basic/file/jobcate">职位管理</router-link>
      <router-link class="item" to="/operate/basic/file/interest">兴趣爱好</router-link>
    </div>
    <div class="bg-gray rounded p-1 mt-2">
      <div class="search bg-white p-2 rounded">
        <el-button size="small" 
          type="primary" 
          class="addbtn"
          @click="addFirstCate()">新增顶级分类</el-button>
      </div>

      <div class="table-wrap">
          <!-- default-expand-all -->
        <el-table
          :data="tableData"
          row-key="id"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称">
          </el-table-column>
          <el-table-column
          label="移动">
            <template slot-scope="scope">
              <i @click="umDisplayOrder(scope.row.id,1)" class="iconfont icon-zhiding"></i>
              <i @click="umDisplayOrder(scope.row.id,2)" class="iconfont icon-xiangshang"></i>
              <i @click="umDisplayOrder(scope.row.id,3)" class="iconfont icon-xiangxia"></i>
              <i @click="umDisplayOrder(scope.row.id,4)" class="iconfont icon-dibu"></i>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <div>
                <el-button 
                  v-if="scope.row.status==1" 
                  @click="changeStatus(Number(scope.row.status),scope.row.id)"
                  class="status" type="success" size="small" plain>显示</el-button>
                <el-button 
                  v-if="scope.row.status==0" 
                  @click="changeStatus(Number(scope.row.status),scope.row.id)"
                  class="status" size="small" plain>隐藏</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.is_leaf==false"
                size="mini"
                type="text"
                @click="handleAdd(scope.row)">添加
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDel(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :title="dialogPageText"
      :visible.sync="dialogPage"
      :before-close="closeDialogPage"
      width="640px">
      <el-form
        label-width="110px" 
        :model="pageForm" 
        :rules="pageRules" 
        ref="pageForm">
        <!-- 点击单一新增 -->
        <el-form-item label="当前所属分类" v-if="isLine && !isLineEdit">
          <div class="d-flex">
            <p class="catename font-sm mr-2">{{pageForm.cname}}</p>
            <el-button type="text" class="btn" 
              @click="lineEditBtn()">
              <span class="font-sm">修改</span>
            </el-button>
          </div>
        </el-form-item>
        <div class="d-flex" v-if="isLine && isLineEdit">
          <el-form-item label="选择分类" prop="roleType">
            <ySelect
              v-model="pageForm.roleType" 
              :options="roleTypeOptions"
              @changeSel="changeSel"
              style="width:157px;">
            </ySelect>
          </el-form-item>
          <el-form-item label="--" prop="pageType" class="merge" v-if="isLineEditRight">
            <ySelect
              v-model="pageForm.pageType" 
              :options="pageTypeOptions"
              placeholder="选择分类"
              style="width:157px;">
            </ySelect>
          </el-form-item>
          <el-button type="text"
            @click="lineEditBtnRight()"
            class="btnqx">
            <span class="font-sm">取消</span>
          </el-button>
        </div>
        <!-- 点击单一新增 -->
        <el-form-item label="名称" prop="name">
          <el-input size="small" 
            class="item-input" 
            v-model="pageForm.name" 
            placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" prop="desc">
          <el-input size="small" 
            class="item-input" 
            v-model="pageForm.desc" 
            type="textarea"
            :rows="4"
            placeholder="请输入..."></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="pageForm.status">
            <el-radio label="1">显示</el-radio>
            <el-radio label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogPage = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitEditPage('pageForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import actions from './actions/index'
export default {
  data(){
    return {
      isEdit:null,
      isLine:false,
      isLineEdit:false,
      isLineEditRight:false,
      level:null,
      pId:'',
      editId:'',
      editParentIds:'',
      tableData:[],
      dialogPageText:'添加分类',
      dialogPage:false,
      pageForm:{
        name:'',
        desc:'',
        status:'1',
        roleType:'',
        pageType:'',
        cname:''
      },
      pageRules:{
        name:[
          {required: true, message: '请输入分类名称',trigger:'blur'}
        ],
        status:[
          {required: true, message: '请选择状态',trigger:'blur'}
        ],
        roleType:[
          {required: true, message: '请选择分类',trigger:'blur'}
        ],
        // pageType:[
        //   {required: true, message: '请选择分类',trigger:'blur'}
        // ]
      },
      roleTypeOptions:[],
      pageTypeOptions:[],
      rowData:[]
    }
  },
  created(){
    this.getList()
  },
  methods:{
    ...actions,

  },
  components:{
    ySelect
  }
}
</script>
<style lang="less" scoped>
.btn{
  color: #2589FFFF;
}
.btnqx{
  margin-top: -20px;
  margin-left: 20px;
}
.catename{
  margin-top: 3px;
  color: #333333FF;
}
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
.item-input{
  width: 346px;
}

</style>
