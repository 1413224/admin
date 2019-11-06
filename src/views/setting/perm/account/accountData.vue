<template>
  <div class="content bg-white box-shadow-page rounded p-1">
    <div class=" bg-gray p-1 rounded">
      <div class="cont bg-white py-2 rounded px-1">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px">
          <div class="item">
            <div class="item-head bg-gray p-1 rounded d-flex a-center mb-3">
              <span class="xian mr"></span>
              <span>基础信息</span>
            </div>
            <el-form-item label="头像" prop="thumb">
              <div class="thumb d-flex a-center j-center">+</div>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model="ruleForm.nickName" size="small" 
                style="width:233px;" placeholder="请输入昵称">
              </el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio :label="0">保密</el-radio>
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="籍贯" prop="nativePlace">
              <el-input v-model="ruleForm.nativePlace" size="small" 
                style="width:233px;" placeholder="请输入籍贯">
              </el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <!-- <dataPicker v-model="ruleForm.birthday" 
              :configs="dateConfig"
              style="width:233px;"></dataPicker> -->
              <el-date-picker
                v-model="ruleForm.birthday"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="生肖星座">
              <div class=" d-flex mt">
                <p class="items px-1 mr-1">天秤座</p>
                <p class="items px-1 mr-1">猴</p>
              </div>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="ruleForm.phone" size="small" 
                style="width:518px;" placeholder="请输入联系电话">
              </el-input>
            </el-form-item>

            <!-- 地址 -->
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="ruleForm.address" 
                style="width:518px;" size="small" 
                placeholder="请填写楼栋、门牌号"
                id="tipinput"></el-input>
              <span class=" font-sm ml-1" style="color:#999999FF">准确定位请移动地图上蓝点</span>
              <div id="container"></div>
            </el-form-item>
            <!-- 地址end -->

            <el-form-item label="所在行业" prop="industry">
              <ySelect v-model="ruleForm.industry"
                :options="industryOptions"></ySelect>
            </el-form-item>
            <el-form-item label="所属职位" prop="job">
              <ySelect
                v-model="ruleForm.job"
                :options="jobOptions"></ySelect>
            </el-form-item>
            <el-form-item label="年收入" prop="annual">
              <ySelect
                v-model="ruleForm.annual"
                :options="annualOptions"></ySelect>
            </el-form-item>
          </div>
          <div class="item pb-2 pt-2">
            <div class="item-head bg-gray p-1 rounded d-flex a-center mb-3">
              <span class="xian mr"></span>
              <span>社交信息</span>
            </div>
            <el-form-item label="绑定的微信">
              <p class="bir">WWW11950210</p>
            </el-form-item>
            <el-form-item label="绑定的QQ">
              <p class="bir">WWW11950210</p>
            </el-form-item>
            <el-form-item label="QQ号" prop="qqNum">
              <el-input v-model="ruleForm.qqNum" size="small" 
                style="width:518px;" placeholder="请输入QQ号">
              </el-input>
            </el-form-item>
            <el-form-item label="微信号" prop="wxNum">
              <el-input v-model="ruleForm.wxNum" size="small" 
                style="width:518px;" placeholder="请输入微信号">
              </el-input>
            </el-form-item>
            <el-form-item label="支付宝账户" prop="zfbNum">
              <el-input v-model="ruleForm.zfbNum" size="small" 
                style="width:518px;" placeholder="请输入支付宝账户">
              </el-input>
            </el-form-item>
            <el-form-item label="个人主页" prop="grPage">
              <el-input v-model="ruleForm.grPage" size="small" 
                style="width:518px;" placeholder="请输入个人主页">
              </el-input>
            </el-form-item>
          </div>
          <div class="item pb-2">
            <div class="item-head bg-gray p-1 rounded d-flex a-center mb-3">
              <span class="xian mr"></span>
              <span>认证信息</span>
            </div>
            <el-form-item label="邮箱">
              <p class="bir font-sm">WWW11950210</p>
            </el-form-item>
            <el-form-item label="真实姓名">
              <p class="bir font-sm">WWW11950210</p>
            </el-form-item>
            <el-form-item label="身份证号">
              <p class="bir font-sm">WWW11950210</p>
            </el-form-item>
            <el-form-item label="身份证图">
              <div class="d-flex">
                <div class="zheng">
                  <img class="img" src="http://pic25.nipic.com/20121116/9252150_144336550000_2.jpg" alt="">
                  <p class="text-center">正面</p>
                </div>
                <div class="fan ml-2">
                  <img class="img" src="http://pic25.nipic.com/20121116/9252150_144336550000_2.jpg" alt="">
                  <p class="text-center">反面</p>
                </div>
              </div>
            </el-form-item>
          </div>
          <div class="item pb-2">
            <div class="item-head bg-gray p-1 rounded d-flex a-center mb-3">
              <span class="xian mr"></span>
              <span>紧急联系人</span>
            </div>
            <el-form-item label="联系人类型" prop="lxrType">
              <ySelect
                v-model="ruleForm.lxrType"
                :options="lxrTypeOptions" placeholder="请选择联系人"></ySelect>
            </el-form-item>
            <el-form-item label="姓名" prop="lxrName">
              <el-input v-model="ruleForm.lxrName" size="small" 
                style="width:518px;" placeholder="请输入姓名">
              </el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="lxrPhone">
              <el-input v-model="ruleForm.lxrPhone" size="small" 
                style="width:518px;" placeholder="请输入手机号">
              </el-input>
            </el-form-item>
            <el-form-item label="备注" prop="lxrRemark">
              <el-input v-model="ruleForm.lxrRemark" size="small" 
                style="width:440px;" placeholder="请输入..." type="textarea"
                :rows="4" maxlength="200" show-word-limit>
              </el-input>
            </el-form-item>
          </div>
          <div class="item pb-2">
            <div class="item-head bg-gray p-1 rounded d-flex a-center mb-3">
              <span class="xian mr"></span>
              <span>其他信息</span>
            </div>
            <el-form-item label="婚姻状态">
              <el-radio-group v-model="ruleForm.hyType">
                <el-radio :label="0">保密</el-radio>
                <el-radio :label="1">已婚</el-radio>
                <el-radio :label="2">未婚</el-radio>
                <el-radio :label="3">离异</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="血型" prop="bloodType">
              <ySelect
                v-model="ruleForm.bloodType"
                :options="bloodTypeOptions" placeholder="请选择血型"></ySelect>
            </el-form-item>
            <el-form-item label="身高">
              <el-input placeholder="请填写身高" v-model="ruleForm.height"
                size="small" style="width:256px;">
                <template slot="append">cm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="体重">
              <el-input placeholder="请填写体重" v-model="ruleForm.weight"
                size="small" style="width:256px;">
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="学历" prop="education">
              <ySelect
                v-model="ruleForm.education"
                :options="educationOptions" placeholder="请选择"></ySelect>
            </el-form-item>
            <el-form-item label="兴趣爱好" prop="interest" class="interest">
              <el-checkbox-group v-model="ruleForm.interestList">
                <el-checkbox :label="1">爱好1</el-checkbox>
                <el-checkbox :label="2">爱好2</el-checkbox>
                <el-checkbox :label="3">爱好3</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="自我介绍" prop="introd">
              <el-input v-model="ruleForm.introd" size="small" 
                style="width:440px;" placeholder="请输入..." type="textarea"
                :rows="4" maxlength="200" show-word-limit>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <el-button @click="goBackList()" size="small">取消</el-button>
      <el-button @click="submitManage('ruleForm')" size="small" type="primary">保存</el-button>
    </div>
  </div>
