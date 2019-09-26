<template>
  <div>
    <el-form class="" 
      :model="addEditForm" 
      :rules="addEditRules" ref="addEditForm" label-width="110px">
      <div v-for="(configs,index) in mainData" :key="index" class="configs-content">
        <div v-if="configs.type=='panel'" class="bg-gray panel-item">
          <div class="tit" v-if="configs.panelName">
            <span class="deco" :style="{background:configs.decorationColor}"></span>
            {{configs.panelName}}
          </div>

          <el-row v-for="(item,idx) in configs.column" :key="idx">
            <el-col v-if="item.component">
              <template v-if="item.component.type=='input' || item.component.type=='textarea'">
                <el-form-item
                  :required="item.component.require"
                  :label="item.component.name"
                  :prop="item.component.field"
                  :style="{width:item.component.minWidth+'px'}">
                  <yInput
                    v-model="addEditForm[item.component.field]"
                    :configs="item.component"></yInput>
                </el-form-item>
              </template>
              <el-form-item
                :required="item.component.require"
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
        </div>
        <div v-if="configs.type=='line-break'" style="height:10px;background:#fff;"></div>
      </div>
    </el-form>
  </div>
</template>
<script>
import lineBreak from '@/components/lineBreak/lineBreak'
const yInput = () => ({
  component:import("@/components/yInput/yInput")
})
const yRadioGroup = () => ({
  component:import("@/components/yRadioGroup/yRadioGroup")
})
import { mapState } from 'vuex'
import { reject } from 'q';
import { getValid } from '@/utils/valid'

export default {
  name:'panel',
  data(){
    return {
      addEditForm:{},
      addEditRules:{},
      panelConfigs:[]
    }
  },
  created(){
    // console.log(this.mainData)
    let _this = this
    _this.getPanelConfigs()

    if(_this.$route.query[_this.pageData.acceptParams.name]
    && _this.pageData.acceptParams.require){
      _this.getInfo().then((res)=>{
        _this.setFormData(res)
      })
      _this.$store.commit('setAddOrEditBtn','edit')
    }else{
      _this.setFormData()
      _this.$store.commit('setAddOrEditBtn','add')
    }
    getValid(_this.addEditRules)
    _this.$store.commit('setAddEditForm',_this.addEditForm)
    _this.$store.commit('setAddEditFormRefs','addEditForm')
  },
  computed:{
    ...mapState({
      mainData:state => state.diypage.mainData,
      pageData:state => state.diypage.pageData
    })
  },
  methods:{
    setFormData(res){
      let _this = this
      _this.panelConfigs.map((configs)=>{
        configs.column.map((item,index)=>{
          if(item.component && item.component.field){
            if(res){
              _this.$set(_this.addEditForm,item.component.field,res[item.component.field])
            }else{
              _this.$set(_this.addEditForm,item.component.field,null)
            }

            if(item.component.require){
              _this.addEditRules[item.component.field] = [
                { required: true,message:item.component.message}
              ]
            }

          }
        })
      })
    },
    getPanelConfigs(){
      let _this = this
      _this.mainData.map(item=>{
        if(item.type=='panel'){
          _this.panelConfigs.push(item)
        }
      })
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
          let value = _this.$route.query[acceptParams.name]
          params = Object.assign({
            token:token,
            id:value
          })
          _this.$http.post(_this.pageData.infoApiService,params).then((res)=>{
            if(res.data.ret==200){
              resolve(res.data.data)
            }
          })
        }
      })
    }
  },
  components:{
    lineBreak,
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
  // padding-left: 10px;
  .deco{
    width: 7px;
    height: 7px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
  }
}
.configs-content{
  // padding: 10px 0 10px 0;
  // border-radius: 5px;
  .panel-item{
    border-radius: 5px;
    padding: 10px;
  }
}

</style>
<style lang="less">
.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-textarea__inner{
  border:1px solid #dcdfe6 !important;
}
</style>