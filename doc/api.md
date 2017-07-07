### 账户管理
##### 查询账户list接口
* url: /api/hrbuser/accuser/list
* 方法: post
* 参数:
 * searchNameType(查询名称类型 1：账号，2：姓名，3：手机号)，
 * searchName(文本框输入)，
 * searchUserType（查询账户类型 1：管理员 2子账号 3：个人）,
 * searchTimeMax，
 * searchTimeMin(注册时间*大小范围)
* 返回结果 :data的数组对象属性verifyCount，taskCount，orderCount，accountTypeName（认证数，任务数，订单数，账户类型名称）

##### 查询账户明细
* url: /api/hrbuser/accuser/detailinfo
* 方法: post
* 参数: userid(账户主键id)，
* 返回结果 : jsonResult<String>


### 企业管理

##### 查询企业list接口
* url: /api/hrtbcompany/company/list
* 方法: post
* 参数:
  * searchNameType(查询名称类型 1：企业名称，2：姓名，3：手机号)，
  * searchName(文本框输入)，
  * searchVerifyType（ 0：待认证 1已认证 2：认证失败）,
  * searchTimeMax，
  * searchTimeMin(提交时间*大小范围)
* 返回结果 :
  * data的数组对象属性fullname，
  * userName，
  * userMobile，
  * propertyType（1,企业，2：个人），
  * verifyStatusName，
  * verifyTime（按照顺序对应原型的列属性）

##### 企业信息明细
* url: /api/hrtbcompany/company/detailinfo
* 方法: post
* 参数:companyid(账户主键id)，
* 返回结果 :
  * userName;//用户名称
  * userLinkEmail;//用户联系邮箱
  * userMobile;//用户手机号
  * userIdCard;//用户身份证号
  * postalcode;//邮编
  * routeAdd;//乘车路线
  * facsimileCode;//传真号
  * verifyFileUrl;//营业执照文件路径
  * renliResourceFileUrl;//人力资源文件路径
  * idCardFileUrl;//身份证文件路径
  * buinsessName;//业务名称
  * verifyStatusName;//认证状态名称


##### 企业认证通过
* url: /api/hrtbcompany/company/pass
* 方法: post
* 参数:companyid(账户主键id)，
* 返回结果 : jsonResult<String>


##### 企业认证不通过
* url: /api/hrtbcompany/company/notpass
* 方法: post
* 参数:companyid(账户主键id)，verifyMsg（不通过的原因）
* 返回结果 : jsonResult<String>





--------------

### 订单管理
##### 查询订单list接口
* url: /api/hrtborder/order/list
* 方法: post
* 参数:
  * searchOrderSn(订单编号)，
  * searchOrderType（订单类型：1,招聘订单，2 分包订单），
  * searchOrderStatus（订单状态：1，服务中 2，待评价 3已评价）
  * searchTimeMax，searchTimeMin(时间*大小范围)
* 返回结果 :data的数组对象属性orderSn，
  * type（1,招聘订单，2 分包订单），
  * orderStatusName，
  * update_date与原型图列对应


##### 订单信息明细
* url: /api/hrtborder/order/detailinfo
* 方法: post
* 参数:
  * orderid(主键id)，
* 返回结果 : jsonResult data 部分属性说明
  * missionName 任务名称 partyA 甲方企业信息（是对象属性，对应招工，供应商信息，属性信息参考企业管理的介绍），
  * partyB 乙企业信息（是对象属性，对应供应商，分包商信息，属性信息参考企业管理的介绍），
  * orderZgInfo （是对象属性，招工订单详情，multi_name 岗位名称，ageMax 最高年龄 ageMin最低年龄，number 数量，price 费用单价，warranty 保证期，cooperate_end 合作期限）
  * create_date 订单生成时间
    ```text
    订单类型：type（1，用工订单，其他分包订单）
    订单状态：orderStatusName
    订单编号：orderSn
    关联任务id:missionId
    关联任务名称：missionName

    甲方企业信息：
    企业名称：partyA.fullName
    联系人：partyA.userName
    电话：partyA.userMobile
    传真：partyA.facsimileCode
    地址：partyA.address

    乙方企业信息：
    企业名称：partyB.fullName
    联系人：partyB.userName
    电话：partyB.userMobile
    传真：partyB.facsimileCode
    地址：partyB.address  

    订单信息：（对象属性：orderZgInfo）
    岗位名称：orderZgInfo.multiName
    年龄：最小orderZgInfo.ageMin，最大orderZgInfo.ageMax
    学历："不限"
    数量： orderZgInfo.number
    费用：orderZgInfo.price
    保证期：orderZgInfo.warranty
    合作期限：orderZgInfo.cooperate_end

    订单生成时间：createDate
    ```


