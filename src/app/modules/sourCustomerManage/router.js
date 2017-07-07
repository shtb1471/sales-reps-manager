(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('sourCustomer', {
                url: '/sourCustomer',
                templateUrl: 'app/components/main/main.html'
            })
            .state('sourCustomer.list', {
                url: '/list',
                templateUrl: 'app/modules/sourCustomerManage/list.html',
                controller: "sourCustomerListController",
                controllerAs: "List"
            });
    }

})();
