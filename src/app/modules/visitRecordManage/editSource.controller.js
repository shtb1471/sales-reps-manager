(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('editVisitController', editVisitController);

    /** @ngInject */
    function editVisitController($scope, close, $element, info, $resource) {
        var vm = this;
        vm.info = info;
        vm.isvalidate = true
        vm.visitRecords = {}
            // 获取当前企业下的联系人
        var datas1 = $resource("/api/contacts/query/contactsAndLog")
        datas1.get({
            companyId: vm.info.companyId,
            id: vm.info.resourceId
        }, function(response) {
            if (response.code == 0) {
                vm.userLists = response.data;
                for (var idx = 0; idx < vm.userLists.length; idx++) {
                    if (vm.info.contactId == vm.userLists[idx].id) {
                        vm.user = vm.userLists[idx];
                    }
                }
            }
        })

        var datas = $resource("/api/company/query/resourceInfo")
        datas.get({
            companyId: vm.info.companyId,
            id: vm.info.resourceId
        }, function(response) {
            if (response.code == 0) {
                vm.companyInfo = response.data[0];
                vm.visitRecords = {
                    company: vm.companyInfo.entCompanyVo.name,
                    companyId: vm.companyInfo.companyId,
                }

            }
        })
        vm.selectOut = function() {
            vm.xxxxxx = !vm.xxxxxx
            vm.contactsChange(vm.user);
        }
        vm.contactsChange = function(contactValue) {
            vm.visitRecords.userName = contactValue.user;
            vm.visitRecords.mobile = contactValue.mobile;
        }
        vm.closeModal = function(validate) {
            vm.isvalidate = validate
            if (vm.isvalidate) {
                if (vm.visitRecords) {
                    $element.modal('hide');
                    close({
                        result: 'okay',
                        datas: vm.visitRecords
                    }, 500);
                    angular.element($element).remove()
                }
            }
        };
        vm.cancel = function() {
            $element.modal('hide');
            angular.element($element).remove()
            close(null, 500);
        };
    }
})();
