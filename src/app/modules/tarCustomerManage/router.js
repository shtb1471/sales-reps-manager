(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tarCustomer', {
                url: '/tarCustomer',
                templateUrl: 'app/components/main/main.html'
            })
            .state('tarCustomer.list', {
                url: '/list',
                templateUrl: 'app/modules/tarCustomerManage/list.html',
                controller: "tarCustomerListController",
                controllerAs: "List"
            })
            
        ;
    }

})();
