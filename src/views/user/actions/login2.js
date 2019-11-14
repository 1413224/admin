export default {
  getYzmChangePhone(){
    let _this = this 
    _this.changePhoneCountDown()
    return
    _this.$http.post(_this.baseUrl + _this.url.user.GetLoginCode,{
      role_type:_this.url.role_type,
      token:_this.$utils.getToken(),
      mobile:_this.changePhoneForm.newPhone,
      type:3
    }).then((res)=>{
      if(res.data.ret==200){
        _this.changePhoneCountDown()
      }
    })
  },
  changePhoneCountDown(){
    let _this = this,
        time = 60;
    let timer = setInterval(()=>{
      _this.showChangePhoneTime = false
      time--;
      _this.timesChangePhone = time + 's'
      if(time == 0){
        clearInterval(timer)
        _this.showChangePhoneTime = true
      }
    },1000)
  },
  login(){
    let _this = this
    if(_this.passForm.user==''){
      this.$message('请输入手机号码')
      return 
    }
    if(_this.passForm.pass==''){
      this.$message('请输入密码')
      return 
    }
    if(_this.$utils.testPhone(_this.passForm.user)){
      this.$message('请输入正确的手机号码')
      return
    }
    _this.$http.post(_this.baseUrl + _this.url.user.Login,{
      account:_this.passForm.user,
      password:_this.MD5(_this.passForm.pass),
      role_type:_this.url.role_type
    }).then((res)=>{
      if(res.data.ret==200){
        localStorage.setItem("info",JSON.stringify(res.data.data))
        if(_this.rememberUserName==true){
          localStorage.setItem("userName",_this.phone)
        }else{
          localStorage.removeItem("userName",_this.phone)
        }
        if(_this.$route.query.redirect){
          _this.$router.replace({
            path:_this.$route.query.redirect
          })
        }else{
          _this.$router.replace({
            path:'/home'
          })
        }
        
      }
    })
  }
}