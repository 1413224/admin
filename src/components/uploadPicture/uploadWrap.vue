<template>
  <div>
    <div class="upload-wrap" @click="showSelPicture()">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <uploadPicture v-model="dialogPicture" 
      @selPictureUrl="selPictureUrl"
      :nums="nums"></uploadPicture>
  </div>
</template>
<script>
import uploadPicture from '@/components/uploadPicture/uploadPicture'
export default {
  name:'upLoadWrap',
  props:{
    value:[String],
    nums:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      imageUrl:this.value,
      dialogPicture:true
    }
  },
  methods:{
    showSelPicture(){
      this.dialogPicture = true
    },
    selPictureUrl(val){
      console.log('selPictureUrl'+ val)
    }
  },
  components:{
    uploadPicture
  },
  watch:{
    value(val){
      this.imageUrl = val
    },
    imageUrl(val,oldVal){
      if(val!=oldVal){
        this.$emit('input',val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.upload-wrap{
  width: 120px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  background: #fff;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  &:hover{
    cursor: pointer;
    border: 1px dashed #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}
</style>