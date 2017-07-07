(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('document', {
                url: '/document',
                templateUrl: 'app/components/main/main.html'
            })
            .state('document.list', {
                url: '/list',
                templateUrl: 'app/modules/documentManage/list.html',
                controller: "documentListController",
                controllerAs: "List"
            })

            // .state('editDocument.detail', {
            //     url: '/detail/:id',
            //     templateUrl: 'app/modules/documentManage/editDocument.html',
            //     controller: "editDocumentDetailController",
            //     controllerAs: "Detail"
            // })
            .state('detailDocument', {
                url: '/document',
                templateUrl: 'app/components/main/main.html'
            })
            .state('detailDocument.detail', {
                url: '/detail/:id',
                templateUrl: 'app/modules/documentManage/detail.html',
                controller: "documentDetailController",
                controllerAs: "Detail"
            })
            ;
    }

})();
