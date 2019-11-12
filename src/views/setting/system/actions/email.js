export default {
  submitManage(formName){
    let _this = this,
        url = '',
        params = {};
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
      }
      if(_this.sendForm.stmpType==1){
        params.type = 1
        params.username = _this.sendForm.userName
        params.password = _this.sendForm.pass
        params.nickname = _this.sendForm.sendName
        params.sign = _this.sendForm.desc
      }
      if(_this.sendForm.stmpType==2){
        params.type = 2
        params.username = _this.sendForm.qquserName
        params.password = _this.sendForm.qqpass
        params.nickname = _this.sendForm.qqsendName
        params.sign = _this.sendForm.qqdesc
      }

      if(_this.sendForm.stmpType==3){
        params.type = 3
        params.host = _this.sendForm.zdyStmURL
        params.zdyStmpro = _this.sendForm.port
        params.is_ssl = _this.sendForm.zdySSLtype

        params.username = _this.sendForm.zdySendUser
        params.password = _this.sendForm.zdySendCode
        params.nickname = _this.sendForm.zdySendName
        params.sign = _this.sendForm.adyEmailDesc
      }

      _this.$http.post(_this.baseUrl + _this.url.Mailer.SaveInfo,params).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '保存成功!'
          })
          _this.sendForm.userName = ''
          _this.sendForm.pass = ''
          _this.sendForm.sendName = ''
          _this.sendForm.zdySSLtype = 0
          _this.sendForm.zdyStmURL = ''
          _this.sendForm.zdyStmpro = ''
          _this.sendForm.zdySendUser = ''
          _this.sendForm.zdySendCode = ''
          _this.sendForm.zdySendName = ''
          _this.sendForm.adyEmailDesc = ''
          _this.sendForm.qquserName = ''
          _this.sendForm.qqpass = ''
          _this.sendForm.qqsendName = ''
          _this.sendForm.qqdesc = ''
          _this.getInfo()
        }
      })
    })
  },
  getInfo(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Mailer.GetInfo,{
      token:_this.$utils.getToken()
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.Info = data

        _this.sendForm.stmpType = _this.Info.type
        if(_this.Info.type==1){
          _this.sendForm.userName = _this.Info.username
          _this.sendForm.pass = _this.Info.password
          _this.sendForm.sendName = _this.Info.nickname
          _this.sendForm.desc = _this.Info.sign
        }
        if(_this.Info.type==2){
          _this.sendForm.qquserName = _this.Info.username
          _this.sendForm.qqpass = _this.Info.password
          _this.sendForm.qqsendName = _this.Info.nickname
          _this.sendForm.qqdesc = _this.Info.sign
        }
        if(_this.Info.type==3){
          _this.sendForm.zdyStmURL = _this.Info.host
          _this.sendForm.zdyStmpro = _this.Info.port
          _this.sendForm.zdySSLtype = Number(_this.Info.is_ssl)

          _this.sendForm.zdySendUser = _this.Info.username
          _this.sendForm.zdySendCode = _this.Info.password
          _this.sendForm.zdySendName = _this.Info.nickname
          _this.sendForm.adyEmailDesc = _this.Info.sign
        }

      }
    })
  },
  sendEmailSubmit(formName){
    let _this = this
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      _this.$http.post(_this.baseUrl + _this.url.Mailer.SendTestMailer,{
        token:_this.$utils.getToken(),
        email:_this.sendEmailForm.email
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '发送成功!'
          })
          _this.sendEmailDialog = false
        }
      })
    })
  }
}