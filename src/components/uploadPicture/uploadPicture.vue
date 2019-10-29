<template>
  <div @click="showBdGroupList = false">
    <el-dialog
      :visible.sync="dialogPicture"
      width="1100px"
      class="uploadPicture"
      :before-close="closeDialog">
      <div slot="title">
        <ul class="clearfix tit-tabs">
          <li
            class="fl item"
            :class="{active:tabsidx==index}"
            v-for="(item,index) in tabsBtn"
            :key="index"
            @click="handelTabs(index)"
          >{{item.text}}</li>
        </ul>
      </div>

      <div class="content">
        <div class="item-wrap" v-show="tabsidx==0">
          <el-select v-model="ptYear" size="small" style="margin-left:20px;">
            <el-option :value="-1" label="不限年份"></el-option>
            <el-option 
            v-for="(item,index) in ptYearList"
            :key="index"
            :value="item" 
            :label="item">
          </el-option>
          </el-select>
          <el-select v-model="ptMonth" size="small">
            <el-option :value="-1" label="不限月份"></el-option>
            <el-option 
              v-for="(item,index) in ptMonthList"
              :key="index"
              :value="item.month" 
              :label="item.month">
            </el-option>
          </el-select>
          <el-button size="mini" type="primary" 
            style="position:relative;top:2px;"
            @click="getPtImageList()">
            <i class="iconfont icon-search"></i>
          </el-button>
          <div class="btn-wrap">
            <!-- <el-button type="danger" size="small">删除</el-button>
            <el-upload
              ref="uploada"
              style="width:120px;display:inline"
              :action="baseUrl + url.File.AddImage"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :http-request="imgRequest"
              multiple>
              <el-button type="primary" size="small">上传图片</el-button>
            </el-upload> -->
          </div>

          <div class="top-wrap">
            <div class="group-wrap">
              <!-- <div class="top">
                <i class="iconfont icon-plus-circle"></i>
                <span class="add-group">添加分组</span>
              </div> -->
              <div class="group-list pt-group-list">
                <div
                  class="item default-item"
                  :class="{active:ptGroupIdx == index}"
                  v-for="(item,index) in ptGroupData"
                  :key="index"
                  @click="ptChangeTab(item,index)">
                  <i class="iconfont icon-folder-add"></i>
                  <span class="name">{{item.name}}</span>
                </div>
              </div>
            </div>
            <!-- 列表开始 -->
            <div class="list-wrap">
              <div
                v-for="(item,index) in ptListData"
                :key="index"
                class="item"
                :class="{active:item.active}"
                :style="{backgroundImage:`url(${item.url})`}"
                @click="selectPtImage(item)">
                <div class="name ellipsis">{{item.name}}</div>
                <div class="mask">
                  <i class="iconfont icon-check"></i>
                </div>
                <!-- <div class="del">
                    <i class="iconfont icon-delete"></i>
                  </div> -->
                <div class="del-border">
                  <div class="del" @click.stop="ptDelImage(item)">
                    <i class="iconfont icon-delete"></i>
                  </div>
                </div>
              </div>
            </div>
            <!-- 列表end -->
          </div>
          <div class="bottom">
            <el-row>
              <el-col :span="4">
                <el-checkbox v-model="ptCheckedAll" @change="ptCheckAll" class="checkAll">全选</el-checkbox>
              </el-col>
              <el-col :span="20" style="text-align: center;">
                <el-pagination
                  ref="paging" 
                  class="pagination"
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
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 平台end -->

        <!-- 本地服务开始 -->
        <div class="item-wrap" v-show="tabsidx==1">
          <el-select v-model="bdYear" size="small" style="margin-left:20px;">
            <el-option :value="-1" label="不限年份"></el-option>
            <el-option 
            v-for="(item,index) in bdYearList"
            :key="index"
            :value="item" 
            :label="item">
          </el-option>
          </el-select>
          <el-select v-model="bdMonth" size="small">
            <el-option :value="-1" label="不限月份"></el-option>
            <el-option 
              v-for="(item,index) in bdMonthList"
              :key="index"
              :value="item.month" 
              :label="item.month">
            </el-option>
          </el-select>
          <el-button size="mini" type="primary" 
            style="position:relative;top:2px;"
            @click="getBdImageList()">
            <i class="iconfont icon-search"></i>
          </el-button>
          <div class="btn-wrap">
            <el-button type="primary" size="small" @click.stop="showBdSelGroup()">
              移动<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-upload
              ref="uploada"
              style="width:120px;display:inline"
              :action="baseUrl + url.File.AddImage"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :http-request="imgRequest"
              multiple>
              <el-button type="primary" size="small">上传图片</el-button>
            </el-upload>
            <div class="grouplist-wrap py-1" v-show="showBdGroupList">
              <div class="item pl-2" 
                v-for="(item,index) in bdGroupData"
                :key="index"
                @click.stop="moveBdPicture(item)">{{item.name}}</div>
            </div>
          </div>
          <div class="top-wrap">
            <div class="group-wrap">
              <div class="top" @click="addBdGroup()">
                <i class="iconfont icon-plus-circle"></i>
                <span class="add-group">添加分组</span>
              </div>
              <div class="group-list">
                <div class="item default-item" 
                  :class="{active:defaultGroupIndex==-1}"
                  @click="bdChangeTab($event,0,0,-1)">
                  <i class="iconfont icon-folder-add"></i>
                  <span class="name">全部</span>
                </div>
                <div class="item default-item"
                  :class="{active:defaultGroupIndex==0}"
                  @click="bdChangeTab($event,0,0,0)">
                  <i class="iconfont icon-folder-add"></i>
                  <span class="name">未分组</span>
                </div>
                <div
                  class="item"
                  :class="{active:bdGroupIdx == index}"
                  v-for="(item,index) in bdGroupData"
                  :key="index"
                  @click.stop="bdChangeTab($event,item,index)">
                  <div class="name-wrap">
                    <i class="iconfont icon-folder-add"></i>
                    <span v-show="!item.submitShow" class="name">{{item.name}}</span>
                    <el-input 
                      v-show="item.submitShow" 
                      v-model="item.name"
                      size="small"></el-input>
                    <i class="iconfont icon-setting ico-set"
                      @click.stop="settingGroup(item,index)"></i>
                  </div>
                  <div class="edit" v-show="item.editShow">
                    <span v-show="!item.submitShow" class="color-default" 
                      @click.stop="editBtn(item,index)">
                      <i class="iconfont icon-post"></i>编辑
                    </span>
                    <span v-show="!item.submitShow" class="color-red"
                      @click.stop="selBdGroup(item)">
                      <i class="iconfont icon-delete"></i>删除
                    </span>
                    <span v-show="item.submitShow" class="color-default"
                      @click.stop="changeBdGroup(item)">
                      <i class="iconfont icon-check-circle"></i>确定
                    </span>
                    <span v-show="item.submitShow" class="color-red"
                      @click.stop="cancelBtn(item,index)">
                      <i class="iconfont icon-close-circle"></i>取消
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 列表开始 -->
            <div class="list-wrap">
              <div
                v-for="(item,index) in bdListData"
                :key="index"
                class="item"
                :class="{active:item.active}"
                :style="{backgroundImage:`url(${item.url})`}"
                @click="selectBdImage(item,index)">
                <div class="name ellipsis">{{item.name}}</div>
                <div class="mask">
                  <i class="iconfont icon-check"></i>
                </div>
                <!-- <div class="del">
                    <i class="iconfont icon-delete"></i>
                  </div> -->
                <div class="del-border">
                  <div class="del" @click.stop="ptDelImage(item)">
                    <i class="iconfont icon-delete"></i>
                  </div>
                </div>
              </div>
              <div v-if="bdListData.length==0"
                class="noimg">
                暂无图片
              </div>
            </div>
            <!-- 列表end -->
          </div>
          <div class="bottom" style="padding-top:20px;">
            <el-row>
              <el-col :span="4">
                <el-checkbox v-if="nums" v-model="bdCheckedAll" @change="bdCheckAll" class="checkAll">全选</el-checkbox>
              </el-col>
              <el-col :span="20" style="text-align: center;">
                <el-pagination
                  ref="paging" 
                  class="pagination"
                  @size-change="bdHandleSize" 
                  @current-change="bdHandleCurrent" 
                  :current-page.sync="bdCurPage" 
                  :page-sizes="[10, 20, 30, 50]" 
                  :page-size="bdPageSize" 
                  layout="sizes, prev, slot, next" 
                  prev-text="上一页" next-text="下一页" 
                  :total="bdTotalNums">
                  <span style="text-align: center;">{{bdCurPage}}/{{bdTotalPages}}</span>
                </el-pagination>
              </el-col>
            </el-row>
          </div>
        </div>
        <!-- 本地服务end -->

        <!-- 提取网络照片 -->
        <div class="item-wrap" v-show="tabsidx==2">
          <div class="pic-top">
            <img v-show="!srcPicture" src="../../assets/nopic.png" alt="">
            <img v-show="srcPicture" :src="srcPicture"/>
          </div>
          <div class="desc-tip">输入图片链接</div>
          <el-input class="pic-input" v-model="picSrc" size="small" placeholder="图片链接"></el-input>
          <el-button class="zhbtn" size="small" @click="linkUpLoadPic">转化</el-button>
        </div>
        <!-- 提取网络照片end -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogPicture = false">取 消</el-button>
        <el-button size="small" type="primary" @click="checkPicture()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex"