</template>
<script>
import dataPicker from '@/components/datePicker/datePicker'
import ySelect from '@/components/ySelect/index'
import AMap from 'AMap'

export default {
  data(){
    return {
      ruleForm:{
        nickName:'',
        sex:0,
        nativePlace:'',
        birthday:'',
        phone:'',
        industry:'',
        job:'',
        annual:'',
        qqNum:'',
        wxNum:'',
        zfbNum:'',
        grPage:'',
        lxrType:'',
        lxrName:'',
        lxrPhone:'',
        lxrRemark:'',
        hyType:0,
        bloodType:'',
        height:'',
        weight:'',
        education:'',
        interestList:'',
        introd:'',
        address:'',

      },
      rules:{},
      dateConfig:{
        showType:'date',
        placeholder:'请选择'
      },
      industryOptions:[
        { label:'全部',value:'-1' },
      ],
      jobOptions:[
        { label:'全部',value:'-1' },
      ],
      annualOptions:[
        { label:'全部',value:'-1' },
      ],
      lxrTypeOptions:[
        { label:'全部',value:'-1' },
      ],
      bloodTypeOptions:[
        { label:'全部',value:'-1' },
      ],
        educationOptions:[
        { label:'全部',value:'-1' },
      ]
    }
  },
  created(){

  },
  mounted(){
    this.initMap()

  },
  methods:{
    goBackList(){
      this.$router.go(-1)
    },
    // initMap(){
    //   let _this = this
    //   let AMapUI = window.AMapUI
    //   AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
    //     var map = new AMap.Map('container',{
    //         zoom:16
    //     })
    //     var positionPicker = new PositionPicker({
    //         mode:'dragMarker',//设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
    //         map:map,//依赖地图对象
    //         iconStyle:{//自定义外观
    //           url:'//webapi.amap.com/ui/1.0/assets/position-picker2.png',//图片地址
    //           size:[48,48],  //要显示的点大小，将缩放图片
    //           ancher:[24,40],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
    //         }
    //     })
    //     positionPicker.on('success',function(positionResult){
    //       _this.ruleForm.address = positionResult.address
    //       // console.log(999)
    //     })
    //     positionPicker.on('fail', function(failResult){
    //       console.log(failResult)
    //     })
    //     positionPicker.start()

    //     //插件加载  
    //     AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch','AMap.ToolBar'],function(){
    //       map.addControl(new AMap.Autocomplete())
    //       map.addControl(new AMap.PlaceSearch())
    //       map.addControl(new AMap.ToolBar())
    //     })

    //     //输入提示
    //     var autoOptions = {
    //       input: "tipinput"
    //     }
    //     var auto = new AMap.Autocomplete(autoOptions)
    //     var placeSearch = new AMap.PlaceSearch({//构造地点查询类
    //       map: map
    //     })
    //     //注册监听，当选中某条记录时会触发
    //     AMap.event.addListener(auto,"select",(e)=>{
    //       placeSearch.setCity(e.poi.adcode)
    //       placeSearch.search(e.poi.name,_this.ruleForm.address)
    //     })

    //   })
    // },
    
    initMap(){
      let _this = this
      // AMapUI.setDomLibrary($)
      //加载UI
      AMapUI.loadUI(['misc/PositionPicker','misc/PoiPicker'],function(PositionPicker,PoiPicker){
        //地图加载
        var map = new AMap.Map("container", {
          resizeEnable: true,
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
    
  },
  components:{
    dataPicker,
    ySelect
  }
}
</script>
<style lang="less" scoped>
@import url('./actions/accountData.less');
.bottom{
  position: fixed;
  bottom: 0;
  left: 263px;
  width: calc(100% - 274px);
  padding: 10px 0;
  text-align: center;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px 5px 0 0;
  .el-button--small{
    padding: 8px 30px;
  }
}
#container {
  width:780px; 
  height: 450px; 
  margin-top: 30px;
}  
</style>
<style lang="less" scoped>
.interest{
  width: 600px;
}
.interest /deep/ .el-checkbox__input{
  display: none
}
.interest /deep/ .el-checkbox{
  margin-top: 4px;
  height: 31px;
  border: 1px solid #E3E2E5FF;
  // background: #fff;
  // padding: 5px 20px;
  border-radius: 17px;
  font-size: 12px;
  overflow: hidden;
}
.interest /deep/ .el-checkbox__label{
  line-height: 23px;
}
.interest /deep/ .el-checkbox__label{
  height: 29px;
  padding: 5px 20px;
  border-radius: 17px;
  font-size: 12px;
  overflow: hidden;
}
.interest /deep/ .el-checkbox.is-checked{
  
  border: 1px solid #A3D0FDFF;
  // padding: 5px 20px;
  background: #ECF5FFFF;
  border-radius: 17px;
  // overflow: hidden;
}
.interest /deep/ .el-checkbox+.el-checkbox{
  margin-left: 0;
}
</style>