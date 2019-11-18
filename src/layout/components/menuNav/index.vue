<template>
  <div>
    <div class="shared-sidebar">
      <nav class="shared-first-sidebar">
        <div class="shared-team-logo">
          <div class="team-logo" style="background-image: url(&quot;https://img.yzcdn.cn/public_files/2016/05/13/8f9c442de8666f82abaf7dd71574e997.png!60x60.jpg&quot;);">
          </div>
        </div>
        <ul class="shared-first-sidebar-nav" ref="firsrMenu">
          <li 
            v-for="(item,index) in menuList" 
            :key="index" 
            :class="{active:item.path==$route.path || $route.meta.parentsLabel == item.name}"
            @mouseenter="enter(item)"
            @click="toNavMenu(item,index,$event)">
            <!-- <svg-icon :className="item.icon" icon-class="clipboard" />  -->
            <i class="iconfont" :class="item.icon"></i>
            {{item.name}}
          </li>
        </ul>
      </nav>
    </div>
    <nav id="shared-second-sidebar" class="shared-second-sidebar" v-show="showSecondSideBar">
      <MenuList :menuList="subMenuData" :settings="menuSetting"></MenuList>
    </nav>
  </div>
</template>
<script>
import MenuList from './menuList'
import { mapState } from 'vuex'
export default {
  name:'menuNav',
  data() {
    return {
      showMenu:false,
      showSecondSideBar:false,
      idx:0,
      menuSetting: {
        // backgroundColor: '#333743',
        // textColor: '#909399',
        // activeTextColor: '#909399',
        defaultOpeneds: [],
        // uniqueOpened: true,
        // router: true,
        // collapseTransition: true
      },
      list:[
        {
          name:'概况',
          icon:'clipboard',
          children:[],
          path:'/dashboard/index'
        },
        {
          name:'店铺',
          icon:'dashboard',
          subtitle:'店铺管理tit',
          url:'',
          children:[
            {
              id:1,
              type:'item',
              lable:'首页2',
              index:'home',
              path:'/test1'
            },
            {
              id:2,
              type:'submenu',
              lable: '店铺',
              index: 'news',
              children:[
                {
                  id: 3,
                  type: 'item',
                  index: 'addNews',
                  lable: '店铺列表1',
                  path:'/test2',
                },
                {
                  id: 4,
                  type: 'item',
                  index: 'newsList',
                  lable: '店铺列表2',
                  path:'/test3',
                }
              ]
            },
            {
              id:8,
              type:'submenu',
              lable:'小程序店铺',
              index:'xcx',//控制展开
              children:[
                {
                  id:9,
                  type:'item',
                  index:'xcx',
                  lable:'店铺列表3',
                  path:'/dddd'
                }
              ]
            }
          ]
        },
        {
          name:'设置',
          icon:'clipboard',
          children:[
            {
              id:5,
              type:'submenu',
              index:'price',
              lable:'短信配置',
              children:[
                {
                  id:6,
                  type:'item',
                  index:'setInterface',
                  lable:'短信接口设置',
                  path:'/setUp/shortMessage/setInterface'
                }
              ]
            },
            {
              id:10,
              type:'submenu',
              index:'fenlei',
              lable:'分类',
              children:[
                {
                  id:11,
                  type:'item',
                  index:'tyfl',
                  lable:'通用分类',
                  path:'/setUp/classification/index'
                }
              ]
            }
          ]
        },
        {
          name:'后台工厂',
          icon:'clipboard',
          children:[
            {
              id:10,
              type:'item',
              index:'fenlei',
              lable:'分类',
              path:'/factory'
              // children:[
              //   {
              //     id:11,
              //     type:'item',
              //     index:'tyfl',
              //     lable:'通用分类',
              //     path:'/setUp/classification/index'
              //   }
              // ]
            },
            {
              id:11,
              type:'item',
              index:'moban',
              lable:'模板',
              path:'/commonlist'
            }
          ]
        }
      ],
      subMenuData:[
        
      ],
      subMenuDataMove:[]
    }
  },
  created(){
    let _this = this
    // console.log(this.$route)

    // console.log(_this.menuList.some(_this.filter))
    if(_this.menuList.some(_this.filter)){
      _this.showSecondSideBar = false
      _this.$emit('changeLeft',false)
    }else{
      _this.showSecondSideBar = true
      _this.$emit('changeLeft',true)
    }
    

    _this.filterMenuList.map((item)=>{
      item.children.map(submenuItem=>{//设置默认展开项
        _this.menuSetting.defaultOpeneds.push(String(submenuItem.menuId))
      })
      
      _this.subMenuData = item.children
      if(item.name == _this.$route.meta.parentsLabel){
        _this.subMenuData = item.children
        return false
      }
    })
  },
  mounted(){
    // console.log(this.$refs)
  },
  computed:{
    ...mapState({
      menuList:state => state.diymenu.menuList
    }),
    filterMenuList(){
      // return this.menuList.filter(item => item.children.length !== 0)
      let arr = []
      this.menuList.map((item)=>{
        if(item.children){
          arr.push(item)
        }
      })
      return arr
    }
  },
  methods:{
    filter(list){
      return list.path == this.$route.path
    },
    toNavMenu(item,index,e) {
      let _this = this

      if(item.children){
        _this.showSecondSideBar = true
        _this.$emit('changeLeft',true)
      }else{
        _this.showSecondSideBar = false
        _this.$emit('changeLeft',false)
      }

      //后续完善默认显示第一个路由
      if(!item.children){
        _this.subMenuData = []
        _this.$router.push({
          path:item.path
        })
        return
      }
      _this.getTheFirsrtRoute(item)
      
      _this.subMenuData = item.children

    },
    enter(item){//鼠标移入
      // console.log(item)  如果有选中样式，则不加载数据
      let _this = this
      if(item.children){
        // _this.openSubMenu(item)
        _this.subMenuDataMove = item.children
        _this.showMenu = true
      }else{
        _this.showMenu = false
      }
    },
    sout(){
      this.showMenu = false
    },
    openSubMenu(item){
      // console.log(item.children[0].children[0])
      let _this = this
      
      item.children.map((item)=>{
        _this.menuSetting.defaultOpeneds.push(String(item.menuId))
      })
    },
    getTheFirsrtRoute(item){
      let _this = this
      if(item.children[0].menuType=="menuPage"){
        _this.$router.push({
          path:item.children[0].path
        })
      }else{
        _this.$router.push({
          path:item.children[0].children[0].path
        })
      }
    }
  },
  components:{
    MenuList
  }
}
</script>
<style lang="less" scoped>
.shared-sidebar{
  width: 120px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 102;
  // border: 1px solid #f00;
  // background: #273543;
  background: #22242F;
}
.shared-first-sidebar{
  // background-color: #273543;
  background: #22242F;
}
.shared-team-logo{
  width: 120px;
  height: 80px;
  // padding-top: 20px;
  display: flex;
  align-items: center;
  .team-logo{
    margin:0 auto;
    width: 40px;
    height: 40px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background-size: cover;
    background-position: 50% 50%;
    background-color: #fff;
    // border: 1px solid #fff;
  }
}
.shared-first-sidebar-nav{
  margin-top: 10px;
  li{
    // width: 74px;
    font-size: 14px;
    height: 42px;
    line-height: 42px;
    color:#7F839D;
    padding-left: 18px;
    cursor: pointer;
    position: relative;
    i{
      position: relative;
      top: 1px;
      margin-right: 6px;
    }
    .xian{
      width: 4px;
      height: 20px;
      background: #2589FF;
      display: inline-block;
      border-radius: 4px;
      position: absolute;
      top: 11px;
      right: 5px;
    }
    &:hover{
      background: #434e6c;
    }
    &.active{
      // background: #38f;
      color: #2589FF;
    }
  }
}
// 二级导航
.shared-second-sidebar{
  width: 132px;
  height: 100%;
  margin-left: 120px;
  // background: #fff;
  background: #fafafa;
  // border-right: 1px solid #ebedf0;
  // z-index: 1;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  // overflow: hidden;
  overflow-y: auto;
  padding-top: 56px;
  z-index: 100;
  .second-sidebar-title{
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebedf0;
    font-size: 14px;
    color: #323233;
    font-weight: 500;
    line-height: 56px;
    text-align: center;
  }
}
//移动显示导航栏
.show-menu{
  width: 130px;
  // height: 100px;
  // border: 1px solid #f00;
  box-sizing: border-box;
  position: absolute;
  top: 56px;
  left: 120px;
  bottom: 0;
  z-index: 2;
  overflow-y: scroll;
}
//

</style>
<style lang="less">
.el-menu{
  border-right: none;
}
.el-submenu{
  position: relative;
  padding-bottom: 15px;
  &::after{
    width: 85px;
    height: 1px;
    content: "";
    position: absolute;
    left: 20px;
    top: 0;
    background: #E3E2E5FF;
    // border-bottom: 1px solid #E3E2E5FF !important;

  }
}
.el-submenu:first-child{
  &::after{
    background: transparent;
  }
}
.shared-second-sidebar /deep/ .el-submenu__title{
  font-size: 12px;
  color: #333333FF;
  font-weight: 600;
}
.shared-second-sidebar /deep/ .el-menu-item{
  font-size: 12px;
  // color: #535059FF;
}
</style>

