import Vue from 'vue'

Vue.directive('has',{
  inserted:function(el,binding,vnode){
    if(!$has(binding.value)){
      el.parentNode.removeChild(el)
    }
  }
})

function $has(value){
  let perm = JSON.parse(localStorage.getItem('info')).perm
  for(let i=0;i<perm.length;i++){
    if(value==perm[i].code){
      return true
    }
  }
}

