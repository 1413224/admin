<template>
  <div>
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      :align="align"
      value-format="timestamp"
      size="small">
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name:'linkageDatePicker',
  props:{
    value:Array,
    optionsBtn:Boolean
  },
  data(){
    return {
      date:this.value,
      align:"",
      pickerOptions:{},
      shortcuts:[
        {
          text:'最近一周',
          onClick(picker){
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近一个月',
          onClick(picker){
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        },
        {
          text: '最近三个月',
          onClick(picker){
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }
      ]
    }
  },
  created(){
    if(this.optionsBtn){
      this.pickerOptions.shortcuts = this.shortcuts
      this.align = 'right'
    }
  },
  watch:{
    value(val){
      this.date = val
    },
    date(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-range-editor--small.el-input__inner{
  width: 100%;
}
</style>
