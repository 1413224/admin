<template>
  <div class="content bg-white box-shadow-page rounded py-2 px-1">
    <yTitle>登录授权</yTitle>
    <div class=" bg-gray rounded p-1 mt-2">
      <div class=" bg-white p-1 rounded">
        <div class="item mt-1 mb-4">
          <div class="head bg-gray p-1 d-flex rounded">
            <span class="xian"></span>
            <span class=" ml-1">QQ配置</span>
          </div>
          <div class="tit-wrap d-flex a-center pt-2 j-sb">
            <div class="left pl-2">QQ授权登录</div>
            <div class="right d-flex a-center">
              <el-switch
                v-model="QQauth"
                active-color="#13ce66"
                inactive-color="#DFDFDFFF"
                @change="">
              </el-switch>
              <span class="edit pl-2" @click="showQQdialog()">修改</span>
            </div>
          </div>
          <div class="line-wrap font-sm mt-2">
            <div class="line-item d-flex pl-2">
              <div class="left">AppID</div>
              <div class="right">在QQ互联网平台注册创建应用后可获取到AppID</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">AppSecret</div>
              <div class="right">在QQ互联网平台注册创建应用后可获取到AppID</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">网站地址</div>
              <div class="right">在QQ互联网平台注册创建应用后可获取到AppID</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">网站回调域</div>
              <div class="right">在QQ互联网平台注册创建应用后可获取到AppID</div>
            </div>
          </div>
        </div>

        <div class="item mt-1 mb-2">
          <div class="head bg-gray p-1 d-flex rounded">
            <span class="xian"></span>
            <span class=" ml-1">微信配置</span>
          </div>
          <div class="tit-wrap d-flex a-center pt-2 j-sb">
            <div class="left pl-2">QQ授权登录</div>
            <div class="right d-flex a-center">
              <el-switch
                v-model="QQauth"
                active-color="#13ce66"
                inactive-color="#DFDFDFFF">
              </el-switch>
              <span class="edit pl-2">修改</span>
            </div>
          </div>
          <div class="line-wrap font-sm mt-2">
            <div class="line-item d-flex pl-2">
              <div class="left">AppID</div>
              <div class="right">在QQ互联网平台注册创建应用后可获取到AppID</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">AppSecret</div>
              <div class="right">在QQ互联网平台注册创建应用后可获取到AppID</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">网站地址</div>
              <div class="right">在QQ互联网平台注册创建应用后可获取到AppID</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">网站回调域</div>
              <div class="right">在QQ互联网平台注册创建应用后可获取到AppID</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <el-dialog
      title="修改QQ登录授权"
      :visible.sync="qqDialog"
      width="640px">
      <div>
        <el-form
          :model="QQform" 
          :rules="QQrules"
          ref="QQform" 
          label-width="120px">
          <el-form-item label="AppID" prop="AppID">
              <el-input v-model="QQform.AppID" 
                size="small" class="form-input" 
                placeholder="在QQ互联网平台注册创建应用后可获取到AppID">
              </el-input>
          </el-form-item>
          <el-form-item label="AppSecret" prop="AppSecret">
              <el-input v-model="QQform.AppSecret" 
                size="small" class="form-input" 
                placeholder="在QQ互联平台注册创建应用后可获取到AppSecret">
              </el-input>
          </el-form-item>
          <el-form-item label="网站地址" prop="weburl">
              <el-input v-model="QQform.weburl" 
                size="small" class="form-input" 
                placeholder="http://wx.tianranzhu777.com">
              </el-input>
          </el-form-item>
          <el-form-item label="网站回调域" prop="webyu">
              <el-input v-model="QQform.webyu" 
                size="small" class="form-input" 
                placeholder="http://wx.tianranzhu777.com">
              </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改微信登录授权"
      :visible.sync="wxDialog"
      width="640px">
      <div>
        <el-form
          :model="WXform" 
          :rules="WXrules"
          ref="WXform" 
          label-width="120px">
          <el-form-item label="AppID" prop="AppID">
              <el-input v-model="WXform.AppID" 
                size="small" class="form-input" 
                placeholder="在微信开放平台注册创建应用后可获取到AppID">
              </el-input>
          </el-form-item>
          <el-form-item label="AppSecret" prop="AppSecret">
              <el-input v-model="WXform.AppSecret" 
                size="small" class="form-input" 
                placeholder="在微信开放平台注册创建应用后可获取到AppSecret">
              </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data(){
    return {
      QQauth:false,
      qqDialog:false,
      wxDialog:true,
      QQform:{
        AppID:'',
        AppSecret:'',
        weburl:'',
        webyu:''
      },
      QQrules:{
        AppID:[
          {required: true, message: '请输入AppID',trigger:'blur'}
        ],
        AppSecret:[
          {required: true, message: '请输入AppSecret',trigger:'blur'}
        ],
        weburl:[
          {required: true, message: '请输入网站地址',trigger:'blur'}
        ],
        webyu:[
          {required: true, message: '请输入网回调域',trigger:'blur'}
        ]
      },
      WXform:{
        AppID:'',
        AppSecret:'',
      },
      WXrules:{
        AppID:[
          {required: true, message: '请输入AppID',trigger:'blur'}
        ],
        AppSecret:[
          {required: true, message: '请输入AppSecret',trigger:'blur'}
        ],
      }
    }
  },
  created(){

  },
  methods:{
    showQQdialog(){
      let _this = this
      _this.qqDialog = true
    }
  },
  components:{

  }
}
</script>
<style lang="less" scoped>
.item{
  .head{
    font-size: 14px;
    color: #333333FF;
    font-weight: normal;
    .xian{
      width: 4px;
      height: 14px;
      border-radius: 4px;
      background: #2589FFFF;
      display: inline-block;
    }
  }
  .tit-wrap{
    .left{
      color: #333333FF;
      font-weight: 500;
      font-size: 14px;
    }
    .right{
      padding-right: 58px;
      .edit{
        color: #2589FFFF;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
  .line-wrap{
    border: 1px solid #eee;
    .line-item{
      height: 48px;
      line-height: 48px;
      .left{
        width: 150px;
      }
      &:nth-child(n){
        background: #F2F2F6FF;
      }
      &:nth-child(2n){
        background: #fff;
      }
    }
  }
}
</style>