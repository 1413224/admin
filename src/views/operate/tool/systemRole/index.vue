<template>
  <div>
    <div class="head clearfix pt-2 pb-2 pl-1 pr-2">
      <div class="left fl d-flex a-center">
        <img src="../../../../assets/logo.png" class="logo" alt="">
        <p class="tit ml-1">官方角色组</p>
      </div>
      <div class="right fr d-flex">
        <div class="item mr-1 d-flex flex-column a-center">
          <p class="tit">角色数</p>
          <p class="num mt-1">{{nums}}</p>
        </div>
        <!-- <div class="xian"></div>
        <div class="item ml-1 d-flex flex-column a-center">
          <p class="tit">通用页面总数</p>
          <p class="num mt-1">33</p>
        </div> -->
      </div>
    </div>

    <div class="list-wrap mt-1 clearfix">
      <div class="item rounded mr-2 mb-2 fl"
        v-for="(item,index) in list" :key="index"
        @click="goList(item.role_type)">
        <div class="list-tit px-2 pb-2">
          <p class="tit pt-2">{{item.name}}</p>
          <p class="desc mt-1 ellipsis2">{{item.desc}}</p>
        </div>
        <div class="list-bottom d-flex px-2 j-sb a-center">
          <!-- <el-button v-if="item.navbar == null" type="primary" plain size="mini" @click="goAddMenu(item.role_type)">立即设置</el-button> -->
          <p class="navbar" >官方角色数</p>
          <div class="nums">
            <span class="num">{{item.perm_group_nums}}</span>
            <!-- <span class="text">页</span> -->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data(){
    return {
      nums:'',
      list:[]

    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.PermGroup.Statistics,{
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.nums = data.total
          _this.list = data.list
        }
      })
    },
    goList(roleType){
      this.$router.push({
        path:'/operate/tool/systemRole/roleList',
        query:{
          roleType:roleType
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.head{
  width: calc(100% - 28px);
  box-shadow:0px 0px 3px 0px rgba(34,36,47,0.1);
  background: #fff;
  margin-top: -10px;
  // margin-left: -15px;
  border-radius: 0 0 10px 10px;
  .left{
    .logo{
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .tit{
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
  }
  .right{
    .xian{
      width: 1px;
      height: 30px;
      margin-top: 3px;
      background: #E3E2E5;
    }
    .item{
      .tit{
        color: #999;
        font-size: 12px;
      }
      .num{
        font-weight: bold;
      }
    }
  }
}
.list-wrap{
  width: 95%;
  // border:1px solid #333;
  margin: 10px auto 0;
  .item{
    width: 310px;
    border: 1px solid #E8E8E8;
    overflow: hidden;
    &:hover{
      border: 1px solid #2589FF;
      cursor: pointer;
    }
    &:nth-child(2n){
      .list-tit{
        background:url('../../../../assets/list-tit.png') 100% 100% no-repeat;
        color: #fff;
      }
      .desc{
        color: #fff;
      }
    }
    .list-tit{
      font-size: 14px;
      font-weight: bold;
      color: #333;
      background: #E3F0FC;
      height: 80px;
    }
    .desc{
      font-size: 12px;
      color: #999;
      line-height: 16px;
    }
    .list-bottom{
      padding: 15px 20px;
      .navbar{
        color: #666;
        font-size: 12px;
      }
      .nums{
        color: #333;
        .num{
          font-size: 16px;
          color: #FF6A00;
          font-weight: bold;
        }
        .text{
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style lang="less">
.list-bottom{
  .el-button--primary.is-plain{
    border-radius: 20px;
    background: transparent;
    color: #2589FF;
  }
  .el-button--mini{
    padding: 4px 15px;
  }
}

</style>