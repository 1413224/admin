// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import axios from './config/axios-config'
import store from './store/index'
import url from './api/api'
import MD5 from 'js-md5'
import utils from './utils/index'
import './utils/fillter'
import './utils/directives'
import { loadSkin } from './skin/index'
import yTitle from './components/yTitle/yTitle.vue'

import './style/reset.css'
import './style/global.less'
import 'element-ui/lib/theme-chalk/index.css'
import './icons/index'


document.documentElement.style.fontSize = 10 + 'px'
Vue.config.productionTip = false
Vue.prototype.url = url
Vue.prototype.$http = axios
Vue.prototype.MD5 = MD5
Vue.prototype.$utils = utils
Vue.prototype.baseUrl = '//dev.9yetech.com/apigw/'
Vue.prototype.cloudUrl = '//dev.9yetech.com/apigw/'
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.component('yTitle',yTitle)
Array.prototype.indexOf = function(val){
  for(let i=0;i<this.length;i++){
    if(this[i] == val) return i
  }
  return -1
}
Array.prototype.remove = function(val){
  let index = this.indexOf(val)
  if(index>-1){
    this.splice(index,1)
  }
}

if(localStorage.getItem('themeValue')){
  loadSkin.changeTheme(localStorage.getItem('themeValue'))
}else{
  loadSkin.changeTheme('blue')
}

router.beforeEach(async(to, from, next)=>{
  let hasToken = Vue.prototype.$utils.getToken()
  if(!hasToken){
    if(to.path=='/login'){
      next()
    }else{
      next(`/login?redirect=${to.path}`)
    }
  }else{
    if(to.path!='/login'){
      store.dispatch('getMenuList').then((res)=>{
        next({})
      })
    }else{
      next()
    }
    
  }
  
})

router.afterEach(()=>{
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
