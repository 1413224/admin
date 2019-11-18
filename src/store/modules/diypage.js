import Vue from 'vue'
// import router from '../../router'

import { resolve, reject } from 'q';
let _this = Vue.prototype
const diypage = {
  state:{
    pageData:{},
    headerData:{},
    mainData:[],
    ruleForm:{},
    addEditForm:{},
    addEditFormRefs:'',
    lineConfig:[],
    tableConfig:{},
    listNum:0,
    ids:'',
    resetChecklist:0,
    addOrEditBtn:'',
  },

  mutations:{
    setConfigs(state,configData){
      if(configData.page){
        state.pageData = configData.page
      }
      if(configData.header){
        state.headerData = configData.header
      }
      if(configData.main){
        state.mainData = configData.main
        configData.main.map((item,index)=>{
          if(item.type=="diyTable"){
            state.lineConfig = item.line
            state.tableConfig = item
          }
        })
      }
      
    },
    setRuleForm(state,data){
      state.ruleForm = data
    },
    setAddEditForm(state,data){
      state.addEditForm = data
    },
    setAddEditFormRefs(state,data){
      state.addEditFormRefs = data
    },
    changeList(state,data){
      state.listNum += data
    },
    setIds(state,data){
      state.ids = data
    },
    resetCheckList(state,data){
      state.resetChecklist += 1
    },
    setAddOrEditBtn(state,data){
      state.addOrEditBtn = data
    },
  },
  actions:{
    getConfigs({ commit },path){
      let url = path
      return new Promise((resolve,reject)=>{
        _this.$http.post(_this.baseUrl + _this.url.control.GetDiyListPage,{
          token:_this.$utils.getToken(),
          path:url
        }).then((res)=>{
          if(res.data.ret==200){
            // console.log(res.data.data)
            commit('setConfigs',res.data.data)
            resolve(res.data.data)
          }
        })
      })
    }
  }
}

export default diypage