import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import { resolve } from 'dns';

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path:'/login',
      name:'login',
      component:() => import('@/views/user/login')
    },
    {
      path:'/forgetPass',
      name:'forget',
      component:() => import('@/views/user/forgetPass'),
      meta:{
        title:'忘记密码'
      }
    },
    {
      path:'/',
      name:'layout',
      component: () => import('@/layout'),
      children:[
        {
          path: '/home',
          name: 'index',
          component: () => import('@/views/index')
        },
        {
          path:'/account/list',
          component: () => import('@/views/commonlist/commonlist'),
          meta:{
            parentsLabel:'账户管理'
          }
        },
        {
          path:'/account/positionList',
          component: () => import('@/views/test2'),
          meta:{
            parentsLabel:'店铺'
          }
        },
        {
          path:'/project',
          component: () => import('@/views/test3'),
          meta:{
            parentsLabel:'店铺'
          }
        },
        {
          path:'/issue',
          component: () => import('@/views/user/useredit'),
          meta:{
            title:'账户信息'
          }
        },
        {
          path:'/addressLibrary',
          component: () => import('@/views/addressLibrary/index'),
          meta:{
            title:'全球地址库'
          }
        },
        {
          path:'/setUp/shortMessage/setInterface',
          component: () => import('@/views/setUp/shortMessage/setInterface'),
          meta:{
            title:'短信接口设置',
            parentsLabel:'设置'
          }
        },
        {
          path:'/setUp/classification/index',
          component: () => import('@/views/setUp/classification/index'),
          meta:{
            parentsLabel:'设置',
            title:'通用分类'
          }
        },
        {
          path:'/factory',
          component:() => import('@/views/factory')
        },
        {
          path:'/commonlist',
          component:() => import('@/views/commonlist/commonlist'),
          // beforeEnter:(to, from, next)=>{
          //   console.log(777)
          //   next()
          // }
        },
        {
          path:'/account/Add',
          component:() => import('@/views/commonEdit/commonEdit')
        },
        {
          path:'/channel/agentList',
          component:() => import('@/views/channel/agentList'),
          meta:{
            title:'代理列表'
          }
        },
        {
          path:'/channel/addEditAgent',
          component:() => import('@/views/channel/addEditAgent'),
          meta:{
            title:'新增/编辑代理'
          }
        },
        {
          path:'/channel/agentDetail',
          component:() => import('@/views/channel/agentDetail'),
          meta:{
            title:'代理详情'
          }
        },
        {
          path:'/operate/agentExamine',
          component:() => import('@/views/operate/agentExamine'),
          meta:{
            title:'代理审核'
          }
        },


        //自定义路由
        {
          path:'/operate/basic/area',
          component:() => import('@/views/operate/basic/area/index'),
          meta:{
            title:'地址库',
            parentsLabel:'运营',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'地址库管理'}
            ]
          }
        },
        {
          path:'/operate/tool/systemRole',
          component:() => import('@/views/operate/tool/systemRole/index'),
          meta:{
            title:'角色管理',
            parentsLabel:'运营',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'角色管理'}
            ]
          }
        },
        {
          path:'/operate/tool/systemRole/roleList',
          component:() => import('@/views/operate/tool/systemRole/roleList'),
          meta:{
            title:'角色列表',
            parentsLabel:'运营',
            breadList:[
              { name:'首页',path:'/home' },
              // { name:'角色' }
            ]
          }
        },
        {
          path:'/operate/tool/systemRole/addRole',
          component:() => import('@/views/operate/tool/systemRole/addRole'),
          meta:{
            title:'新增角色',
            parentsLabel:'运营',
            breadList:[
              { name:'角色管理',path:'/operate/tool/systemRole/roleList' },
              { name:'新增角色' }
            ]
          }
        },
        {
          path:'/operate/tool/systemRole/roleDetail',
          component:() => import('@/views/operate/tool/systemRole/roleDetail'),
          meta:{
            title:'角色详情',
            parentsLabel:'运营',
            breadList:[
              { name:'角色管理',path:'/operate/tool/systemRole/roleList' },
              { name:'角色详情' }
            ]
          }
        },
        //权限管理
        {
          path:'/setting/perm/role',
          component:() => import('@/views/setting/perm/role/index'),
          meta:{
            title:'角色管理',
            parentsLabel:'设置',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'角色管理' }
            ]
          }
        },
        {
          path:'/setting/perm/role/addRole',
          component:() => import('@/views/setting/perm/role/addRole'),
          meta:{
            title:'新增角色',
            parentsLabel:'设置',
            breadList:[
              { name:'角色管理',path:'/setting/perm/role' },
              { name:'新增角色' }
            ]
          }
        },
        {
          path:'/setting/perm/role/roleDetail',
          component:() => import('@/views/setting/perm/role/roleDetail'),
          meta:{
            title:'角色详情',
            parentsLabel:'设置',
            breadList:[
              { name:'角色管理',path:'/setting/perm/role' },
              { name:'角色详情' }
            ]
          }
        },
        //操作员管理
        {
          path:'/setting/perm/account',
          component:() => import('@/views/setting/perm/account/index'),
          meta:{
            title:'操作员管理',
            parentsLabel:'设置',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'操作员管理' }
            ]
          }
        },
        {
          path:'/setting/perm/account/addEditAccount',
          component:() => import('@/views/setting/perm/account/addEditAccount'),
          meta:{
            title:'添加操作员',
            parentsLabel:'设置',
            breadList:[
              { name:'操作员管理',path:'/setting/perm/account' },
              { name:'新增/编辑操作员' }
            ]
          }
        },
        {
          path:'/setting/perm/account/accountDetail',
          component:() => import('@/views/setting/perm/account/accountDetail'),
          meta:{
            title:'操作员详情',
            parentsLabel:'设置',
            breadList:[
              { name:'操作员管理',path:'/setting/perm/account' },
              { name:'操作员详情' }
            ]
          }
        },
        {
          path:'/setting/perm/account/accountData',
          component:() => import('@/views/setting/perm/account/accountData'),
          meta:{
            title:'操作员资料',
            parentsLabel:'设置',
            breadList:[
              { name:'操作员管理',path:'/setting/perm/account' },
              { name:'资料' }
            ]
          }
        },
        //操作日志
        {
          path:'/setting/perm/log',
          component:() => import('@/views/setting/perm/log/index'),
          meta:{
            title:'操作日志',
            parentsLabel:'设置',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'操作日志' }
            ]
          }
        },
        //系统设置
        {
          path:'/setting/system/loginAuth',
          component:() => import('@/views/setting/system/loginAuth'),
          meta:{
            title:'登录授权',
            parentsLabel:'设置',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'登录授权' }
            ]
          }
        },
        {
          path:'/setting/system/email',
          component:() => import('@/views/setting/system/email'),
          meta:{
            title:'邮箱服务',
            parentsLabel:'设置',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'邮箱服务' }
            ]
          }
        },
        //基础数据
        {
          path:'/operate/basic/rule',
          component:() => import('@/views/operate/basic/rule/index'),
          meta:{
            title:'协议信息',
            parentsLabel:'运营',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'协议信息' }
            ]
          }
        },
        {
          path:'/operate/basic/rule/editRule',
          component:() => import('@/views/operate/basic/rule/editRule'),
          meta:{
            title:'修改协议',
            parentsLabel:'运营',
            breadList:[
              { name:'协议信息',path:'/operate/basic/rule' },
              { name:'修改' }
            ]
          }
        },
        {
          path:'/operate/basic/sensitive',
          component:() => import('@/views/operate/basic/sensitive/index'),
          meta:{
            title:'敏感词',
            parentsLabel:'运营',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'敏感词' }
            ]
          }
        },
        {
          path:'/operate/basic/bank',
          component:() => import('@/views/operate/basic/bank/index'),
          meta:{
            title:'合作银行',
            parentsLabel:'运营',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'合作银行' }
            ]
          }
        },
        {
          path:'/operate/basic/bank/addBank',
          component:() => import('@/views/operate/basic/bank/addBank'),
          meta:{
            title:'新增合作银行',
            parentsLabel:'运营',
            breadList:[
              { name:'合作银行',path:'/operate/basic/bank/addBank' },
              { name:'新增合作银行' }
            ]
          }
        },
        //账户信息
        {
          path:'/setting/account/info',
          component:() => import('@/views/setting/account/info/index'),
          meta:{
            title:'账户信息',
            parentsLabel:'设置',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'账户信息' }
            ]
          }
        },
        {
          path:'/setting/account/manage',
          component:() => import('@/views/setting/account/manage/index'),
          meta:{
            title:'账户管理',
            parentsLabel:'设置',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'账户管理' }
            ]
          }
        }

      ]
    },
    
  ]
})
