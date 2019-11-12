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
                @change="changeQQauth">
              </el-switch>
              <span class="edit pl-2" @click="showQQdialog()" v-if="QQauth">修改</span>
            </div>
          </div>
          <div class="line-wrap font-sm mt-2" v-if="QQauth">
            <div class="line-item d-flex pl-2">
              <div class="left">AppID</div>
              <div class="right" v-if="!qqInfo.app_id">在QQ互联网平台注册创建应用后可获取到AppID</div>
              <div class="right" v-else>{{qqInfo.app_id}}</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">AppSecret</div>
              <div class="right" v-if="!qqInfo.app_secret">在QQ互联网平台注册创建应用后可获取到AppID</div>
              <div class="right" v-else>{{qqInfo.app_secret}}</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">网站地址</div>
              <div class="right" v-if="!qqInfo.url">在QQ互联网平台注册创建应用后可获取到AppID</div>
              <div class="right" v-else>{{qqInfo.url}}</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">网站回调域</div>
              <div class="right" v-if="!qqInfo.back_url">在QQ互联网平台注册创建应用后可获取到AppID</div>
              <div class="right" v-else>{{qqInfo.back_url}}</div>
            </div>
          </div>
        </div>

        <div class="item mt-1 mb-2">
          <div class="head bg-gray p-1 d-flex rounded">
            <span class="xian"></span>
            <span class=" ml-1">微信配置</span>
          </div>
          <div class="tit-wrap d-flex a-center pt-2 j-sb">
            <div class="left pl-2">微信授权登录</div>
            <div class="right d-flex a-center">
              <el-switch
                v-model="WXauth"
                active-color="#13ce66"
                inactive-color="#DFDFDFFF"
                @change="changeWXauth">
              </el-switch>
              <span class="edit pl-2" @click="showWXdialog()" v-if="WXauth">修改</span>
            </div>
          </div>
          <div class="line-wrap font-sm mt-2" v-if="WXauth">
            <div class="line-item d-flex pl-2">
              <div class="left">AppID</div>
              <div class="right">{{wxInfo.app_id}}</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">AppSecret</div>
              <div class="right">{{wxInfo.app_secret}}</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">网站地址</div>
              <div class="right">{{wxInfo.url}}</div>
            </div>
            <div class="line-item d-flex pl-2">
              <div class="left">网站回调域</div>
              <div class="right">{{wxInfo.back_url}}</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <el-dialog
      title="修改QQ登录授权"
      :visible.sync="qqDialog"
      :before-close="closeDialogQQ"
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
                placeholder="请输入网站地址">
              </el-input>
          </el-form-item>
          <el-form-item label="网站回调域" prop="webyu">
              <el-input v-model="QQform.webyu" 
                size="small" class="form-input" 
                placeholder="请输入网站回调域">
              </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="calcelQQ('QQform')">取 消</el-button>
        <el-button type="primary" @click="submitQQ('QQform')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改微信登录授权"
      :visible.sync="wxDialog"
      :before-close="closeDialogWX"
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
          <el-form-item label="网站地址" prop="weburl">
              <el-input v-model="WXform.weburl" 
                size="small" class="form-input" 
                placeholder="请输入网站地址">
              </el-input>
          </el-form-item>
          <el-form-item label="网站回调域" prop="webyu">
              <el-input v-model="WXform.webyu" 
                size="small" class="form-input" 
                placeholder="请输入网站回调域">
              </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="calcelWX('WXform')">取 消</el-button>
        <el-button type="primary" @click="submitWX('WXform')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import actions from './actions/loginAuth'
export default {
  data(){
    return {
      QQauth:false,
      WXauth:false,
      qqDialog:false,
      wxDialog:false,
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
        weburl:'',
        webyu:''
      },
      WXrules:{
        AppID:[
          {required: true, message: '请输入AppID',trigger:'blur'}
        ],
        AppSecret:[
          {required: true, message: '请输入AppSecret',trigger:'blur'}
        ],
      },
      qqInfo:{
        name:'',
        app_id:'',
        app_secret:'',
        url:'',
        back_url:'',
        status:'',
        update_time:''
      },
      wxInfo:{
        name:'',
        app_id:'',
        app_secret:'',
        url:'',
        back_url:'',
        status:'',
        update_time:''
      },
    }
  },
  created(){
    this.getQQauth()
    this.getWXauth()
  },
  methods:{
    ...actions,
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