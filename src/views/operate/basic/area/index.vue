<template>
  <div class=" bg-white rounded box-shadow-page py-2 px-1">
    <yTitle>全球地址库</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class="search bg-white rounded px-1 py-2">
        <el-form
          :model="searchForm"
          ref="searchForm" 
          label-width="80px"
          label-position=""
          class="d-flex">
          <el-form-item label="状态" prop="status">
            <ySelect
              v-model="searchForm.status" 
              :options="statusOptions"
              ></ySelect>
          </el-form-item>
          <div class="pl-3 pt">
            <el-button class="search-btn" type="primary" size="mini" @click="searchSubmit('searchForm')">搜索</el-button>
            <el-button class="search-btn" size="mini" @click="resetForm('searchForm')">清空</el-button>
          </div>
        </el-form>
      </div>
      <div class=" bg-white p-1 rounded table-wrap">
        <el-table
          :data="tableData"
          style="width: 100%;"
          stripe
          row-key="id"
          lazy
          :load="loads"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column
            prop="name"
            label="名称">
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
              <el-button v-if="scope.row.is_leaf!=1" @click="addManage(scope.row.id,scope.row)" type="text" size="small">添加</el-button>
              <el-button @click="editManage(scope.row.id,scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="delManage(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="640px"
      class="dialog">
      <el-form
        :model="dialogForm" 
        :rules="rules" ref="dialogForm" label-width="130px">
        <el-form-item label="上级分类" prop="parentName">
          <el-input v-model="dialogForm.parentName" 
            disabled="" style="width:346px;" size="small"></el-input>
          <input type="hidden" v-model="dialogForm.parentId">
          <input type="hidden" v-model="dialogForm.id">
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="dialogForm.name" 
          style="width:346px;" size="small"></el-input>
        </el-form-item>
        <el-form-item label="简写(缩写）：" prop="abbreviation">
          <el-input v-model="dialogForm.abbreviation" 
          style="width:346px;" size="small"></el-input>
        </el-form-item>
        <el-form-item label="区域代码：" prop="number">
          <el-input v-model="dialogForm.number" 
            @keyup.native="dialogForm.number=dialogForm.number.toString().replace(/[^\d]/g, '')"
            style="width:346px;" size="small"></el-input>
        </el-form-item>
        <el-form-item label="人口：" prop="population">
          <el-input v-model="dialogForm.population" 
            @keyup.native="dialogForm.population=dialogForm.population.toString().replace(/[^\d]/g, '')"
            style="width:346px;" size="small"></el-input>
        </el-form-item>
        <el-form-item label="Logo" prop="logo">
          <p @click="uploadImage()" class="add-logo" v-if="!dialogForm.logo">+</p>
          <img @click="uploadImage()" class="logo" v-else :src="dialogForm.logo" alt="">
          <p class="font-sm" style="color:#999999FF;">尺寸建议750x750像素以上，大小2M以下</p>
        </el-form-item>
        <el-form-item label="显示状态：" prop="status">
          <el-radio-group v-model="dialogForm.status">
            <el-radio :label="1">显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogPage = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitEditArea('dialogForm')">确 定</el-button>
      </span>
    </el-dialog>
    <uploadPicture v-model="uploadPic" @selPictureUrl="selPictureUrl"></uploadPicture>
  </div>
</template>
<script>
import ySelect from '@/components/ySelect/index'
import uploadPicture from '@/components/uploadPicture/uploadPicture'
import actions from './actions/index'
export default {
  data(){
    return {
      isEdit:null,
      uploadPic:false,
      tableData:[],
      dialogTitle:'',
      dialogVisible:false,
      dialogForm:{
        parentName:'',
        parentId:'',
        id:'',
        name:'',
        abbreviation:'',
        number:'',
        population:'',
        logo:'',
        status:1
      },
      rules:{
        name:[
          {required: true, message: '请输入地区名称',trigger:'blur'}
        ],
        abbreviation:[
          {required: true, message: '请输入地区简写',trigger:'blur'}
        ]
      },
      searchForm:{
        status:'-1'
      },
      statusOptions:[
        { label:'全部',value:'-1' },
        { label:'显示',value:'1' },
        { label:'隐藏',value:'0' },
      ],
    }
  },
  created(){
    let _this = this
    _this.getList()
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
    loads(tree, treeNode, resolve){
      // console.log(tree)
      // console.log(treeNode)
      this.getSubList(tree.id).then((list)=>{
        resolve(list)
      })
    },
    getList(){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.Area.GetSubList,{
        token:_this.$utils.getToken(),
        parent_id:1,
        status:_this.searchForm.status
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          let arr = []
          _this.tableData = data.list
          _this.tableData.map((item,index)=>{
            if(item.is_leaf){
              _this.$set(item,'hasChildren',false)
            }else{
              _this.$set(item,'hasChildren',true)
            }
          })
        }
      })
    },
    getSubList(id){
      let _this = this
      return new Promise((resolve,reject)=>{
        _this.$http.post(_this.baseUrl + _this.url.Area.GetSubList,{
          token:_this.$utils.getToken(),
          parent_id:id,
          status:_this.searchForm.status
        }).then((res)=>{
          if(res.data.ret==200){
            let list = res.data.data.list
            list.map((item,index)=>{
              if(item.is_leaf){
                _this.$set(item,'hasChildren',false)
              }else{
                _this.$set(item,'hasChildren',true)
              }
            })
            resolve(list)
          }
        })
      })
    },
    selPictureUrl(url){
      this.dialogForm.logo = url
      console.log(url)
    }
  },
  components:{
    uploadPicture,
    ySelect
  }
}
</script>
<style lang="less" scoped>
.table-wrap{
  margin-top: 10px;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  .status{
    padding: 4px 12px;
  }
}
.add-logo{
  width: 98px;
  height: 98px;
  line-height: 98px;
  border-radius: 10px;
  border: 1px dashed #2589FFFF;
  font-size: 24px;
  color: #2589FFFF;
  text-align: center;
  &:hover{
    cursor: pointer;
  }
}
.logo{
  width: 98px;
  height: 98px;
  border-radius: 5px;
  &:hover{
    cursor: pointer;
  }
}
</style>