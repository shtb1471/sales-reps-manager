(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('huashuguanli', {
                url: '/huashuguanli',
                templateUrl: 'app/components/main/main.html'
            })
            .state('huashuguanli.list', {
                url: '/list',
                templateUrl: 'app/modules/huashuguanli/list.html',
                controller: "huashuguanliListController",
                controllerAs: "List"
            })
            .state('huashuguanli.detail', {
                url: '/detail',
                templateUrl: 'app/modules/huashuguanli/detail.html',
                controller: "huashuDetailController",
                controllerAs: "Detail"
            })
        ;
    }

})();
