export default {
  sendYZM(){
    let _this = this 
    if(_this.activeYZM){
      _this.$http.post(_this.baseUrl + _this.url.user.GetLoginCode,{
        role_type:_this.url.role_type,
        token:_this.$utils.getToken(),
        mobile:_this.ruleForm.phone,
        type:3
      }).then((res)=>{
        if(res.data.ret==200){
          _this.changePhoneCountDown()
        }
      })
    }
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
  getInfo(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.BackgroundFactory.GetInfoById,{
      token:_this.$utils.getToken(),
      id:_this.$route.query.id
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.account = data.account
        _this.phone = data.mobile
        _this.ruleForm.nickName = data.nickname
        _this.ruleForm.desc = data.remark
      }
    })
  },
  submitManage(formName){
    let _this = this,
        params = '',
        url = '',
        idsArr = [];
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        account:_this.ruleForm.name,
        nickname:_this.ruleForm.nickName,
        mobile:_this.ruleForm.phone,
        verification_code:_this.ruleForm.yzm,
        password:_this.ruleForm.pass ? _this.MD5(_this.ruleForm.pass) : '',
        status:_this.ruleForm.status,
        remark:_this.ruleForm.desc
      }
      if(!_this.isEdit){
        url = _this.baseUrl + _this.url.BackgroundFactory.Add
      }else{
        url = _this.baseUrl + _this.url.BackgroundFactory.ChangeInfoById
        params.id = _this.$route.query.id
      }
      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          if(_this.isEdit){
            _this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }else{
            _this.$message({
              type: 'success',
              message: '新增成功!'
            })
          }
          _this.$router.push({
            path:'/operate/developer/background'
          })
        }
      })
    })
  }
}