export default {
  changeStatus(status,id){
    let _this = this
    if(status==0){
      status = 1
    }else{
      status = 0
    }
    _this.$http.post(_this.baseUrl + _this.url.Area.ChangeStatusByIds,{
      token:_this.$utils.getToken(),
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
  submitEditArea(formName){
    let _this = this,
        url = '',
        params = {};
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        name:_this.dialogForm.name,
        abbreviation:_this.dialogForm.abbreviation,
        thumb:_this.dialogForm.logo,
        number:_this.dialogForm.number,
        population:_this.dialogForm.population,
        status:_this.dialogForm.status
      }
      if(!_this.isEdit){
        url = _this.baseUrl + _this.url.Area.Add
        params.parent_id = _this.dialogForm.id
      }else{
        url = _this.baseUrl + _this.url.Area.EditById
        params.id = _this.dialogForm.id
      }
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
          _this.dialogVisible = false
          _this.getList()
        }
      })
    })
  },
  addManage(id,row){
    // console.log(row)
    let _this = this
    _this.dialogTitle = '添加地址'
    _this.dialogForm.parentName = row.name
    _this.dialogForm.parentId = row.parent_id
    _this.dialogForm.id = row.id
    _this.dialogForm.name = ''
    _this.dialogForm.abbreviation = ''
    _this.dialogForm.number = ''
    _this.dialogForm.population = ''
    _this.dialogForm.logo = ''
    _this.dialogForm.status = 1

    _this.isEdit = false
    _this.dialogVisible = true
  },
  editManage(id,row){
    let _this = this
    _this.isEdit = true
    _this.dialogTitle = '编辑地址'
    _this.$http.post(_this.baseUrl + _this.url.Area.GetInfoById,{
      token:_this.$utils.getToken(),
      id:id
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        // console.log(data)
        _this.dialogForm.parentName = data.parent_name
        _this.dialogForm.parentId = data.parent_id
        _this.dialogForm.id = data.id
        _this.dialogForm.name = data.name
        _this.dialogForm.abbreviation = data.abbreviation
        _this.dialogForm.number = data.number
        _this.dialogForm.population = data.population
        _this.dialogForm.logo = data.thumb
        _this.dialogForm.status = data.status
        _this.dialogVisible = true
      }
    })
  },
  delManage(id){
    let _this = this
    _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Area.DelByIds,{
        token:_this.$utils.getToken(),
        ids:id
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
  uploadImage(){
    let _this = this
    _this.uploadPic = true
  },
  
}