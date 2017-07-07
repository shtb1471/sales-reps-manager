(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/components/main/main.html',
                // controller: 'MainController',
                // controllerAs: 'main'
            });

        $urlRouterProvider.otherwise('/index/home');
    }

})();
