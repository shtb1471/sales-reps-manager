(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('projectManageList', {
                url: '/projectManageList',
                templateUrl: 'app/components/main/main.html'
            })
            .state('projectManageList.list', {
                url: '/list',
                templateUrl: 'app/modules/projectManageList/list.html',
                controller: "projectManageList1Controller",
                controllerAs: "List"
            })
        ;
    }

})();
