
let url = {
  role_type:0,
  user:{
    Login:'common/role/Account/Login',
    Logout:'common/role/Account/Logout',
    ForgetPassword:'common/role/Account/ForgetPassword',
    GetPublicCode:'common/role/verificationCode/GetPublicCode',//账户未登录时发送验证码接口
    GetLoginCode:'common/role/VerificationCode/GetLoginCode',//账户登录后发送验证码接口
    ChangePasswordByOld:'common/role/Account/ChangePasswordByOld',//后台端根据旧密码修改密码接口
    GetInfo:'common/role/Account/GetInfo',//后台端获取账户信息接口
    ChangeInfo:'common/role/Account/ChangeInfo',//后台端修改账户信息接口
    ChangeMobile:'common/role/Account/ChangeMobile',//后台端修改手机号接口
    ChangePasswordByCode:'common/role/Account/ChangePasswordByCode',//后台端根据验证码修改密码接口
    GetValidList:'common/Area/GetValidList',//获取地址列表信息接口
    GetMultilevelList:'common/Area/GetMultilevelList',//根据当前的area_ids获取多级地址列表信息接口，仅显示有效的
  },
  control:{
    AddAres:'control/setting/Area/Add',//总平台管理端新增地址信息接口
    ChangeStatusByIds:'control/setting/Area/ChangeStatusByIds',//总平台管理端批量修改地址可用状态接口
    DelAreaByIds:'control/setting/Area/DelByIds',//总平台管理端批量删除地址接口
    EditAreaById:'control/setting/Area/EditById',//总平台管理端修改地址信息接口
    GetAreaInfoById:'control/setting/Area/GetInfoById',//总平台管理端获取地址详情信息接口
    GetAreaList:'control/setting/Area/GetList',//总平台管理端获取地址列表信息接口[非总后台请勿调用该接口]
    UpdateAreaData:'control/setting/Area/UpdateAreaData',//总平台管理端更新区域数据
    UpdateDisplayOrderById:'control/setting/Area/UpdateDisplayOrderById',//总平台管理端修改地址排序接口
    SmsGetConfig:'control/setting/Sms/GetConfig',//总平台管理端获取短信接口设置信息接口
    SmsSaveConfig:'control/setting/Sms/SaveConfig',//总平台管理端修改短信接口设置信息接口
    GetCommonCategoryList:'control/setting/CommonCategory/GetList',//总平台管理端获取通用分类列表信息接口[非总后台请勿调用该接口]
    DelCommonCategoryByIds:'control/setting/CommonCategory/DelByIds',//总平台管理端批量删除通用分类接口
    AddCommonCategory:'control/setting/CommonCategory/Add',//总平台管理端新增通用分类信息接口
    EditCommonCategoryById:'control/setting/CommonCategory/EditById',//总平台管理端修改通用分类信息接口
    UpdateCommonCategoryDisplayOrderByIds:'control/setting/CommonCategory/UpdateDisplayOrderByIds',//总平台管理端统一修改所有通用分类排序接口
    
    GetDiyListPage:'control/temp/DiyPage/GetListPage',//control/temp/DiyPage/GetListPage
    GetDiyPageMenu:'control/temp/DiyPage/GetMenu',//获取后台菜单栏目信息
    GetNavbarList:'cloud/diyPage/Navbar/GetList',//获取指定角色类型对应的侧边栏目信息
  },
  File:{
    AddImage:'basic/upload/File/AddImage',//后台账户上传图片通用接口
    AddImageByUrl:'basic/upload/File/AddImageByUrl',//后台账户上传图片通用接口
  },
  Group:{
    GetList:'common/attachment/Group/GetList',//获取本地附件空间类型对应的分组列表
    Add:'common/attachment/Group/Add',//新增一个远程附件分组
    DelInfoById:'common/attachment/Group/DelInfoById',//根据附件分组ID删除远程附件分组信息
    ChangeInfoById:'common/attachment/Group/ChangeInfoById',//根据附件分组ID修改远程附件分组信息
    GetPtGroupList:'cloud/common/attachment/Group/GetList',//获取平台可用的附件空间类型对应的分组列表

  },
  attachmentLog:{
    GetList:'common/attachment/Log/GetList',//获取附件空间类型对应的配置列表
    cloudGetList:'cloud/common/attachment/Log/GetList',//获取平台附件空间类型对应的配置列表
    ChangeBdGroupByIds:'common/attachment/Log/ChangeGroupByIds',//批量修改本地图片所属分组
  
  },


  common:{
    GetRoleType:'cloud/common/Code/GetRoleType',//获取角色类型码接口
  },
  PermGroup:{//总后台角色组
    GetList:'main/operate/PermGroup/GetList',//获取通用角色组列表信息接口
    Statistics:'main/operate/PermGroup/Statistics',//角色组信息接口
    AddPermGroup:'main/operate/PermGroup/Add',//新增角色组信息接口
    ChangeStatusByIds:'main/operate/PermGroup/ChangeStatusByIds',//批量修改角色组可用状态接口
    DelByIds:'main/operate/PermGroup/DelByIds',//批量删除角色组信息接口
    GetInfoById:'main/operate/PermGroup/GetInfoById',//获取角色组详情信息接口
    EditById:'main/operate/PermGroup/EditById',//修改角色组信息接口
  },
  commonPermGroup:{//通用角色组
    GetList:'common/role/PermGroup/GetList',//获取通用角色组列表信息接口
    ChangeStatusByIds:'common/role/PermGroup/ChangeStatusByIds',//批量修改角色组可用状态接口
    Add:'common/role/PermGroup/Add',//新增角色组信息接口
    GetInfoById:'common/role/PermGroup/GetInfoById',//获取角色组详情信息接口
    DelByIds:'common/role/PermGroup/DelByIds',//批量删除角色组信息接口
    EditById:'common/role/PermGroup/EditById',//修改角色组信息接口
  },
  PermAccount:{//操作员
    GetAllGroupList:'common/role/PermAccount/GetAllGroupList',
    GetList:'common/role/PermAccount/GetList',//获取账户列表信息接口
    ChangeStatusById:'common/role/PermAccount/ChangeStatusById',//修改账号状态
    DeleteByIds:'common/role/PermAccount/DeleteByIds',//批量删除账号信息
    Add:'common/role/PermAccount/Add',//新增账户信息接口
    GetInfoById:'common/role/PermAccount/GetInfoById',//获取账户信息接口
    ChangeInfoById:'common/role/PermAccount/ChangeInfoById',//后台端修改账户信息接口
    GetAllInfoById:'common/role/PermAccount/GetAllInfoById',//获取操作员全部资料信息接口
    GetOperationLogList:'common/role/OperationLog/GetList',//获取日志列表信息接口
    
  },

  cloud:{
    Perm:{
      GetPermByRoleType:'cloud/role/Perm/GetPermByRoleType',//获取角色类型所有权限列表
    }
  }
}

export default url