(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('bargainManageList', {
                url: '/bargainManageList',
                templateUrl: 'app/components/main/main.html'
            })
            .state('bargainManageList.list', {
                url: '/list',
                templateUrl: 'app/modules/bargainManageList/list.html',
                controller: "bargainManageList1Controller",
                controllerAs: "List"
            })
        ;
    }

})();
