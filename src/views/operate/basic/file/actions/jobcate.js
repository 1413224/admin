export default {
  getList(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Category.GetAllList,{
      token:_this.$utils.getToken(),
      type:2,
      status:-1
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.tableData = data.list
      }
    })
  },
  addFirstCate(){
    let _this = this
    _this.pId = null 
    _this.dialogPageText = '添加分类'
    _this.pageForm.name = ''
    _this.pageForm.desc = ''
    _this.pageForm.status = '1'
    _this.isEdit = false
    _this.isLine = false
    _this.dialogPage = true
  },
  handleAdd(row){
    console.log(row)
    let _this = this
    _this.isLineEdit = false //重置
    _this.isLineEditRight = false //重置
    _this.pageForm.cname = row.name
    _this.isLine = true
    _this.getSubList(0)//获取第一层，并只显示第一层

    _this.pId = row.id //要适当删除

    _this.dialogPageText = '添加分类'
    _this.pageForm.name = ''
    _this.pageForm.desc = ''
    _this.pageForm.status = '1'
    _this.isEdit = false
    
    _this.dialogPage = true
  },
  handleEdit(row){
    let _this = this
    _this.dialogPageText = '编辑分类'
    _this.isEdit = true
    _this.isLineEdit = false
    _this.level = row.level
    _this.getInfo(row.id,row.level).then(()=>{
      if(row.level!=1){
        _this.isLine = true
        _this.setSubList(0)
      }else{
        _this.isLine = false
      }
    })
  },
  submitEditPage(formName){
    let _this = this,
        url = '',
        params = {};
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        name:_this.pageForm.name,
        type:2,
        description:_this.pageForm.desc,
        status:_this.pageForm.status
      }

      if(!_this.isEdit){
        url = _this.baseUrl + _this.url.Category.Add
        if(!_this.isLineEdit){//不主动修改所属分类
          if(_this.pId){
            params.parent_id = _this.pId
          }
        }else{//主动修改所属分类
          if(_this.pageForm.pageType){
            params.parent_id = _this.pageForm.pageType
            // console.log('2ji'+params.parent_id)
          }else{
            params.parent_id = _this.pageForm.roleType
            // console.log('1ji'+params.parent_id)
          }
        }
      }else{
        url = _this.baseUrl + _this.url.Category.EditById
        params.id = _this.editId
        if(_this.level==1){//只有一级
          params.parent_id = 0
        }else{
          if(!_this.isLineEdit){//不主动修改所属分类
            _this.editParentIds = row.parent_id
          }else{
            if(_this.pageForm.pageType){
              params.parent_id = _this.pageForm.pageType
              // console.log('2ji'+params.parent_id)
            }else{
              params.parent_id = _this.pageForm.roleType
              // console.log('1ji'+params.parent_id)
            }
          }
        }
      }
      // return
      _this.$http.post(url,params).then((res)=>{
        if(res.data.ret==200){
          if(!_this.isEdit){
            _this.$message({
              type: 'success',
              message: '添加成功!'
            })
          }else{
            _this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
          _this.pId = ''
          _this.getList()
          _this.dialogPage = false
        }
      })

    })
  },
  changeStatus(status,id){
    let _this = this
    // console.log(id)
    // return
    if(status==0){
      status = 1
    }else{
      status = 0
    }
    _this.$http.post(_this.baseUrl + _this.url.Category.ChangeStatusByIds,{
      token:_this.$utils.getToken(),
      type:2,
      ids:id,
      status:status
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        _this.getList()
      }
    })
  },
  umDisplayOrder(id,type){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Category.UpdateMenuDisplayOrder,{
      token:_this.$utils.getToken(),
      id:id,
      type:type
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        _this.getList()
      }
    })
  },
  handleDel(row){
    let _this = this
    _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Category.DelByIds,{
        token:_this.$utils.getToken(),
        ids:row.id,
        type:2
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '删除成功!'
          })
          _this.getList()
        }
      })
    }).catch(()=>{
      _this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  },
  lineEditBtn(){
    this.isLineEdit = true
  },
  lineEditBtnRight(){
    this.isLineEdit = false
  },
  closeDialogPage(done){
    this.$refs['pageForm'].resetFields()
    this.isLineEditLeft = false
    this.level = null
    done()
  },
  changeSel(value){
    // console.log(value)
    let _this = this
    if(!_this.isEdit){//新增
      _this.getSubList(value)
    }else{
      if(_this.level==2){
        return
      }
      if(_this.level==3){
        _this.getSubList(value)
        _this.pageForm.pageType = ''
      }
    }
  },
  setSubList(id){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Category.GetSubList,{
      token:_this.$utils.getToken(),
      type:2,
      parent_id:id
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        if(id==0){
          //获取第一级
          // data.list.map((item,index)=>{
          //   _this.roleTypeOptions.push({
          //     label:item.name,
          //     value:item.id
          //   })
          // })
          let arr = []
          data.list.map((item,index)=>{
            arr.push({
              label:item.name,
              value:item.id
            })
          })
          _this.roleTypeOptions = arr
          if(_this.level==2){
            _this.pageForm.roleType = Number(_this.rowData.parent_ids.split(',')[0])
          }
          if(_this.level==3){
            _this.pageForm.roleType = Number(_this.rowData.parent_ids.split(',')[0])
            _this.getSubList(_this.pageForm.roleType).then(()=>{
              _this.pageForm.pageType = Number(_this.rowData.parent_ids.split(',')[1])
              _this.isLineEditRight = true //需要重置
            })
          }
        }
      }
    })
  },
  getSubList(id){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.Category.GetSubList,{
        token:_this.$utils.getToken(),
        type:2,
        parent_id:id
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          // console.log(data)
          if(id==0){
            //获取第一级
            data.list.map((item,index)=>{
              _this.roleTypeOptions.push({
                label:item.name,
                value:item.id
              })
            })
          }else{//获取第二级
            if(!_this.isEdit){//新增
              data.list.map((item,index)=>{
                _this.pageTypeOptions.push({
                  label:item.name,
                  value:item.id
                })
              })
              _this.isLineEditRight = true //需要重置
            }else{//编辑
              // console.log(_this.level)
              let arr = []
              data.list.map((item,index)=>{
                arr.push({
                  label:item.name,
                  value:item.id
                })
              })
              _this.pageTypeOptions = arr
              _this.isLineEditRight = true //需要重置
            }
          }
          resolve()
        }
      })
    })
  },
  getInfo(id,level){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.editId = id //赋值编辑具体数据id
      _this.$http.post(_this.baseUrl + _this.url.Category.GetInfoById,{
        token:_this.$utils.getToken(),
        id:id
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          console.log(data)
          _this.rowData = data
          _this.pageForm.cname = data.parent_name
          _this.pageForm.name = data.name
          _this.pageForm.desc = data.description
          _this.pageForm.status = data.status.toString()
          _this.dialogPage = true
          resolve()
        }
      })
    })
  }
}