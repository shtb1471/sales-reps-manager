(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('leftMenuController', leftMenuController);

    /** @ngInject */
    function leftMenuController($resource, $rootScope) {
        var vm = this;
        vm.lm = $rootScope.lm
        vm.turnStatus = function(val) {
            return !val;
        }
    }
})();
