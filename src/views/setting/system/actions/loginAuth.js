import { resolve } from "url"

export default {
  showQQdialog(){
    let _this = this
    _this.QQform.AppID = _this.qqInfo.app_id
    _this.QQform.AppSecret = _this.qqInfo.app_secret
    _this.QQform.weburl = _this.qqInfo.url
    _this.QQform.webyu = _this.qqInfo.back_url
    _this.qqDialog = true
  },
  showWXdialog(){
    let _this = this
    _this.WXform.AppID = _this.wxInfo.app_id
    _this.WXform.AppSecret = _this.wxInfo.app_secret
    _this.WXform.weburl = _this.wxInfo.url
    _this.WXform.webyu = _this.wxInfo.back_url
    _this.wxDialog = true
  },
  getQQauth(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.QQAuth.GetInfo,{
      token:_this.$utils.getToken()
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.qqInfo = data
        if(data.status==1){
          _this.QQauth = true
        }
      }
    })
  },
  closeDialogQQ(done){
    let _this = this
    if(!_this.qqInfo.app_id){
      _this.QQauth = false
    }
    done()
  },
  calcelQQ(formName){
    this.$refs[formName].resetFields()
    if(!this.qqInfo.app_id){
      this.QQauth = false
    }
    this.qqDialog = false
  },
  calcelWX(formName){
    this.$refs[formName].resetFields()
    if(!this.wxInfo.app_id){
      this.WXauth = false
    }
    this.wxDialog = false
  },
  closeDialogWX(done){
    let _this = this
    if(!_this.wxInfo.app_id){
      _this.WXauth = false
    }
    done()
  },
  changeQQauth(value){
    let _this = this
    if(_this.qqInfo.app_id){
      if(value){
        _this.changeQQStatus(1)
      }else{
        _this.changeQQStatus(0)
      }
    }else{
      _this.qqDialog = true
    }
  },
  submitQQ(formName){
    let _this = this
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      _this.$http.post(_this.baseUrl + _this.url.QQAuth.SaveInfo,{
        token:_this.$utils.getToken(),
        app_id:_this.QQform.AppID,
        app_secret:_this.QQform.AppSecret,
        url:_this.QQform.weburl,
        back_url:_this.QQform.webyu,
        status:1
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '修改成功!'
          })
          if(!_this.qqInfo.app_id){
            _this.changeQQStatus(1)
          }
          _this.QQauth = true
          _this.qqDialog = false
          _this.getQQauth()
        }
      })
    })
  },
  changeQQStatus(status){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.QQAuth.ChangeStatus,{
        token:_this.$utils.getToken(),
        status:status
      }).then((res)=>{
        if(res.data.ret==200){
          
          resolve()
        }
      })
    })
  },
  changeWXStatus(status){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.WeChatAuth.ChangeStatus,{
        token:_this.$utils.getToken(),
        status:status
      }).then((res)=>{
        if(res.data.ret==200){
          
          resolve()
        }
      })
    })
  },
  submitWX(formName){
    let _this = this
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      _this.$http.post(_this.baseUrl + _this.url.WeChatAuth.SaveInfo,{
        token:_this.$utils.getToken(),
        app_id:_this.WXform.AppID,
        app_secret:_this.WXform.AppSecret,
        url:_this.WXform.weburl,
        back_url:_this.WXform.webyu,
        status:1
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '修改成功!'
          })
          if(!_this.wxInfo.app_id){
            _this.changeWXStatus(1)
          }
          _this.WXauth = true
          _this.wxDialog = false
          _this.getWXauth()
        }
      })
    })
  },
  changeWXauth(value){
    let _this = this
    if(_this.wxInfo.app_id){
      if(value){
        _this.changeWXStatus(1)
      }else{
        _this.changeWXStatus(0)
      }
    }else{
      _this.wxDialog = true
    }
  },
  getWXauth(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.WeChatAuth.GetInfo,{
      token:_this.$utils.getToken()
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.wxInfo = data
        if(data.status==1){
          _this.WXauth = true
        }
      }
    })
  },
}