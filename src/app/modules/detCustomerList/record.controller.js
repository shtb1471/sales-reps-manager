(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('detCustomerListController', detCustomerListController);

    /** @ngInject */
    function detCustomerListController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;

        //TODO:这一段代码不能随便修改    start
        $scope.$emit("detCustomerListStateParams", $stateParams)
        vm.commL = commDict;
        var l_uri = xxCacheSrv.mkKey($state.current.name, $state.params);
        vm.query = xxCacheSrv.get(l_uri);

        $scope.$on("$destroy", function() {
            xxCacheSrv.put(l_uri, vm.query);
        });
        //TODO:这一段代码不能随便修改    end

        var companyInfo = {};

        $scope.$on("detCustomerListGetUserListCompanyId", function(evt, msg) {
            getUserList(msg)
            companyInfo = msg;
        })

        function getUserList(company) {
            var datas1 = $resource("/api/contacts/query/contactsAndLog")
            datas1.get({
                companyId: company.companyId,
                id: company.resourceId
            }, function(response) {
                if (response.code == 0) {
                    vm.userLists = response.data;
                    for (var idx = 0; idx < vm.userLists.length; idx++) {
                        if (company.contactId == vm.userLists[idx].id) {
                            vm.user = vm.userLists[idx];
                        }
                    }
                }
            })
        }

        vm.sendMsg = function() {
            //TODO:在这里发送消息
            if (vm.newMsg) {
                var datas = $resource("/api/contacts/add/contactsLog")
                datas.save({
                        companyId: $stateParams.id,
                        contactId: vm.user.id,
                        content: vm.newMsg
                    }, function(response) {
                        if (response.code == 0) {
                            vm.newMsg = "";
                            getUserList(companyInfo)
                        }
                    })
                    //TODO: 当前接口用于获取id值，为线索客户，目标客户，合作客户的列表显示最后操作时间做判断   end
                var datas = $resource("/api/assign/update/assignUpdateDate")
                datas.get({
                    id: companyInfo.resourceId
                }, function(response) {
                    if (response.code == 0) {}
                })
            }else{
              angular.element("#messageBox").focus();
            }
        }

    }
})();
