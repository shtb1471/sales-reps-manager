(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('cooCustomer', {
                url: '/cooCustomer',
                templateUrl: 'app/components/main/main.html'
            })
            .state('cooCustomer.list', {
                url: '/list',
                templateUrl: 'app/modules/cooCustomerManage/list.html',
                controller: "cooCustomerListController",
                controllerAs: "List"
            })
            .state('cooCustomerDetail', {
                url: '/cooCustomerDetail',
                templateUrl: 'app/components/main/main.html'
            })
            .state('cooCustomerDetail.detail', {
                url: '/detail/:id',
                templateUrl: 'app/modules/detCustomerList/list.html',
                controller: "cooCustomerDetailController",
                controllerAs: "Detail"
            })

        ;
    }

})();
