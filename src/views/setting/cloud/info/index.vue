<template>
  <div class=" bg-white rounded box-shadow-page py-2 px-1">
    <yTitle>授权管理</yTitle>
    <div class=" bg-gray rounded mt-2 p-1">
      <div class=" bg-white rounded">
        <el-form
          :model="ruleForm" 
          :rules="rules" 
          ref="ruleForm" 
          label-width="150px">
          <el-form-item label="域名">
            
          </el-form-item>
        </el-form>
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

</style>