---------

### 任务管理
##### 查询任务list接口
* url: /api/hrtbmission/mission/list
* 方法: post
* 参数:
  * searchType（类型：11,招工任务，12 服务任务 13 分包任务），
  * searchStatus（任务状态：0已创建、1已开启、2已被接、3已关闭）,
  * searchTimeMax，searchTimeMin(时间*大小范围)
* 返回结果 :data的数组对象属性mis_name,
  * opsCompany.userName,
  * opsCompany.userMobile,
  * missTypeName,
  * statusName,
  * jobName,
  * number,
  * payment,
  * create_date与原型的列对应


##### 任务信息明细
* url: /api/hrtbmission/mission/detailinfo
* 方法: post
* 参数:missionid(主键id)，
* 返回结果 :  
  * opsCompany (对象属性企业相关信息，参考企业信息说明)
  * missTypeName;//类型名称前端显示
  * statusName; //状态名称 前端显示
  * jobLocation;//工作地点
  * jobDescription;//岗位描述
  * numberMin;//最低订单人数
  * degreeLimit;//学历要求描述
  * experienceDesc;//工作经验描述
  * ageDesc;//年龄限制描述
  * sexDesc;//性别描述
  * benefitsDesc;//福利描述

    ```text
    任务状态：statusName
    任务名称：misName
    服务类别：”委托招聘“
    任务类型：missTypeName

    用工方名称：opsCompany.fullName
    组织机构代码：opsCompany.organizeCode
    联系人：opsCompany.userName
    手机：opsCompany.userMobile
    邮箱：opsCompany.userLinkEmail
    传真：opsCompany.facsimileCode
    工作地点：jobLocation
    岗位名称：jobName
    学历：degreeLimit
    年龄：ageDesc
    工作经验：experienceDesc
    性别：sexDesc
    费用：payment
    数量：number
    最低订单数：numberMin
    任务期限：deadline
    联系地址：opsCompany.address
    用工方介绍：opsCompany.short_desc
    岗位描述：jobDescription
    福利：benefitsDesc
    备注：note
    发布时间：createDate
    ```


### 挂靠管理
##### 查询挂靠list接口
* url: /api/hrtbdepend/depend/list
* 方法: post
* 参数:
  * searchStatus（挂靠状态 0审核 1成功 2不成功）
* 返回结果 :data的数组对象属性*  
  * companyName,
  * companyUserName,
  * companyUserMobile,
  * companyUserLinkEmail,
  * be_company_name,
  * statusName,
  * create_date列表对应

##### 挂靠状态变更
* url: /api/hrtbdepend/company/depend
* 方法: post
* 参数:
  * dependid(主键id)，
  * status（目标状态 1成功 2不成功）
* 返回结果 : jsonResult<String>


-------

### 首页
##### 获取首页信息接口
* url: /api/hrtbhomepage/api/hrtbhomepage
* 方法: post
* 参数:无参
* 返回结果 :data的对象属性*
  * newUserCount; //新增用户数
  * newMissionCount; //新增任务数
  * newOrderCount; //新增订单数
  * needVerifyCount; //企业审核数
  * needFeedBackCount; //反馈数
  * needDependCount; //挂靠审核数
