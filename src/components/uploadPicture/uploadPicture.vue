<template>
  <div>
    <el-dialog 
      :visible.sync="dialogPicture"
      width="50%"
      class="uploadPicture">
      <div slot="title">
        <ul class="clearfix tit-tabs">
          <li 
            class="fl item" 
            :class="{active:tabsidx==index}"
            v-for="(item,index) in tabsBtn" :key="index"
            @click="handelTabs(index)">{{item.text}}</li>
        </ul>
      </div>
      <div class="content">
        <div class="tab-itemwrap">
          <el-radio-group v-model="year" size="mini">
            <el-radio-button
              v-for="(item,index) in yearArray" 
              :key="index" 
              :label="item.value">{{item.label}}</el-radio-button>
          </el-radio-group>
          <br><br>
          <el-radio-group v-model="month" size="mini">
            <el-radio-button
              v-for="(item,index) in monthArray"
              :key="index"
              :label="item.value">{{item.label}}</el-radio-button>
          </el-radio-group>
        </div>
        <div class="list-wrap">
          <ul class="clearfix">
            <li class="list-item fl">
              <img src="../../assets/logo.png" alt="">
            </li>
            <li class="list-item fl">
              <img src="../../assets/logo.png" alt="">
            </li>
          </ul>
        </div>
        <el-pagination
          class="pagination"
          small
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogPicture = false">取 消</el-button>
        <el-button size="small" type="primary" @click="dialogPicture = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {
      tabsidx:0,
      tabsBtn:[
        {text:'上传图片'},
        {text:'提取网络图片'},
        {text:'浏览图片'},
      ],
      year:-1,
      yearArray:[
        {value:-1,label:'不限'},
        {value:2019,label:'2019'},
        {value:2018,label:'2018'},
      ],
      month:-1,
      monthArray:[
        {value:-1,label:'不限'},
        {value:1,label:'1'},
        {value:2,label:'2'},
        {value:3,label:'3'},
        {value:4,label:'4'},
        {value:5,label:'5'},
        {value:6,label:'6'},
        {value:7,label:'7'},
        {value:8,label:'8'},
        {value:9,label:'9'},
        {value:10,label:'10'},
        {value:11,label:'11'},
        {value:12,label:'12'},
      ]
    }
  },
  created(){

  },
  computed:{
    ...mapState({
      dialogPicture:state => state.uploadPicture.dialogPicture
    })
  },
  methods:{
    handelTabs(idx){
      let _this = this
      _this.tabsidx = idx
    }
  }
}
</script>
<style lang="less" scoped>
.tit-tabs{
  .item{
    padding: 8px 10px;
    margin-right: 15px;
    border-radius: 5px;
    font-size: 14px;
    &:hover{
      cursor: pointer;
      background: #409EFF;
      color: #fff;
    }
  }
  .active{
    background: #409EFF;
    color: #fff;
  }
}
.list-wrap{
    margin-top: 20px;
    .list-item{
      background: #eee;
      width: 65px;
      height: 65px;
      border: 1px solid transparent;
      margin-right: 3px;
      img{
        width: 100%;
        height: 100%;
      }
      &:hover{
        border: 1px solid #409EFF;
        cursor: pointer;
      }
    }
  }
  .pagination{
    margin-top: 40px;
  }
</style>
<style lang="less">
.uploadPicture{
  .el-dialog__footer{
    border-top: 1px solid #eee;
  }
  .el-dialog__header{
    background: #f1f1f1;
  }
  .el-dialog__body{
    padding: 30px 20px 10px 20px;
  }
  
}

</style>