(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $state, $resource, userInfoSrv) {
        $rootScope.$state = $state;
        var vm = $rootScope;
        vm.userInfo = {
            name: ""
        }
        vm.lm = {
            result: []
        };
        $resource("/api/sys/user/info").get({}, function(response) {
            if (response.code == 0) {
                vm.userInfo = response.data[0];
                localStorage.setItem("CURRENT_USER_NAME", vm.userInfo.name);
                localStorage.setItem("CURRENT_USER_ACCOUNT", vm.userInfo.account);
                userInfoSrv.setInfo(vm.userInfo)
            }
            var defaultItem = 0
            if (vm.userInfo.showStatus != "obpm"||vm.userInfo.roleCodes!=null) {
                if(vm.userInfo.showStatus != "obpm"){
                    vm.lm.result.push({
                        "id": "001",
                        "name": "权限管理",
                        "href": null,
                        "url": "/ring/main#/author/author_userman/author_userman_list"
                    })
                    defaultItem++;
                }
                if(vm.userInfo.roleCodes!=null){
                    vm.lm.result.push({
                        "id": "002",
                        "name": "诚信聘",
                        "href": null,
                        "url": "/ring/main#/recruit/recruit_coman/recruit_coman_regreview"
                    })
                      defaultItem++;
                }
                // defaultItem = 2
            }
            var leftMenu = $resource("/api/sys/menu/opsmenu");
            // var leftMenu = $resource("/api/gongrenops/leftmenu");
            leftMenu.get({}, function(response) {
                //TODO:销售管理 权限：admin || "obpm" 显示销售管理
                if (response.code == 0 && (vm.userInfo.showStatus == "obpm" || vm.userInfo.showStatus == "admin")) {
                    for (var i = 0; i < response.data.length; i++) {
                        vm.lm.result.push(response.data[i])
                    }
                }
                var leftMenu1 = $resource("/api/sys/menu/hrtbmenu");
                leftMenu1.get({}, function(response) {
                    //TODO:工人网后台管理菜单 权限：admin || "" 显示工人网
                    if (response.code == 0 && (vm.userInfo.showStatus == "" || vm.userInfo.showStatus == "admin")) {
                        for (var i = 0; i < response.data.length; i++) {
                            vm.lm.result.push(response.data[i])
                        }
                    }
                    for (var i = 0; i < vm.lm.result.length; i++) {
                        if (typeof(vm.lm.result[i].status) == 'undefined') {
                            vm.lm.result[i].status = false;
                            if (i == defaultItem) {
                                vm.lm.result[i].status = true
                                vm.lm.result[i].children[0].status = true
                            }
                        }
                    }
                })
            })
        })
    }

})();
