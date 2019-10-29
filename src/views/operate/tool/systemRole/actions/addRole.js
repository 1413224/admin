import { resolve } from "q"

export default {
  GetPermList(){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.cloudUrl + _this.url.cloud.Perm.GetPermByRoleType,{
        token:_this.$utils.getToken(),
        role_type:_this.roleType
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
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
  oneChange(checked,item,index){//一级勾选
    // console.log(checked)
    // console.log(this.roleList)
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
  GetInfo(){
    let _this = this
    let roleListChild = []

    _this.$http.post(_this.baseUrl + _this.url.PermGroup.GetInfoById,{
      token:_this.$utils.getToken(),
      id:_this.$route.query.id
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.ruleForm.roleName = data.name
        _this.ruleForm.roleDesc = data.remark
        _this.ruleForm.status = data.status

        // _this.roleList.map((item,index)=>{
        //   item.children.map((itm,idx)=>{
        //     roleListChild.push(itm)
        //   })
        // })

        // data.perm_ids.map((item,index)=>{
        //   roleListChild.map((itm,idx)=>{
        //     if(item == itm.id){
        //       itm.checkAll = true
        //     }
        //     itm.children.map((lab,i)=>{
        //       if(item == lab.id){
        //         itm.checkedCities.push(item)
        //       }
        //     })
        //   })
        // })
        data.perm_ids.map((item,index)=>{
          _this.roleList.map((itm,idx)=>{
            if(item == itm.id){//第一级
              itm.checked = true
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
        // console.log(_this.roleList)
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
    })
  },
  submitManage(formName){
    let _this = this
    let idsArr = []
    let url = ''
    let params = {}
    this.$refs[formName].validate((valid)=>{
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
      // console.log(_this.ids)

      params = {
        token:_this.$utils.getToken(),
        name:_this.ruleForm.roleName,
        code:_this.ruleForm.roleDesc,
        perm_ids:_this.ids,
        status:_this.ruleForm.status,
        role_type:_this.roleType
      }

      if(_this.isEdit){
        url = _this.baseUrl + _this.url.PermGroup.EditById
        params.id = _this.$route.query.id
      }else{
        url = _this.baseUrl + _this.url.PermGroup.AddPermGroup
      }

      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          if(!_this.isEdit){
            _this.$message({
              type: 'success',
              message: '新增成功!'
            })
          }else{
            _this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
          _this.$router.push({
            path:'/operate/tool/systemRole/roleList',
            query:{
              roleType:_this.roleType
            }
          })
        }
      })
    })
  }
}