(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('leaAllot', {
                url: '/leaAllot',
                templateUrl: 'app/components/main/main.html'
            })
            .state('leaAllot.list', {
                url: '/list',
                templateUrl: 'app/modules/leaAllotManage/list.html',
                controller: "leaAllotListController",
                controllerAs: "List"
            })
            // .state('threadAllot', {
            //     url: '/threadAllot',
            //     templateUrl: 'app/components/main/main.html'
            // })
            // .state('editThreadAllot.detail', {
            //     url: '/detail/:id',
            //     templateUrl: 'app/modules/leaAllotManage/editThreadAllot.html',
            //     controller: "editThreadAllotController",
            //     controllerAs: "Detail"
            // })

        ;
    }

})();
