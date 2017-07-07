(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('editSourceController', editSourceController);

    /** @ngInject */
    function editSourceController($scope, close, $element, $resource, info) {
        var vm = this;
        vm.source = {}
        vm.info = info;
        vm.isEdit = false;
        if (info) {
            vm.source = info;
            vm.isEdit = true;
        }
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
                sysGencodeParam(vm.sysGencodeList.industryList);
                sysGencodeParam(vm.sysGencodeList.propertyList);
                sysGencodeParam(vm.sysGencodeList.scaleList);

            }
        })

        function sysGencodeParam(idt) {
            angular.forEach(idt, function(ele, idx) {
                if (vm.info) {
                    var industryName = vm.info.industryName;
                    var propertyName = vm.info.propertyName;
                    var scaleName = vm.info.scaleName;
                    if (ele.gencodeName == industryName) {
                        vm.info.industry = ele.gencodeValue
                    } else if (ele.gencodeName == propertyName) {
                        vm.info.property = ele.gencodeValue
                    } else if (ele.gencodeName == scaleName) {
                        vm.info.scale = ele.gencodeValue
                    }
                }
            })
        }
        vm.closeModal = function(validate) {
            vm.isvalidate = validate
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
