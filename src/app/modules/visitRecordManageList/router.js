(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('visitRecordList', {
                url: '/visitRecordList',
                templateUrl: 'app/components/main/main.html'
            })
            .state('visitRecordList.list', {
                url: '/list',
                templateUrl: 'app/modules/visitRecordManageList/list.html',
                controller: "visitRecordList1Controller",
                controllerAs: "List"
            })
            .state('visitRecordListDetail', {
                url: '/visitRecordListDetail',
                templateUrl: 'app/components/main/main.html'
            })
            .state('visitRecordListDetail.detail', {
                url: '/detail/:id',
                templateUrl: 'app/modules/visitRecordManageList/detail.html',
                controller: "visitRecordListDetailController",
                controllerAs: "Detail"
            })

        ;
    }

})();
