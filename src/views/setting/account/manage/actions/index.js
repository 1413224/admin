export default {
  getInfo(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.user.GetInfo,{
      token:_this.$utils.getToken(),
      role_type:_this.url.role_type
    }).then((res)=>{
      if(res.data.ret==200){
        _this.userInfo = res.data.data
      }
    })
  },
  changePass(formName){
    let _this = this
    let params 
    let url
    this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        role_type:_this.url.role_type,
        token:_this.$utils.getToken(),
        new_password:_this.MD5(_this.passForm.newPass)
      }
      if(_this.usePassChange){
        params.old_password = _this.MD5(_this.passForm.pass)
        url = _this.baseUrl + _this.url.user.ChangePasswordByOld
      }
      if(!_this.usePassChange){
        params.verification_code = _this.passForm.yzm
        url = _this.baseUrl + _this.url.user.ChangePasswordByCode
      }
      
      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type:'success',
            message:'修改成功'
          })
          _this.$refs[formName].resetFields()
          _this.$router.replace({
            path:'/login'
          })
        }
      })
    })
  },
  
  getYzmByChangePass(){
    let _this = this
    // _this.changePassCountDown()
    _this.$http.post(_this.baseUrl + _this.url.user.GetLoginCode,{
      role_type:_this.url.role_type,
      token:_this.$utils.getToken(),
      type:1
    }).then((res)=>{
      if(res.data.ret==200){
        _this.changePassCountDown()
      }
    })
  },
  changePassCountDown(){
    let _this = this,
        time = 60;
    let timer = setInterval(()=>{
      _this.showChangePassByYzm = false
      time--;
      _this.timesChangePass = time + 's'
      if(time == 0){
        clearInterval(timer)
        _this.showChangePassByYzm = true
      }
    },1000)
  },
  passChangeBtn(){
    let _this = this
    _this.$refs['passForm'].resetFields()
    _this.usePassChange = false
  },
  yzmChangeBtn(){
    let _this = this
    _this.$refs['passForm'].resetFields()
    _this.usePassChange = true
  },
  lianxiBtn(){
    let _this = this
    _this.dialogEmergency = true
  },
  getYzmByChangeEmail(){
    let _this = this
    _this.changeEmailCountDown()
    return;
    _this.$http.post(_this.baseUrl + _this.url.user.GetLoginCode,{
      role_type:_this.url.role_type,
      token:_this.$utils.getToken(),
      type:1
    }).then((res)=>{
      if(res.data.ret==200){
        _this.changeEmailCountDown()
      }
    })
  },
  changeEmailCountDown(){
    let _this = this,
        time = 60;
    let timer = setInterval(()=>{
      _this.showChangeEmailByYzm = false
      time--;
      _this.timesChangeEmail = time + 's'
      if(time == 0){
        clearInterval(timer)
        _this.showChangeEmailByYzm = true
      }
    },1000)
  },
  getYzmByBdPhoneForm(){
    let _this = this
    _this.changeBdPhoneCountDown()
    return;
    _this.$http.post(_this.baseUrl + _this.url.user.GetLoginCode,{
      role_type:_this.url.role_type,
      token:_this.$utils.getToken(),
      type:1
    }).then((res)=>{
      if(res.data.ret==200){
        _this.changeBdPhoneCountDown()
      }
    })
  },
  changeBdPhoneCountDown(){
    let _this = this,
        time = 60;
    let timer = setInterval(()=>{
      _this.showbdPhoneFormByYzm = false
      time--;
      _this.timesChangeBdPhoneForm = time + 's'
      if(time == 0){
        clearInterval(timer)
        _this.showbdPhoneFormByYzm = true
      }
    },1000)
  },
  SubmitBdPhome(formName){

  },
  showChangePhoneDialog(){
    this.dialogChangePhone = true
  },
  SubmitChangePhome(formName){
    let _this = this
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      _this.$http.post(_this.baseUrl + _this.url.user.ChangeMobile,{
        role_type:_this.url.role_type,
        token:_this.$utils.getToken(),
        password:_this.MD5(_this.changePhoneForm.pass),
        new_mobile:_this.changePhoneForm.newPhone,
        verification_code:_this.changePhoneForm.yzm
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type:'success',
            message:'修改成功'
          })
          _this.dialogChangePhone = false
          _this.$router.replace({
            path:'/login'
          })
        }
      })
    })
  },
  getYzmByChangePhoneForm(){
    let _this = this
    _this.changeChangePhoneCountDown()
    _this.$http.post(_this.baseUrl + _this.url.user.GetLoginCode,{
      role_type:_this.url.role_type,
      token:_this.$utils.getToken(),
      type:3,
      mobile:_this.changePhoneForm.newPhone
    }).then((res)=>{
      if(res.data.ret==200){
        _this.changeChangePhoneCountDown()
      }
    })
  },
  changeChangePhoneCountDown(){
    let _this = this,
        time = 60;
    let timer = setInterval(()=>{
      _this.showChangePhoneFormByYzm = false
      time--;
      _this.timesChangePhoneForm = time + 's'
      if(time == 0){
        clearInterval(timer)
        _this.showChangePhoneFormByYzm = true
      }
    },1000)
  },
  closeDialogPass(done){
    this.$refs['passForm'].resetFields()
    this.dialogPass = false
    done()
  },
  closeDialogEmergency(done){
    this.dialogEmergency = false
    done()
  },
  closeDialogEmail(done){
    this.dialogEmail = false
    done()
  },
  closeDialogPhonebd(done){
    this.dialogPhonebd = false
    done()
  },
  closeDialogChangePhone(done){
    this.dialogChangePhone = false
    done()
  }
}