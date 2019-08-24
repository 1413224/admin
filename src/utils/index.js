export default {
  testPhone(phone){
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
      // alert("手机号码有误，请重填");  
      return true; 
    } 
  },
  testPassword(value){//8-16位，必须包含字母和数字
    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value))){
      return true
    }
  },
  getToken(){
    if(localStorage.getItem('info')){
      let info = JSON.parse(localStorage.getItem("info"))
      return info.token
    }
  },
  getTimestamp(){
    return new Date().getTime()
  },
  findBrothersComponents(context, componentName, exceptMe = true){
    let res = context.$parent.$children.filter(item=>{
      if(item.$options.name == componentName){
        return item
      }
    })
    // let index = res.findIndex(item => item._uid == context._uid)
    // if (exceptMe) res.splice(index, 1)
    return res
  }
}