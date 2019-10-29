import { resolve } from "url"
import { rejects } from "assert"

export default {
  bdChangeTab(e,item, index,defaultGroupIndex) {
    let _this = this
    if(defaultGroupIndex==-1){
      _this.defaultGroupIndex = defaultGroupIndex
      _this.bdGroupIdx = null
      _this.bdGroupId = defaultGroupIndex
      _this.getBdImageList()
      return false
    }
    if(defaultGroupIndex==0){
      _this.defaultGroupIndex = defaultGroupIndex
      _this.bdGroupIdx = null
      _this.bdGroupId = defaultGroupIndex
      _this.getBdImageList()
      return false
    }
    _this.bdGroupIdx = index
    _this.defaultGroupIndex = null
    _this.bdGroupId = item.id
    _this.getBdImageList()
  },
  ptChangeTab(item,index){
    let _this = this
    _this.ptGroupIdx = index
  },
  addGroup(){
    let _this = this
  },
  settingGroup(item,index){
    // console.log(item)
    let _this = this
    _this.bdGroupIdx = index
    item.editShow = item.editShow ? false : true
    _this.defaultGroupIndex = null
    _this.bdGroupId = item.id
  },
  
  cancelBtn(item,index){
    let _this = this
    item.editShow = false
    item.submitShow = false
  },
  //获取平台分组list
  getPtGroupList(){
    let _this = this
    return new Promise((resolve,rejects)=>{
      _this.$http.post(_this.cloudUrl + _this.url.Group.GetPtGroupList,{
        token:_this.$utils.getToken(),
        page_size:_this.ptGroupPageSize,
        page_num:_this.ptGroupCurPage
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          data.list.unshift(
            {name:'全部'},
            {name:'未分组'},
          )
          _this.ptGroupData = data.list
        }
      })
    })
  },
  //获取本地分组list
  getBdGroupList(){
    let _this = this
    return new Promise((resolve,rejects)=>{
      _this.$http.post(_this.baseUrl + _this.url.Group.GetList,{
        token:_this.$utils.getToken(),
        role_type:_this.url.role_type,
        status:1,
        keyword:'',
        page_size:_this.bdGroupPageSize,
        page_num:_this.bdGroupCurPage
      }).then((res)=>{
        if(res.data.ret==200){
          // console.log(res.data.data)
          let data = res.data.data
          _this.bdGroupData = data.list
          _this.bdGroupData.map((item)=>{
            _this.$set(item,'editShow',false)
            _this.$set(item,'submitShow',false)
          })
          resolve()
        }
      })
    })
  },
  //添加本地分组
  addBdGroup(groupName){
    let _this = this,
        params = {};
    params.token = _this.$utils.getToken()
    params.status = 1
    params.name = groupName ? groupName : '未命名'
    
    _this.$http.post(_this.baseUrl + _this.url.Group.Add,params).then((res)=>{
      if(res.data.ret==200){
        _this.getBdGroupList()
      }
    })
  },
  //编辑本地分组
  editBtn(item,index){
    let _this = this
    item.submitShow = true
  },
  changeBdGroup(item){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.Group.ChangeInfoById,{
      token:_this.$utils.getToken(),
      id:item.id,
      name:item.name,
      status:1
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        _this.getBdGroupList()
      }
    })
  },
  //删除本地分组
  selBdGroup(item){
    // console.log(item)
    let _this = this
    _this.$confirm('此操作将永久删除该信息, 是否继续?','提示',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      _this.$http.post(_this.baseUrl + _this.url.Group.DelInfoById,{
        token:_this.$utils.getToken(),
        id:item.id
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type: 'success',
            message: '删除成功!'
          })
          _this.getBdGroupList()
        }
      })
    }).catch(()=>{
      _this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  },
  getBdImageList(){
    let _this = this,
        startTime,
        endTime;
    if(_this.bdYear==-1){
      startTime = '',
      endTime = ''
    }else{
      startTime = _this.$utils.computeTime(_this.bdYear,_this.bdMonth)[0]
      endTime = _this.$utils.computeTime(_this.bdYear,_this.bdMonth)[1]
    }

    _this.$http.post(_this.baseUrl + _this.url.attachmentLog.GetList,{
      token:_this.$utils.getToken(),
      attachment_config_id:_this.attachmentConfigId,
      attachment_group_id:_this.bdGroupId,
      type:0,
      start_time:startTime,
      end_time:endTime,
      page_size:_this.bdPageSize,
      page_num:_this.bdCurPage
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.bdListData = data.list
        _this.bdListData.map((item)=>{
          _this.$set(item,'active',false)
        })
        _this.bdTotalNums = Number(data.total_nums)
        _this.bdTotalPages = data.total_pages || 1
        // console.log(_this.ptListData)
      }
    })
  },
  showBdSelGroup(){
    this.showBdGroupList = true
  },
  //移动本地图片分组
  moveBdPicture(item){
    let _this = this,
        idsArr =[],
        ids = '';
    _this.bdListData.map((item)=>{
      if(item.active){
        idsArr.push(item.id)
      }
    })
    if(idsArr.length==0){
      _this.$message({
        type: 'warning',
        message: '请选择图片!'
      })
      return false
    }
    ids = idsArr.toString()
    
    _this.$http.post(_this.baseUrl + _this.url.attachmentLog.ChangeBdGroupByIds,{
      token:_this.$utils.getToken(),
      ids:ids,
      attachment_group_id:item.id
    }).then((res)=>{
      if(res.data.ret==200){

        _this.bdGroupData.map((itm,index)=>{
          if(itm.id==item.id){
            _this.bdGroupIdx = index
          }
        })
        _this.defaultGroupIndex = null
        _this.bdGroupId = item.id
        _this.getBdImageList()
        _this.showBdGroupList = false
        _this.$message({
          type: 'success',
          message: '移动成功!'
        })
      }
    })
  },
  getPtImageList(){
    let _this = this,
        startTime,
        endTime;
    if(_this.bdYear==-1){
      startTime = '',
      endTime = ''
    }else{
      startTime = _this.$utils.computeTime(_this.bdYear,_this.bdMonth)[0]
      endTime = _this.$utils.computeTime(_this.bdYear,_this.bdMonth)[1]
    }
    _this.$http.post(_this.cloudUrl + _this.url.attachmentLog.cloudGetList,{

    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        _this.ptListData = data.list
        _this.ptListData.map((item)=>{
          _this.$set(item,'active',false)
        })
        _this.bdTotalNums = Number(data.total_nums)
        _this.bdTotalPages = data.total_pages || 1
      }
    })
  },
  bdHandleSize(sizeVal){
    this.bdPageSize = sizeVal
    this.bdCurPage = 1
    this.getBdImageList()
  },
  bdHandleCurrent(currentVal){
    this.bdCurPage = currentVal
    this.getBdImageList()
  },
  //点击确定按钮
  checkPicture(){
    let _this = this
    //选择平台分组图片
    if(_this.tabsidx==0){

    }
    //选择本地分组图片
    if(_this.tabsidx==1){

    }
    //选择在线链接图片
    if(_this.tabsidx==2){
      _this.$emit('selPictureUrl',_this.srcPicture)
      _this.dialogPicture = false
      _this.srcPicture = ''
    }
  }
}