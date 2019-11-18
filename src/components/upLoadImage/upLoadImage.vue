<template>
  <div class="upload-wrap">
    <el-upload
      class="avatar-uploader"
      :action="baseUrl + url.File.AddImage"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="imgRequest">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  name:'upLoadImage',
  props:{
    value:[String]
  },
  data(){
    return {
      imageUrl:this.value
    }
  },
  created(){

  },
  methods:{
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
    },
    imgRequest(obj){
      let _this = this
      let fileObj = obj.file
      let form = new FormData()

      form.append("file", fileObj)
      form.append("token", _this.$utils.getToken())
      form.append("role_type", _this.url.role_type)

      _this.$http({
          method:'post',
          url:_this.baseUrl + _this.url.File.AddImage,
          data:form,
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }).then((res)=>{
        if(res.data.ret==200){
          let imgurl = res.data.data.list[0].url 
          _this.imageUrl = imgurl
        }
      })
    }
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
  },
  computed:{

  }
}
</script>
<style lang="less" scoped>

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
</style>
<style lang="less">
.upload-wrap{
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    background: #fff;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
}

</style>