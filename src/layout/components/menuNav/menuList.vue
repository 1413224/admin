<template>
  <div>
    <el-menu
      :background-color="settings.backgroundColor"
      :defaultOpeneds="settings.defaultOpeneds"
      :default-active="activeMenu">
      <template v-for="menuItem in menuList">
        <template v-if="menuItem.menuType === 'menuPage'">
          <menu-item :menu="menuItem" :key="menuItem.menuId"></menu-item>
        </template>

        <template v-if="menuItem.menuType === 'menuLabel'">
          <sub-menu :menu="menuItem" :key="menuItem.menuId"></sub-menu>
        </template>

        <template v-if="menuItem.menuType === 'group'">
          <menu-group :menu="menuItem" :key="menuItem.menuId"></menu-group>
        </template>

      </template>
    </el-menu>
  </div>
</template>
<script>
import menuItem from './menuItem'
import menuGroup from './menuGroup'
import subMenu from './subMenu'
export default {
  name:"menuList",
  props:{
    menuList:{
      type:Array,
    },
    settings:{
      type:Object
    }
  },
  components:{
    menuItem,
    menuGroup,
    subMenu
  },
  created(){
    // console.log(this.$route)
    // console.log(this.menuList)
  },
  computed:{
    activeMenu() {
      // console.log(this.$route)
      let  route = this.$route
      let { path } = route
      return path
      // return '/' + this.$route.path.split('/').reverse()[0]
    }
  },
  data(){
    return {

    }
  }
}
</script>

