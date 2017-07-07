// (function() {
//     'use strict';
//
//     angular
//         .module('gongrenOps')
//         .config(routerConfig);
//
//     /** @ngInject */
//     function routerConfig($stateProvider, $urlRouterProvider) {
//         $stateProvider
//             .state('visitRecord', {
//                 url: '/visitRecord',
//                 templateUrl: 'app/components/main/main.html'
//             })
//             .state('visitRecord.list', {
//                 url: '/list',
//                 templateUrl: 'app/modules/visitRecordManage/list.html',
//                 controller: "visitRecordListController",
//                 controllerAs: "List"
//             })
//             .state('visitRecordDetail', {
//                 url: '/visitRecordDetail',
//                 templateUrl: 'app/components/main/main.html'
//             })
//             .state('visitRecordDetail.detail', {
//                 url: '/detail/:id',
//                 templateUrl: 'app/modules/visitRecordManage/detail.html',
//                 controller: "visitRecordDetailController",
//                 controllerAs: "Detail"
//             })
//
//         ;
//     }
//
// })();
