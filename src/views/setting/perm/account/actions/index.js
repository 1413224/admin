export default {
  getGroupList(){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.PermAccount.GetAllGroupList,{
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret == 200){
          let data = res.data.data
          _this.options = data.list.map((item,index)=>{
            return {
              label:item.name,
              value:item.id
            }
          })
          // _this.options.unshift({label:'全部',value:''})
          resolve()
        }
      })
    })
  },
  getList(sort){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.PermAccount.GetList,{
      token:_this.$utils.getToken(),
      status:_this.searchForm.status,
      keyword:_this.searchForm.keyword,
      perm_group_id:_this.searchForm.roleType,
      sort:sort ? sort : 2,
      page_size:_this.pageSize,
      page_num:_this.curPage
    }).then((res)=>{
      let data = res.data.data
      _this.tableData = data.list
      _this.totalNums = Number(data.total_nums)
      _this.totalPages = data.total_pages || 1
    })
  },
  changeStatus(status,id){
    let _this = this
    if(status==0){
      status=1
    }else{
      status=0
    }
    _this.$http.post(_this.baseUrl + _this.url.PermAccount.ChangeStatusById,{
      token:_this.$utils.getToken(),
      id:id,
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
  delRole(id){
    let _this = this
    _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.PermAccount.DeleteByIds,{
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
  delRolepl(){
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
    
    _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.PermAccount.DeleteByIds,{
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
    })
  }
}