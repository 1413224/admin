export default {
  getInfo(){
    let _this = this
    _this.$http.post(_this.baseUrl + _this.url.PermAccount.GetAllInfoById,{
      token:_this.$utils.getToken(),
      id:_this.$route.query.id
    }).then((res)=>{
      if(res.data.ret==200){
        _this.Info = res.data.data
        _this.setInfo(_this.Info)
      }
    })
  },
  setInfo(data){
    console.log(data)
    let _this = this
    _this.ruleForm.thumb = data.thumb
    _this.ruleForm.nickName = data.nickname
    _this.ruleForm.sex = Number(data.gender)
    _this.ruleForm.nativePlace = data.native_place
    _this.ruleForm.birthday = data.birthday
  },
  submitManage(){
    let _this = this
    // console.log(_this.$utils.formatDateDay(_this.ruleForm.birthday*1000) )
    // console.log(_this.ruleForm.birthday)
    // console.log(_this.$utils.formatTime(_this.ruleForm.birthday/1000,'Y/M/D h:m:s'))
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
          mode: 'dragMap',
          map: map,
      })

      positionPicker.on('success',function(positionResult){
        _this.ruleForm.address = positionResult.address
        // console.log(positionResult)
      })
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
        _this.ruleForm.address = markAddress
      })

    })
  }
}