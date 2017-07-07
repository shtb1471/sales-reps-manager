/* global  moment:false */
(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .constant('version', "0.0.1")
        .constant('moment', moment)
        .constant('paginationNum', 20)
        .constant('commDict', {
            userType: [{
                id: 1,
                name: "账号"
            }, {
                id: 2,
                name: "姓名"
            }, {
                id: 3,
                name: "手机号"
            }],
            companyQKey: [{
                id: 1,
                name: "企业名称"
            }, {
                id: 2,
                name: "姓名"
            }, {
                id: 3,
                name: "手机号"
            }],
            verifyStatus: [{
                id: 9999,
                name: "全部"
            }, {
                id: 0,
                name: "未上传"
            }, {
                id: 1,
                name: "已认证"
            }, {
                id: 2,
                name: "认证中"
            }, {
                id: 3,
                name: "认证失败"
            }],
            accountType: [{
                id: 9999,
                name: "全部"
            }, {
                id: 1,
                name: "个人用户"
            }, {
                id: 2,
                name: "企业管理员"
            }, {
                id: 3,
                name: "企业子账号"
            }],
            orderType: [{
                id: 9999,
                name: "全部"
            }, {
                id: 1,
                name: "招聘订单"
            }, {
                id: 2,
                name: "分包订单"
            }],
            orderStatus: [{
                id: 9999,
                name: "全部"
            }, {
                id: 1,
                name: "订单进行中"
            }, {
                id: 2,
                name: "已完成"
            }, {
                id: 3,
                name: "已评价"
            }],
            taskType: [{
                id: 9999,
                name: "全部"
            }, {
                id: 11,
                name: "招工任务"
            }, {
                id: 12,
                name: "服务任务"
            }, {
                id: 13,
                name: "分包任务"
            }],
            taskStatus: [, {
                id: 2,
                name: "已被接"
            }, {
                id: 3,
                name: "已关闭"
            }],
            businessType: [{
                id: 9999,
                name: "全部"
            }, {
                id: 1,
                name: "用工企业"
            }, {
                id: 2,
                name: "服务商"
            }],
            tradeStatus: [{
                id: 9999,
                name: "全部"
            }, {
                id: 1,
                name: "制造业"
            }, {
                id: 2,
                name: "服务员"
            }]

        })

})();
