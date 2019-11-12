export default {
  getList(sort){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Interest.GetAllList,{
      token:_this.$utils.getToken(),
      keyword:_this.searchForm.keyword,
      sort:sort ? sort : 2
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.tableData = data.list
      }
    })
  },
  addInterest(){
    let _this = this
    _this.isEdit = false
    _this.dialogInteText = '添加兴趣爱好'
    _this.intereForm.interest = []
    _this.dialogInte = true
  },
  submitEditIntere(formName){
    let _this = this,
        url = '',
        params = {};
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      params = {
        token:_this.$utils.getToken(),
        name:_this.intereForm.interest.toString()
      }

      if(!_this.isEdit){
        url = _this.baseUrl + _this.url.Interest.Add
      }else{
        url = _this.baseUrl + _this.url.Interest.EditById
        params.id = _this.id
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
          _this.dialogInte = false
          _this.getList()
        }
      })
    })
  },
  editInterest(id,row){
    let _this = this
    _this.id = id
    _this.isEdit = true
    _this.dialogInteText = '编辑兴趣爱好'
    _this.intereForm.interest.push(row.name)
    _this.dialogInte = true
  },
  delInterest(id){
    let _this = this
    _this.$confirm('此操作将永久删除该兴趣爱好吗？ 请确认操作！','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Interest.DelByIds,{
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
  delInterestPl(){
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

    _this.$confirm('此操作将永久删除该兴趣爱好吗？ 请确认操作！', '提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Interest.DelByIds,{
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