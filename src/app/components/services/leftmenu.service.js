(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .service('leftMenuSrv', leftMenuSrv);

    /** @ngInject */
    function leftMenuSrv($resource) {
        var self = this;
        var leftMenu = {};
        //
        // function _getLeftMenu() {
        //     return $resource("/api/gongrenops/leftmenu").get()
        // }
        //
        // self.getLeftMenu = function() {
        //     return _getLeftMenu();
        // }
    }

})();
