<template>
  <el-breadcrumb v-show="breadList.length!=0" class="breadcrumb" separator="/">
    <el-breadcrumb-item 
      v-for="(item,index) in breadList"
      :key="index">
      <router-link v-if="item.path" :to="item.path">{{item.name}}</router-link>
      <span v-if="!item.path">{{item.name}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name:'breadCrumb',
  props:{

  },
  data(){
    return {
      levelList:null
    }
  },
  methods:{
    getBreadcrumb(){
      let matched = this.$route.matched
      const first = matched[0]
      if(first && first.name !== '首页'){
         matched = [{path: '/', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    }
  },
  mounted(){
  },
  computed:{
    breadList(){
      return this.$route.meta.breadList || []
    }
  }
}
</script>
<style lang="less" scoped>
.breadcrumb{
  margin-bottom: 20px;
}
</style>