import actions from './actions/uploadPicture'
export default {
  props: {
    value: [Boolean],
    attachmentConfigId:{
      type:[Number,String],
      default:-1
    },
    nums:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      bdGroupTotalNums:0,
      bdGroupCurPage: 1,
      bdGroupPageSize: 10,
      bdGroupTotalPages:1,
      defaultGroupIndex:-1,
      bdTotalNums:0,
      bdCurPage: 1,
      bdPageSize: 10,
      bdTotalPages:1,
      // bdYearList:[],
      bdMonthList:[
        {month:1},{month:2},{month:3},{month:4},{month:5},{month:6},{month:7},
        {month:8},{month:9},{month:10},{month:11},{month:12},
      ],
      bdGroupId:-1,
      bdGroupData:[],
      bdListData:[],//本地图片列表
      bdYear:-1,
      bdYearList:this.$utils.getYearList(),
      bdMonth:-1,
      bdCheckedAll:false,
      bdGroupIdx:null,
      showBdGroupList:false,



      ptGroupTotalNums:0,
      ptGroupCurPage: 1,
      ptGroupPageSize: 10,
      ptGroupTotalPages:1,
      ptListData: [],//平台图片列表
      totalNums:0,
      curPage: 1,
      pageSize: 10,
      totalPages:1,
      ptGroupIdx: 0,
      ptGroupData: [
        // {name:'全部',type:-1},
        // {name:'未分组',type:0},
      ],
      ptMonthList:[
        {month:1},{month:2},{month:3},{month:4},{month:5},{month:6},{month:7},
        {month:8},{month:9},{month:10},{month:11},{month:12},
      ],
      ptYear:-1,
      ptYearList:this.$utils.getYearList(),
      ptMonth:-1,
      ptCheckedAll:false,


      list:[],
      dialogPicture: this.value,
      tabsidx: 1,
      tabsBtn: [
        { text: "平台" },
        { text: "本地服务器" },
        { text: "提取网络图片" }
      ],
      picSrc:'',
      srcPicture:'',//上传的链接图片
    };
  },
  created() {
    let _this = this
    _this.getBdGroupList().then(()=>{
      _this.getBdImageList()
    })
    _this.getPtGroupList()
  },
  computed: {
    ...mapState({
      // dialogPicture:state => state.uploadPicture.dialogPicture
    })
  },
  methods: {
    ...actions,
    
    handelTabs(idx) {
      let _this = this
      _this.tabsidx = idx
    },
    closeDialog(done) {
      done()
      // this.$store.commit('setDialogPicture',false)
    },
    
    selectBdImage(item,index) {
      let _this = this
      if(!_this.nums){
        _this.bdListData.map((itm,idx)=>{
          if(index==idx){
            if(itm.active){
              itm.active = false
            }else{
              itm.active = true
            }
          }else{
            itm.active = false
          }
        })
      }
      if(_this.nums){
        if (item.active) {
          item.active = false
        } else {
          item.active = true
        }
      }
    },
    ptDelImage(item){
      console.log(item)
    },
    bdCheckAll(value){
      // console.log(value)
      let _this = this
      if(value){
        _this.bdListData.map((item,index)=>{
          item.active = true
        })
      }else{
        _this.bdListData.map((item,index)=>{
          item.active = false
        })
      }
    },
    ptCheckAll(value){

    },
    handleCurrent(currentVal){
      this.curPage = currentVal
      // this.getList()
    },
    handleSize(sizeVal){
      this.pageSize = sizeVal
      this.curPage = 1
      // this.getList()
    },
    beforeAvatarUpload(file){
      // console.log(file)
      let _this = this
      console.log(file)
      // console.log(_this.$refs.uploada.uploadFiles)
      // console.log(_this.list)
      // const isJPG = file.type === 'image/jpeg/png'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
      // _this.imgRequest(file)
    },
    imgRequest(obj){
      let _this = this
      let fileObj = obj.file
      // let fileObj = obj
      let form = new FormData()

      // console.log(_this.$refs.uploada.uploadFiles)
      // console.log(obj.file)
      // return 

      form.append("file", fileObj)
      // form.append("file",_this.$refs.uploada.uploadFiles)
      form.append("token", _this.$utils.getToken())
      form.append("role_type", _this.url.role_type)

      _this.$http({
          method:'post',
          url:_this.baseUrl + _this.url.File.AddImage,
          data:form,
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        }).then((res)=>{
        if(res.data.ret==200){
          // _this.$message({
          //   type: 'success',
          //   message: '更改成功!'
          // })
        }
      })
      // console.log(form.get('file'))
    },
    linkUpLoadPic(){
      let _this = this
      if(_this.picSrc==''){
        _this.$message({
          type: 'warning',
          message: '请输入图片链接!'
        })
        return
      }
      _this.$http.post(_this.baseUrl + _this.url.File.AddImageByUrl,{
        token:_this.$utils.getToken(),
        role_type:_this.url.role_type,
        url:_this.picSrc
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.$message({
            type: 'success',
            message: '上传成功!'
          })
          _this.picSrc = ''
          console.log(data)
          _this.srcPicture = data.url 
        }
      })
    },
    handleAvatarSuccess(res,file){
      // this.imageUrl = URL.createObjectURL(file.raw)
      let _this = this
    },
    handleAvatarError(err, file, fileList){
      console.log(err)
    }
  },
  watch: {
    value(val) {
      this.dialogPicture = val;
    },
    dialogPicture(val, oldVal) {
      if (val != oldVal) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./css/uploadPicture.less");
.noimg{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.tit-tabs {
  .item {
    padding: 0 10px;
    margin-right: 15px;
    border-radius: 5px;
    font-size: 14px;
    &:hover {
      cursor: pointer;
      background: #409eff;
      color: #fff;
    }
  }
  .active {
    background: #409eff;
    color: #fff;
  }
}
</style>
<style lang="less">
.uploadPicture {
  .el-dialog__footer {
    border-top: 1px solid #eee;
  }
  .el-dialog__header {
    background: #f1f1f1;
  }
  .el-dialog__body {
    padding: 15px 0px 0px 0px;
  }
  // .checkAll{
  //   position: absolute;
  //   bottom: -45px;
  //   left: 50px;
  // }
  .pic-input{
    .el-input__inner{
      width: 500px;
      text-align: center;
    }
  }
}
</style>