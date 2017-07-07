(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        // $stateProvider
            // .state('toDoProjectManage', {
            //     url: '/toDoProjectManage',
            //     templateUrl: 'app/components/main/main.html'
            // })
            // .state('toDoProjectManage.list', {
            //     url: '/list',
            //     templateUrl: 'app/modules/toDoProjectManage/list.html',
            //     controller: "toDoManageController",
            //     controllerAs: "List"
            // })
            // .state('document.detail', {
            //     url: '/detail/:id',
            //     templateUrl: 'app/modules/documentManage/detail.html',
            //     controller: "documentDetailController",
            //     controllerAs: "Detail"
            // })

        ;
    }

})();
