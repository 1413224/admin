<template>
  <div class=" bg-white rounded box-shadow-page py-2 px-1">
    <yTitle>更新日志</yTitle>
    <div class=" bg-gray rounded mt-2 p-1">
      <div class=" bg-white rounded p-2 content">
        <el-timeline>
          <el-timeline-item timestamp="2018-4-12" placement="top" color="#2589FFFF">
            <p class="item-tit">版本:V7.8.99.9.7 - 112.24MB</p>
            <div class=" mt-3">
              <p class="tit">新功能</p>
              <div class="new-desc mt-1">
                <p class="mt">1. 新增 小程序支持自动化测试</p>
                <p class="mt">2. 新增 预览当前页面</p>
                <p class="mt">3. 增加 云控制台中监控图表的数据总和显示</p>
              </div>
            </div>
            <div class=" mt-3">
              <p class="tit">修复功能</p>
              <div class="new-desc mt-1">
                <p class="mt">1. 新增 小程序支持自动化测试</p>
                <p class="mt">2. 新增 预览当前页面</p>
                <p class="mt">3. 增加 云控制台中监控图表的数据总和显示</p>
              </div>
            </div>
          </el-timeline-item>
          <el-timeline-item timestamp="2018-4-12" placement="top" color="#2589FFFF">
            <p>版本:V7.8.99.9.7 - 112.24MB</p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {

    }
  },
  created(){

  },
  methods:{

  }
}
</script>
<style lang="less" scoped>
.content{
  padding-left: 200px;
}
.item-tit{
  color: #333333FF;
  font-size: 14px;
}
.tit{
  color: #333333FF;
  font-size: 14px;
}
.new-desc{
  color: #999999FF;
  font-size: 12px;
}
.el-timeline-item__wrapper{
  position: relative;
}
</style>
<style lang="less">
.el-timeline-item__timestamp.is-top{
  position: absolute !important;
  left: -80px;
  color: #333333FF;
}
</style>