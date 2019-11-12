export default {
  getList(sort){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.SensitiveWord.GetList,{
      token:_this.$utils.getToken(),
      sort:sort ? sort : 2,
      keyword:_this.searchForm.keyword,
      page_size:_this.pageSize,
      page_num:_this.curPage
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.tableData = data.list
        _this.totalNums = Number(data.total_nums)
        _this.totalPages = data.total_pages || 1
      }
    })
  },
  submitAdd(formName){
    let _this = this,
        url = '',
        params = {};
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        keyword:_this.mgcForm.mgc.toString()
      }

      if(!_this.isEdit){
        url = _this.baseUrl + _this.url.SensitiveWord.Add
      }else{
        url = _this.baseUrl + _this.url.SensitiveWord.EditById
        params.id = _this.editId
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
          _this.getList()
          _this.mgcDialog = false
        }
      })

    })
  },
  Import(obj){
    let _this = this
    let fileObj = obj.file
    let form = new FormData()

    form.append("word_file", fileObj)
    form.append("token", _this.$utils.getToken())
    _this.$http({
      method:'post',
      url:_this.baseUrl + _this.url.SensitiveWord.Import,
      data:form,
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    }).then((res)=>{
      if(res.data.ret==200){
        _this.getList()
      }
    })
  },
  editSen(row){
    let _this = this
    _this.isEdit = true
    _this.editId = row.id
    _this.dialogTitle = '编辑敏感词'
    _this.mgcForm.mgc = row.keyword.split(',')
    _this.mgcDialog = true
  },
  delRole(id){
    let _this = this
    _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.SensitiveWord.DelByIds,{
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
  delAccount(){
    let _this = this,
        idsArr = [],
        ids = '';
    if(_this.selection.length==0){
      _this.$message({
        type: 'warning',
        message: '请选择需要删除的数据!'
      })
      return false
    }
    _this.selection.map((item,index)=>{
      idsArr.push(item.id)
    })
    ids = idsArr.toString()

    _this.$confirm('此操作将永久删除该信息, 是否继续?', '提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.SensitiveWord.DelByIds,{
        token:_this.$utils.getToken(),
        ids:ids
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
  }
}