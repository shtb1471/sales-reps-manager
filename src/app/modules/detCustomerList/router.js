(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('detCustomer', {
                url: '/detCustomer',
                // templateUrl: 'app/components/main/main.html'
                templateUrl: 'app/components/main/main1.html'
            })
            .state('detCustomer.list', {
                url: '/list',
                templateUrl: 'app/modules/detCustomerList/common.html',
                controller: "detCustomerListCommonController",
                controllerAs: "Detail"
            })
            .state('detCustomer.list.record', {
                url: '/record/:id/:sourceId/:from',
                templateUrl: 'app/modules/detCustomerList/record.html',
                controller: "detCustomerListController",
                controllerAs: "Detail"
            })
            .state('detCustomer.list.contacts', {
                url: '/contacts/:id/:sourceId/:from',
                templateUrl: 'app/modules/contactManage/list.html',
                controller: "contactManageListController",
                controllerAs: "List"
            })
            .state('detCustomer.list.visit', {
                url: '/visit/:id/:sourceId/:from',
                templateUrl: 'app/modules/visitRecordManage/list.html',
                controller: "visitRecordListController",
                controllerAs: "List"
            })
            .state('detCustomer.list.visitDetail', {
                url: '/visitDetail/:id',
                templateUrl: 'app/modules/visitRecordManage/detail.html',
                controller: "visitRecordDetailController",
                controllerAs: "Detail"
            })
            .state('detCustomer.list.toDoProject', {
                url: '/toDoProject/:id/:sourceId/:from',
                templateUrl: 'app/modules/toDoProjectManage/list.html',
                controller: "toDoProjectController",
                controllerAs: "List"
            })
            .state('detCustomer.list.project', {
                url: '/project/:id/:sourceId/:from',
                templateUrl: 'app/modules/projectManage/list.html',
                controller: "projectManageListController",
                controllerAs: "List"
            })
            .state('detCustomer.list.bargain', {
                url: '/bargain/:id/:sourceId/:from',
                templateUrl: 'app/modules/bargainManage/list.html',
                controller: "bargainManageListController",
                controllerAs: "List"
            })
            .state('detCustomer.list.huashu', {
                url: '/huashu/:id/:sourceId/:from',
                templateUrl: 'app/modules/huashuguanli/detail.html',
                controller: "huashuDetailController",
                controllerAs: "Detail"
            })            ;
    }

})();
