<template>
  <div class="edit-wrap clearfix" :style="{background:decorationColor}"> 
    <div class="tit ">{{panelName}}</div>
    <el-form class="" :model="addEditForm" :rules="addEditRules" ref="addEditForm" label-width="110px">
      <el-row v-for="(item,index) in configs.column" :key="index">
        <el-col v-if="item.component">
          <template v-if="item.component.type=='input' || item.component.type=='textarea'">
            <el-form-item
              :required="item.component.require"
              :label="item.component.name"
              :prop="item.component.field"
              :style="{width:item.component.minWidth+'px'}">
              <!-- :required="item.component.require" -->
              <!-- required  -->
              <yInput
                v-model="addEditForm[item.component.field]"
                :configs="item.component"></yInput>
            </el-form-item>
          </template>
          <el-form-item
            v-if="item.component.type=='radio'"
            :label="item.component.name"
            :prop="item.component.field">
            <yRadioGroup 
              v-model="addEditForm[item.component.field]"
              :options="item.component.options"
              :configs="item"
              :style="{width:item.minWidth+'px'}"></yRadioGroup>
          </el-form-item>


        </el-col>
      </el-row>
    </el-form>
      <!-- <el-button @click="aa" class="fl">测试</el-button> -->
  </div>
</template>
<script>
const yInput = () => ({
  component:import("@/components/yInput/yInput")
})
const yRadioGroup = () => ({
  component:import("@/components/yRadioGroup/yRadioGroup")
})
import { mapState } from 'vuex'
import { resolve, reject } from 'q';
import { getValid } from '@/utils/valid'

export default {
  name:'panel',
  props:{
    configs:[Object]
  },
  data(){
    return {
      addEditForm:{},
      addEditRules:{}
    }
  },
  created(){
    // console.log(this.configs)
    // console.log(this.pageData)
    // console.log(this.$route.query[this.pageData.acceptParams.name])
    let _this = this
    
    _this.getInfo().then((res)=>{
      // console.log(res)
      _this.configs.column.map((item,index)=>{
        if(item.component && item.component.field){
          _this.$set(_this.addEditForm,item.component.field,res[item.component.field])
          if(item.component.require){
            _this.addEditRules[item.component.field] = [
              {required:true,message:item.component.message,trigger: 'blur'}
            ]
          }
        }
      })
    })
    _this.$store.commit('setAddEditForm',_this.addEditForm)
    getValid(_this.addEditRules)
    _this.$store.commit('setAddEditFormRefs','addEditForm')
  },
  computed:{
    ...mapState({
      pageData:state => state.diypage.pageData
    }),
    panelName(){
      return this.configs.panelName
    },
    decorationColor(){
      return this.configs.decorationColor
    }
  },
  methods:{
    aa(){
      console.log(this.addEditForm)
      // console.log(this.$store.state.diypage.ruleForm)
    },
    getInfo(){
      return new Promise((resolve,reject)=>{
        let _this = this,
          acceptParams = _this.pageData.acceptParams,
          token = '',
          params={};
        if(acceptParams.isInfoParam && acceptParams.require){
          if(_this.pageData.infoNeedLogin){
            token = _this.$utils.getToken()
          }
          // let name = acceptParams.name
          let value = _this.$route.query[acceptParams.name]
          params = Object.assign({
            token:token,
            id:value
          })
          _this.$http.get(_this.pageData.infoApiService,{
            params
          }).then((res)=>{
            if(res.data.ret==200){
              // console.log(res.data)
              resolve(res.data.data)
            }
          })
        }
      })

    }
  },
  components:{
    yInput,
    yRadioGroup
  }
}
</script>
<style lang="less" scoped>
.tit{
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 20px;
}
</style>
<style lang="less">
.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-textarea__inner{
  border:1px solid #dcdfe6 !important;
}
</style>