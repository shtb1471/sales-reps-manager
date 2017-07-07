(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('contactManage', {
                url: '/contactManage',
                templateUrl: 'app/components/main/main.html'
            })
            .state('contactManage.list', {
                url: '/list',
                templateUrl: 'app/modules/contactManage/list.html',
                controller: "contactManageListController",
                controllerAs: "List"
            })
            // .state('document.detail', {
            //     url: '/detail/:id',
            //     templateUrl: 'app/modules/documentManage/detail.html',
            //     controller: "documentDetailController",
            //     controllerAs: "Detail"
            // })

        ;
    }

})();
