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
        _this.tableData = data.list
      }
    })
  }
}