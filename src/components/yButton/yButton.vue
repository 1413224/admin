<template>
  <div>
     <template v-if="!yRightIcon && !yleftIcon && yStyleType=='icon'">
        <el-tooltip 
          :content="yButtonName"
          placement="top">
          <el-button
            size="small"
            :loading="loading"
            :type="yStyleType=='text' ? 'text' : yType"
            :plain="yStyleType=='plain' ? true : false"
            :round="yStyleType=='round' ? true : false"
            :circle="yStyleType=='circle' ? true : false"
            :icon="yIcon"
            @click="clickButton">
          </el-button>
        </el-tooltip>
     </template>
     <template v-else>
        <template v-if="yButtonType=='statusButton'">
          <div
            v-for="(item,index) in yStatusName"
            :key="index">
            <el-button
              v-if="item.status == btnStatus" 
              size="small"
              :type="item.buttonClass"
              :style="{color: ycolor ? ycolor :''}"
              :loading="loading"
              :plain="yStyleType=='plain' ? true : false"
              :round="yStyleType=='round' ? true : false"
              :circle="yStyleType=='circle' ? true : false"
              :icon="yStyleType=='icon' && yRightIcon != true && yleftIcon==true ? yIcon : ''"
              @click="clickButton">
              {{item.name}}
            </el-button>
          </div>
          
        </template>


        <el-button
          v-else
          size="small"
          :style="{color: ycolor ? ycolor :''}"
          :loading="loading"
          :type="yStyleType=='text' ? 'text' : yType"
          :plain="yStyleType=='plain' ? true : false"
          :round="yStyleType=='round' ? true : false"
          :circle="yStyleType=='circle' ? true : false"
          :icon="yStyleType=='icon' && yRightIcon != true && yleftIcon==true ? yIcon : ''"
          @click="clickButton">{{yButtonName}}
          <i v-if="yRightIcon" :class="yIcon"></i>
        </el-button>
     </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name:'yButton',
  props:{
    configs:[Object,Array],
    value:[Number,String],
    listItem:[Object,Array]
  },
  data(){
    return{
      loading:false,
      btnStatus:this.value
    }
  },
  computed:{
    ...mapState({
      ids:state => state.diypage.ids,
      addEditForm:state => state.diypage.addEditForm,
      pageData:state => state.diypage.pageData,
      addEditFormRefs:state => state.diypage.addEditFormRefs,
      addOrEditBtn:state => state.diypage.addOrEditBtn
    }),
    yButtonType(){ return this.configs.buttonType },
    yButtonName(){ return this.configs.buttonName },
    yType(){ return this.configs.buttonClass },
    yStyleType(){ return this.configs.styleType },
    yIcon(){ return this.configs.icon },
    yRightIcon(){ 
      if(this.configs.rightIcon){
        return this.configs.rightIcon 
      }
    },
    yleftIcon(){ 
      if(this.configs.leftIcon){
        return this.configs.leftIcon 
      }
    },
    ycolor(){ return this.configs.color },

    yStatusName(){ return this.configs.statusName }
  },
  created(){
    // console.log(this.status)
  },
  watch:{
    value(val){
      this.btnStatus = val
    },
    btnStatus(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  },
  methods:{
    clickButton(){
      let _this = this
      let type = _this.yButtonType
      switch(type){
        case 'addButton':
          _this.addButton()//新增按钮
          break;
        case 'availableButton'://批量可用
          _this.availableButton()
          break;
        case 'unavailableButton'://批量不可用
          _this.unavailableButton()
          break;
        case 'deleteButton'://批量删除
          _this.deleteButton()
          break;
        case 'statusButton'://修改状态
          _this.changeStatus()
          break;
        case 'editButton'://编辑按钮
          _this.navigateToEdit()
          break;
        case 'backButton'://返回页面按钮
          _this.backButton()
          break;
        case 'submitButton'://提交表单
          _this.submitButton()
      }
    },
    changeStatus(){//修改可用，禁用状态
      // console.log(this.status)
      let _this = this,
          token = '';
      if(_this.btnStatus==1){
        _this.btnStatus = 0
      }else{
        _this.btnStatus = 1
      }
      if(_this.configs.needLogin){
        token = _this.$utils.getToken()
      }
      let params = {}
      _this.configs.params.map((item,index)=>{
        params[item.name] = _this.listItem[item.field]
      })
      params = Object.assign(params,{token:token,status:_this.btnStatus})

      if(_this.configs.apiService){
        _this.loading = true
        _this.$http.post(_this.configs.apiService,params).then((res)=>{
          if(res.data.ret==200){
            _this.loading = false
            _this.$message({
              type: 'success',
              message: '更改成功!'
            })
          }else{
            _this.loading = false
          }
        })
      }

    },
    navigateToEdit(){
      let _this = this,
          goUrl = _this.configs.url;

      let params = {}
      _this.configs.params.map((item,index)=>{
        params[item.name] = _this.listItem[item.field]
      })
      _this.$router.push({
        path:goUrl,
        query:params
      })
    },
    addButton(){
      let _this = this
      // console.log(_this.configs)
      _this.$router.push({
        path:_this.configs.url
      })
    },
    availableButton(){
      let _this = this,
          params = {},
          token = '';

      if(_this.ids==''){
        _this.$message({
          message:'请选择需要修改的数据信息',
          type: 'warning'
        })
        return false
      }

      if(_this.configs.needLogin){
        token = _this.$utils.getToken()
      }
      //这里的传参可能需要修改
      _this.configs.params.map((item,index)=>{
        params[item.name] = _this.ids
      })
      params = Object.assign(params,{
        token:token,
        status:1
      })
      if(_this.configs.apiService){
        _this.$confirm('是否批量可用?','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          _this.$http.post(_this.configs.apiService,params).then((res)=>{
            if(res.data.ret==200){
              _this.$store.commit('changeList',1)
              _this.$store.commit('setIds','')
              _this.$message({
                type: 'success',
                message: '修改成功!'
              })
              _this.$store.commit('resetCheckList')
            }
          })
        }).catch(()=>{
          _this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })
      }

    },
    unavailableButton(){
      let _this = this,
          params = {},
          token = '';

      if(_this.ids==''){
        _this.$message({
          message:'请选择需要修改的数据信息',
          type: 'warning'
        })
        return false
      }

      if(_this.configs.needLogin){
        token = _this.$utils.getToken()
      }
      //这里的传参可能需要修改
      _this.configs.params.map((item,index)=>{
        params[item.name] = _this.ids
      })
      params = Object.assign(params,{
        token:token,
        status:0
      })
      if(_this.configs.apiService){
        _this.$confirm('是否批量禁用?','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          _this.$http.post(_this.configs.apiService,params).then((res)=>{
            if(res.data.ret==200){
              _this.$store.commit('changeList',1)
              _this.$store.commit('setIds','')
              _this.$message({
                type: 'success',
                message: '修改成功!'
              })
              _this.$store.commit('resetCheckList',[])
            }
          })
        }).catch(()=>{
          _this.$message({
            type: 'info',
            message: '已取消修改'
          })
        })  
      }
    },
    deleteButton(){
      let _this = this,
          del = 0,
          token = null;
      if(_this.configs.needLogin){
        token = _this.$utils.getToken()
      }
      let params = {}

      if(_this.listItem){
        _this.configs.params.map((item,index)=>{
          params[item.name] = _this.listItem[item.field]
        })
      }else{
        if(_this.ids==''){
          _this.$message({
            message:'请选择需要修改的数据信息',
            type: 'warning'
          })
          return false
        }
        _this.configs.params.map((item,index)=>{
          params[item.name] = _this.ids
        })
        _this.del = 1
      }
      
      params = Object.assign(params,{token:token})
      if(_this.configs.apiService){
        _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          return;
          _this.$http.post(_this.configs.apiService,params).then((res)=>{
            if(res.data.ret==200){
              _this.$message({
                type: 'success',
                message: '删除成功!'
              })
              _this.$store.commit('changeList',1)
              if(_this.del==1){
                _this.$store.commit('setIds','')
                _this.del = 0
              }
              _this.$store.commit('resetCheckList',[])
            }
          })
        }).catch(()=>{
          _this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        
      }
    },
    backButton(){
      this.$router.go(-1)
    },
    submitButton(){
      let _this = this,
          token = '',
          url='',
          params = {};
      let panel = _this.$utils.findBrothersComponents(_this,'panel')
      panel[0].$refs[_this.addEditFormRefs].validate((valid)=>{
        if(!valid){
          return false
        }
        
        if(_this.pageData.editNeedLogin){
          token = _this.$utils.getToken()
        }
        _this.configs.params.map((item,index)=>{
          params[item.name] = _this.$route.query[item.field]
        })

        if(_this.addOrEditBtn=='add'){
          url = _this.pageData.addApiService
        }else{
          url = _this.pageData.editApiService
        }

        params = Object.assign(params,{token:token},this.addEditForm)
        _this.$http.post(url,params).then((res)=>{
          if(res.data.ret==200){
            _this.$message({
              type: 'success',
              message: '修改成功!'
            })
            _this.backButton()
          }
        })

      })
    }

  }
}
</script>
<style lang="less" scoped>

</style>