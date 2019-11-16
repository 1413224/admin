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
  getBindInfo(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Account.GetBindInfo,{
      token:_this.$utils.getToken(),
      role_type:_this.url.role_type
    }).then((res)=>{
      if(res.data.ret==200){
        _this.bindInfo = res.data.data
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
    _this.EmergencyForm.emergencyType = ''
    _this.EmergencyForm.name = ''
    _this.EmergencyForm.phone = ''
    _this.EmergencyForm.remack = ''
    _this.isEmergencyEdit = false
    _this.dialogEmergency = true
  },
  editEmergency(){
    let _this = this
    _this.EmergencyForm.emergencyType = _this.bindInfo.emergency_info.emergency_type
    _this.EmergencyForm.name = _this.bindInfo.emergency_info.emergency
    _this.EmergencyForm.phone = _this.bindInfo.emergency_info.egmobile
    _this.EmergencyForm.remack = _this.bindInfo.emergency_info.emergency_remark
    _this.isEmergencyEdit = true
    _this.dialogEmergency = true
  },
  unbindEmergency(){
    let _this = this
    _this.dialogEmerUnbind = true
  },
  unBindEmer(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Account.DelEmergencyInfo,{
      token:_this.$utils.getToken(),
      role_type:_this.url.role_type
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '删除成功!'
        })
        _this.dialogEmerUnbind = false
        _this.getBindInfo()
      }
    })
  },
  changeEmergency(formName){
    let _this = this,
        url = '',
        params = {};
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        role_type:_this.url.role_type,
        token:_this.$utils.getToken(),
        emergency_type:_this.EmergencyForm.emergencyType,
        emergency:_this.EmergencyForm.name,
        egmobile:_this.EmergencyForm.phone,
        emergency_remark:_this.EmergencyForm.remack
      }
      url = _this.baseUrl + _this.url.Account.ChangeEmergencyInfo
      
      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '修改成功!'
          })
        }
        _this.dialogEmergency = false
        _this.getBindInfo()
      })

    })
  },
  changeEmail(formName){
    let _this = this,
        url = '',
        params = {};
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        role_type:_this.url.role_type,
        verification_code:_this.EmailForm.yzm
      }
      if(!_this.isEmailEdit){
        url = _this.baseUrl + _this.url.Account.BindEmail
        params.email = _this.EmailForm.email
      }else{
        url = _this.baseUrl + _this.url.Account.ChangeEmail
        params.password = _this.MD5(_this.EmailForm.pass)
        params.new_email = _this.EmailForm.newEmail
      }

      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          if(!_this.isEmailEdit){
            _this.$message({
              type: 'success',
              message: '绑定成功!'
            })
          }else{
            _this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
          _this.getBindInfo()
          _this.dialogEmail = false
        }
      })
    })
  },
  unBindEmail(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Account.UnbindEmail,{
      role_type:_this.url.role_type,
      token:_this.$utils.getToken()
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '解绑成功!'
        })
        _this.getBindInfo()
        _this.dialogEmailUnbind = false
      }
    })
  },
  getYzmByChangeEmail(){
    let _this = this
    // _this.changeEmailCountDown()
    let email = ''
    if(!_this.isEmailEdit){
      email = _this.EmailForm.email
    }else{
      email = _this.EmailForm.newEmail
    }
    _this.$http.post(_this.baseUrl + _this.url.Account.GetLoginCode,{
      token:_this.$utils.getToken(),
      email:email,
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
  unBindWX(){
    let _this = this
    _this.$confirm('解绑后将无法使用 微信扫码 登录，请使用账号密码或其他快捷登录方式','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Area.UnbindWeChat,{
        token:_this.$utils.getToken(),
        role_type:_this.url.role_type
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '解绑成功!'
          })
          _this.getBindInfo()
        }
      })
    }).catch(()=>{
      _this.$message({
        type: 'info',
        message: '已取消'
      })
    })
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