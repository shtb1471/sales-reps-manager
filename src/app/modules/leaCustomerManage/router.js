(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('leaCustomer', {
                url: '/leaCustomer',
                templateUrl: 'app/components/main/main.html'
            })
            .state('leaCustomer.list', {
                url: '/list',
                templateUrl: 'app/modules/leaCustomerManage/list.html',
                controller: "leaCustomerListController",
                controllerAs: "List"
            })
            .state('leaDetail', {
                url: '/leaDetail',
                templateUrl: 'app/components/main/main.html'
            })
            .state('leaDetail.detail', {
                url: '/detail/:id',
                templateUrl: 'app/modules/detCustomerList/list.html',
                controller: "leaDetailController",
                controllerAs: "Detail"
            })
        ;
    }

})();
