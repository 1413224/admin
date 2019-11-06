export default {
  getGroupList(){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.PermAccount.GetAllGroupList,{
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret == 200){
          let data = res.data.data
          _this.roleOptions = data.list.map((item,index)=>{
            return {
              label:item.name,
              value:item.id
            }
          })
          // _this.roleOptions.unshift({label:'全部',value:'-1'})
          resolve()
        }
      })
    })
  },
  GetPermList(){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.cloudUrl + _this.url.cloud.Perm.GetPermByRoleType,{
        token:_this.$utils.getToken(),
        role_type:_this.url.role_type
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data.list
          _this.roleList = data
          _this.roleList.map((item,index)=>{
            if(item.children.length!=0){
              _this.$set(item,'checked',false)
              _this.$set(item,'isIndeterminate',false)

              item.children.map((itm,idx)=>{
                _this.$set(itm,'isIndeterminate',false)
                _this.$set(itm,'checkAll',false)
                _this.$set(itm,'checkedCities',[])
                itm.children.map((lab,i)=>{
                  _this.$set(lab,'checked',false)
                })
              })
            }
          })
          // console.log(_this.roleList)
          resolve()
        }
      })
    })
  },
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
  changeRoleSel(value){

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
      _this.roleList.map((item)=>{
        if(item.checked==true){
          idsArr.push(item.id)
        }
        item.children.map((itm,idx)=>{
          if(itm.checkAll==true){
            idsArr.push(itm.id)
          }
          if(itm.checkedCities.length!=0){
            itm.checkedCities.map((lab,i)=>{
              idsArr.push(lab)
            })
          }
        })
      })
      _this.ids = idsArr.toString()

      params = {
        role_type:_this.url.role_type,
        token:_this.$utils.getToken(),
        account:_this.ruleForm.name,
        nickname:_this.ruleForm.nickName,
        number:_this.ruleForm.nums,
        mobile:_this.ruleForm.phone,
        verification_code:_this.ruleForm.yzm,
        password:_this.MD5(_this.ruleForm.pass),
        remark:_this.ruleForm.desc,
        status:_this.ruleForm.status,
        perm_ids:_this.isSuperAccount ? 'ALL' : _this.ids,
        perm_group_id:_this.ruleForm.role
      }

      if(!_this.isEdit){
        url = _this.baseUrl + _this.url.PermAccount.Add
      }else{
        url = _this.baseUrl + _this.url.PermAccount.ChangeInfoById
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
            path:'/setting/perm/account'
          })
        }
      })

    })
  },
  getInfo(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.PermAccount.GetInfoById,{
      token:_this.$utils.getToken(),
      id:_this.$route.query.id
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        // console.log(data)
        _this.info = data
        //赋值
        _this.setFormData(_this.info)
      }
    })
  },
  setFormData(data){
    let _this = this
    _this.ruleForm.name = data.account
    _this.ruleForm.nickName = data.nickname
    _this.ruleForm.nums = data.number
    _this.ruleForm.role = data.perm_group_id
    if(data.perm_group_id){
      _this.changeRoleSel(data.perm_group_id)
    }
    _this.ruleForm.desc = data.remark
    _this.ruleForm.status = Number(data.status)
    
  },
  changeRoleSel(id){
    // console.log(id)
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.commonPermGroup.GetInfoById,{
      token:_this.$utils.getToken(),
      id:id
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data

        if(data.perm_ids=='ALL'){
          _this.superAccountText = data.remark
          _this.isSuperAccount = true
        }else{
          _this.isSuperAccount = false
          data.perm_ids.map((item,index)=>{
            _this.roleList.map((itm,idx)=>{
              if(item == itm.id){//第一级
                itm.checked = true
                itm.isIndeterminate = false
              }
              itm.children.map((lab,i)=>{//第二级
                if(item == lab.id){
                  lab.checkAll = true
                }
                lab.children.map((thirdItem,thirdIndex)=>{
                  if(item == thirdItem.id){
                    lab.checkedCities.push(item)
                  }
                })
              })
            })
          })
  
          _this.roleList.map((firstItem,firstIndex)=>{
            firstItem.children.map((secondItem,secondIndex)=>{
              if(secondItem.checkedCities.length!=0 && firstItem.checked!=true){
                firstItem.isIndeterminate = true
                secondItem.isIndeterminate = true
              }
              
              if(secondItem.checkedCities.length==secondItem.children.length){
                secondItem.checkAll = true
                secondItem.isIndeterminate = false
              }
            })
          })
        }

      }
    })
  },


  oneChange(){
    let _this = this
    if(checked==true){
      item.isIndeterminate = false
      item.children.map((itm,idx)=>{
        itm.isIndeterminate = false
        itm.checkAll = true
        itm.children.map((lab,i)=>{
          itm.checkedCities.push(lab.id)
        })
      })
    }else{
      item.children.map((itm,idx)=>{
        itm.checkAll = false
        itm.checkedCities = []
      })
    }
  },
  handleCheckAllChange(checked,item,firstIndex,idx){//二级勾选
    let _this = this
    if(checked==true){
      item.checkedCities = []
      item.children.map((itm,idx) => {
        item.checkedCities.push(itm.id)
      })
      item.isIndeterminate = false
    }else{
      item.children.map((itm,idx) => {
        item.checkedCities = []
      })
    }

    if(_this.filterSecondChildFalse(firstIndex)==true){//二级是否全部取消
      _this.roleList[firstIndex].checked = false
      _this.roleList[firstIndex].isIndeterminate = false
    }else{
      _this.roleList[firstIndex].isIndeterminate = true
    }

    if(_this.filterSecondChild(firstIndex)==true){//二级是否全部勾选中了
      _this.roleList[firstIndex].isIndeterminate = false
      _this.roleList[firstIndex].checked = true
    }else{
      _this.roleList[firstIndex].checked = false
    }

  },
  handleCheckedCitiesChange(value,item,firstIndex,idx){//三级勾选
    // console.log(item)
    let _this = this
    item.checkAll = item.checkedCities.length == item.children.length ? true : false
    item.isIndeterminate = item.checkedCities.length > 0 
    && item.checkedCities.length < item.children.length

    //查找二级的isIndeterminate是否有一个为true
    if(_this.filterSecondIsIndeterminate(firstIndex)==true){
      _this.roleList[firstIndex].isIndeterminate = true
    }else{
      _this.roleList[firstIndex].isIndeterminate = false
    }

    if(_this.filterSecondChild(firstIndex)==true){//二级是否全部勾选中了
      _this.roleList[firstIndex].checked = true
      _this.roleList[firstIndex].isIndeterminate = false
    }else{
      _this.roleList[firstIndex].checked = false
    }

  },
  filterSecondChildFalse(firstIndex){//二级是否全部取消
    let _this = this
    let len = _this.roleList[firstIndex].children.length
    for(let i=0;i<len;i++){
      if(_this.roleList[firstIndex].children[i].checkAll == true){
        return false
      }
    }
    return true
  },
  filterSecondChild(firstIndex){//二级是否全部勾选
    let _this = this
    let len = _this.roleList[firstIndex].children.length
    for(let i=0;i<len;i++){
      if(_this.roleList[firstIndex].children[i].checkAll == false){
        return false
      }
    }
    return true
  },
  filterSecondIsIndeterminate(firstIndex){//查找二级的isIndeterminate是否有一个为true
    let _this = this
    let len = _this.roleList[firstIndex].children.length
    for(let i=0;i<len;i++){
      if(_this.roleList[firstIndex].children[i].isIndeterminate == true 
        || _this.roleList[firstIndex].children[i].checkAll == true){
        return true
      }
    }
    return false
  },
}