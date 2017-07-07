(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .service('userInfoSrv', userInfoSrv);

    /** @ngInject */
    function userInfoSrv($resource) {
        var self = this;
        var userInfo = {};

        self.setInfo = function(user) {
            userInfo = user;
        }

        self.getInfo = function() {
            return userInfo;
        }

        self.hasPrivilege = function(roles) {
            var lRole = [];
            if (!userInfo.roleCodes) {
                $resource("/api/sys/user/info").get({}, function(response) {
                    if (response.code == 0) {
                        userInfo = response.data[0];
                        localStorage.setItem("CURRENT_USER_NAME", userInfo.name);
                        localStorage.setItem("CURRENT_USER_ACCOUNT", vm.userInfo.account);
                    }
                })
            } else {
                var uRoles = userInfo.roleCodes.split(',');
                var uRObj = {}
                for (i = 0; i < uRoles.length; i++) {
                    uRObj[uRoles[i]] = 1;
                }
                if (typeof(roles) == 'object' && roles.length >= 0) {
                    lRole = roles;
                } else {
                    lRole = [roles];
                }
                var flag = 0;
                for (var i = 0; i < lRole.length; i++) {
                    if (uRObj[lRole[i]]) {
                        flag++
                    }
                }
                return !!flag;
            }
        }
    }

})();
