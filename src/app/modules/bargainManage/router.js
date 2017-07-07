(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('bargainManage', {
                url: '/bargainManage',
                templateUrl: 'app/components/main/main.html'
            })
            .state('bargainManage.list', {
                url: '/list',
                templateUrl: 'app/modules/bargainManage/list.html',
                controller: "bargainManageListController",
                controllerAs: "List"
            })
        ;
    }

})();
