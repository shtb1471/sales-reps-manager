(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('leadEditSourceController', leadEditSourceController);

    /** @ngInject */
    function leadEditSourceController($scope, close, $element, $resource) {
        var vm = this;
        vm.source = {}
        // vm.info = info;
        vm.isvalidate = true
            // 获取所属行业select值 接口
        var datas = $resource("/api/company/query/sysGencodeList");
        datas.get({}, function(response) {
            if (response.code == 0) {
                vm.sysGencodeList = response.data[0];
                vm.sysGencodeList.industryList.unshift({
                    id: "",
                    gencodeName: "请选择"
                });
                vm.sysGencodeList.propertyList.unshift({
                    id: "",
                    gencodeName: "请选择"
                });
                vm.sysGencodeList.scaleList.unshift({
                    id: "",
                    gencodeName: "请选择"
                });
            }
        })
        vm.closeModal = function(validate) {
            vm.isvalidate = validate;
            if (vm.isvalidate) {
                if (vm.source) {
                    $element.modal('hide');
                    close({
                        result: 'okay',
                        isEdit: vm.isEdit,
                        datas: vm.source
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
