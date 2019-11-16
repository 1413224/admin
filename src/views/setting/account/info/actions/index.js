export default {
  getInfo(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.user.GetInfo,{
      token:_this.$utils.getToken(),
      role_type:_this.url.role_type
    }).then((res)=>{
      if(res.data.ret==200){
        _this.Info = res.data.data
        _this.setInfo(_this.Info)
      }
    })
  },
  goBindPage(){
    this.$router.push({
      path:'/setting/account/manage'
    })
  },
  industryChange(value){
    console.log(value)
  },
  jobChange(value){
    console.log(value)
  },
  setInfo(data){
    console.log(data)
    let _this = this
    _this.ruleForm.thumb = data.thumb
    _this.ruleForm.nickName = data.nickname
    _this.ruleForm.sex = Number(data.gender)
    _this.ruleForm.nativePlace = data.native_place
    _this.ruleForm.birthday = data.birthday*1000  
    _this.ruleForm.phone = data.mobile

    _this.ruleForm.address = data.address
    _this.ruleForm.lng = data.lng
    _this.ruleForm.lat = data.lat

    _this.ruleForm.industry = data.industry_id

    _this.ruleForm.annual = data.annual_income ? data.annual_income : ''

    _this.ruleForm.qqNum = data.qq
    _this.ruleForm.wxNum = data.wechat
    _this.ruleForm.zfbNum = data.alipay
    _this.ruleForm.grPage = data.website
    _this.ruleForm.grPage = data.website
    // 紧急联系人
    _this.ruleForm.lxrType = data.emergency_info.emergency_type.toString()
    _this.ruleForm.lxrName = data.emergency_info.emergency
    _this.ruleForm.lxrPhone = data.emergency_info.egmobile
    _this.ruleForm.lxrRemark = data.emergency_info.emergency_remark
    //其他信息
    _this.ruleForm.hyType = Number(data.other_info.marital_status)
    _this.ruleForm.bloodType = data.other_info.blood_type.toString()
    _this.ruleForm.height = data.other_info.stature
    _this.ruleForm.weight = data.other_info.weight
    _this.ruleForm.education = data.other_info.education.toString()
    _this.ruleForm.introd = data.other_info.introduction

  },
  submitManage(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.user.ChangeInfo,{
      role_type:_this.url.role_type,
      // id:_this.$route.query.id,
      token:_this.$utils.getToken(),
      nickname:_this.ruleForm.nickName,
      thumb:_this.ruleForm.thumb,
      gender:_this.ruleForm.sex,
      native_place:_this.ruleForm.nativePlace,
      birthday:_this.ruleForm.birthday/1000,
      tel:_this.ruleForm.phone,
      province_id:'',//待对接
      city_id:'',//待对接
      dist_id:'',//待对接
      address:_this.ruleForm.address,
      lng:_this.ruleForm.lng,
      lat:_this.ruleForm.lat,
      industry_id:_this.ruleForm.industry.toString(),
      position_id:_this.ruleForm.job.toString(),
      annual_income:'',//待对接
      email:'',//..
      qq:_this.ruleForm.qqNum,
      wechat:_this.ruleForm.wxNum,
      alipay:_this.ruleForm.zfbNum,
      website:_this.ruleForm.grPage,
      emergency_type:_this.ruleForm.lxrType,
      emergency:_this.ruleForm.lxrName,
      egmobile:_this.ruleForm.lxrPhone,
      emergency_remark:_this.ruleForm.lxrRemark,
      marital_status:_this.ruleForm.hyType,
      blood_type:_this.ruleForm.bloodType,
      stature:_this.ruleForm.height,
      weight:_this.ruleForm.weight,
      education:_this.ruleForm.education,
      interest:_this.ruleForm.interestList.toString(),
      introduction:_this.ruleForm.introd,
      annual_income:_this.ruleForm.annual
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message: '修改成功!'
        })
        _this.$router.push({
          path:'/setting/perm/account'
        })
      }
    })
  },
  getIndustryOptions(){
    let _this = this
    return new Promise((resolve,reject)=>{
      _this.$http.post(_this.baseUrl+_this.url.PermAccount.GetCategoryAllList,{
        token:_this.$utils.getToken(),
        type:1,
        status:1
      }).then((res)=>{
        if(res.data.ret == 200){
          // _this.industryOptions
          let data = res.data.data
          let newData = _this.setIndustryOptions(data.list)
          _this.industryOptions = newData
        }
      })
    })
  },
  getJobOptions(){
    let _this = this
    return new Promise((resolve,reject)=>{
      _this.$http.post(_this.baseUrl+_this.url.PermAccount.GetCategoryAllList,{
        token:_this.$utils.getToken(),
        type:2,
        status:1
      }).then((res)=>{
        if(res.data.ret == 200){
          let data = res.data.data
          let newData = _this.setIndustryOptions(data.list)
          _this.jobOptions = newData
        }
      })
    })
  },
  setIndustryOptions(list){
    // console.log(list)
    let _this = this
    let arr = []
    for(let i=0;i<list.length;i++){
      let newArr = {
        value:Number(list[i].id),
        label:list[i].name,
        // leaf:list[i].is_leaf,
      }
      if(list[i].children.length!=0){
        newArr.children = _this.setIndustryOptions(list[i].children)
      }
      arr.push(newArr)
    }
    return arr
  },
  GetAllInterestList(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.PermAccount.GetAllInterestList,{
      token:_this.$utils.getToken()
    }).then((res)=>{
      if(res.data.ret==200){
        let data = res.data.data
        // console.log(data)
        _this.intList = data.list
        // let arr = []
        // data.list.map((item,index)=>{
        //   _this.intList.push({

        //   })
        // })
      }
    })
  },
  getAreaText(value){
    // console.log(value)
    let _this = this
    let textArr = value.split('/')
    let textString = textArr.join('')
    // console.log(textString)
    _this.ruleForm.address = textString
  },
  initMap(){
    let _this = this
    //加载UI
    AMapUI.loadUI(['misc/PositionPicker','misc/PoiPicker'],function(PositionPicker,PoiPicker){
      //地图加载
      var map = new AMap.Map("container", {
        // resizeEnable: true,
        zoom:16,
      })
      //创建标注点
      var marker = new AMap.Marker({
        draggable:true //点标记可拖拽
      })
      var poiPicker = new PoiPicker({
        input: 'tipinput' //输入框id
      })
      var positionPicker = new PositionPicker({
          mode: 'dragMarker',
          map: map,
      })

      positionPicker.on('success',function(positionResult){
        _this.ruleForm.address = positionResult.address
        // console.log(positionResult)
        _this.ruleForm.lng = positionResult.position.lng
        _this.ruleForm.lat = positionResult.position.lat
      })
      if(_this.ruleForm.lat && _this.ruleForm.lng){
        map.panTo([_this.ruleForm.lng,_this.ruleForm.lat])
      }
      positionPicker.on('fail', function(failResult){
        console.log(failResult)
      })

      positionPicker.start()

      // 监听poi选中信息
      poiPicker.on('poiPicked', function(poiResult) {
        //用户选中的poi点信息
        // console.log(poiResult)
        let poi = poiResult.item
        let markAddress = poiResult.item.district + poiResult.item.address
        //添加标注点
        marker.setMap(map)
        //设置marker定位
        marker.setPosition(poi.location)
        map.panTo(poi.location)
        _this.ruleForm.lng = poi.location.lng
        _this.ruleForm.lat = poi.location.lat
        _this.ruleForm.address = markAddress
      })

      // poiPicker.onCityReady(function(){
      //   poiPicker.suggest('美食')
      // })

    })
  }
}