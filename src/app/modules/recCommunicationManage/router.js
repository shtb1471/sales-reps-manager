(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('recCommunication', {
                url: '/recCommunication',
                templateUrl: 'app/components/main/main.html'
            })
            .state('recCommunication.list', {
                url: '/list',
                templateUrl: 'app/modules/recCommunicationManage/list.html',
                controller: "recCommunicationListController",
                controllerAs: "List"
            })
            .state('recCommunicationDetail', {
                url: '/recCommunication',
                templateUrl: 'app/components/main/main.html'
            })
            .state('recCommunicationDetail.detail', {
                url: '/detail/:id',
                templateUrl: 'app/modules/recCommunicationManage/detail.html',
                controller: "recCommunicationDetailController",
                controllerAs: "Detail"
            })

        ;
    }

})();
