export default {
  getList(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Protocol.GetList,{
      token:_this.$utils.getToken(),
      status:-1,
      keyword:_this.searchForm.keyword,
      page_size:_this.pageSize,
      page_num:_this.curPage
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        // _this.tableData = data.list
        let arr = []
        data.list.map((item,index)=>{
          arr.push({
            create_time:item.create_time,
            id:item.id,
            name:item.name,
            remark:item.remark,
            status:item.status==1 ? true : false,
            update_time:item.update_time
          })
        })
        _this.tableData = arr
        _this.totalNums = Number(data.total_nums)
        _this.totalPages = data.total_pages || 1
      }
    })
  },
  changeStatus(row){
    // console.log(row)
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Protocol.ChangeStatusByIds,{
      token:_this.$utils.getToken(),
      ids:row.id,
      status:row.status ? 1 : 0
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '修改成功！'
        })
        _this.getList()
      }
    })
  }
}