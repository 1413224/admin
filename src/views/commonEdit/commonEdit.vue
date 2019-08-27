<template>
  <div class="edit-wrap">
    <div class="head">
      {{ yAddEdit == 'add' ? pageData.title : pageData.infoTitle}}
      <span class="desc" v-if="pageData.desc">--{{pageData.desc}}</span>
      <div class="extends-info">
        <div v-for="(item,index) in extendsInfo" :key="index">
          <yText v-if="item.type=='text'" :configs="item">{{item.value}}</yText>
        </div>          
      </div>
    </div>

    <div class="bg-gray content">
      <!-- 提示信息开始 -->
      <div class="toptip" v-if="pageData.comment">{{pageData.comment}}</div>
      <!-- 提示信息end -->
    </div>

    <!-- 内容开始 -->
    <div v-if="showEdit">
      <!-- <div v-for="(item,index) in mainData" :key="index">
        <panel v-if="item.type=='panel'" :configs="item"></panel>
        <lineBreak v-if="item.type=='line-break'"></lineBreak>
      </div> -->
      <panelWrap></panelWrap>
    </div>
    <!-- 内容结束 -->


    <div class="footer-bar">
      <div class="btn-wrap">
        <yButton
         :style="{float:item.float,width:item.minWidth+'px'}" 
         v-for="(item,index) in bottomInfo"
         :key="index"
         :configs="item"></yButton>
        <!-- <el-button size="mini">取消</el-button>
        <el-button type="primary" size="mini" @click="addEditSubmit('addEditForm')">保存</el-button> -->
      </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import panel from './compoments/panel'
import yText from '@/components/yText/yText'
import yButton from '@/components/yButton/yButton'
import lineBreak from '@/components/lineBreak/lineBreak'
import panelWrap from './compoments/panelWrap'
export default {
  name:'commonEdit',
  data(){
    return {
      showEdit:false,
      yAddEdit:'add'
    }
  },
  created(){
    let _this = this,
        path = _this.$route.path;
      _this.$store.dispatch('getConfigs',path).then((data)=>{
        _this.showEdit = true
      if(_this.$route.query[_this.pageData.acceptParams.name]){
        _this.yAddEdit = 'edit'
      }
    })

  },
  methods:{

  },
  computed:{
    ...mapState({
      pageData:state => state.diypage.pageData,
      mainData:state => state.diypage.mainData
    }),
    extendsInfo(){
      return this.pageData.extendsInfo
    },
    bottomInfo(){return this.pageData.bottomInfo},
  },
  components:{
    yText,
    yButton,
    panel,
    lineBreak,
    panelWrap
  }
}
</script>
<style lang="less" scoped>
.desc{
  font-size: 12px;
}
.edit-wrap{
  padding-bottom: 100px;
}
.content{
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
  .toptip{
    width: calc(100% - 20px);
    min-height: 50px;
    border-radius: 5px;
    // border: 1px solid #ccc;
    padding: 10px;
    // margin-bottom: 10px;
    font-size: 12px;
    background: #fff;
  }
}
.footer-bar{
  width: calc(100% - 272px);
  height: 67px;
  position: fixed;
  bottom: 0;
  left: 262px;
  // right: 120px;
  background-color: #fff;
  // background: #f00;
  border-top: 1px solid #eee;
  .btn-wrap{
    text-align: center;
    line-height: 62px;
    .bottombtn{

    }
  }
}
</style>