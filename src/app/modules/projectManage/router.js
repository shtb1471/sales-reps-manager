(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('projectManage', {
                url: '/projectManage',
                templateUrl: 'app/components/main/main.html'
            })
            .state('projectManage.list', {
                url: '/list',
                templateUrl: 'app/modules/projectManage/list.html',
                controller: "projectManageListController",
                controllerAs: "List"
            })
        ;
    }

})();
