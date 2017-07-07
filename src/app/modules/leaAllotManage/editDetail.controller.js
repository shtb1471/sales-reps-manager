(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('editDetailController', editDetailController);

    /** @ngInject */
    function editDetailController($scope, close, $element, info, $resource) {
        var vm = this;
        vm.info = info;
        vm.isvalidate = true;
        vm.company = {}
        var datas = $resource("/api/company/query/sysGencodeList");
        datas.get(vm.query, function(response) {
            if (response.code == 0) {
                // vm.tradeStatus = response.data[0].industryList;
                // vm.tradeStatus.unshift({
                //     id: "",
                //     gencodeName: "请选择"
                // });
                vm.sysGencodeList = response.data[0];
                sysGencodeParam(vm.sysGencodeList.industryList);
                sysGencodeParam(vm.sysGencodeList.propertyList);
                sysGencodeParam(vm.sysGencodeList.scaleList);
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

        function sysGencodeParam(idt) {
            angular.forEach(idt, function(ele, idx) {
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
            })
        }
        vm.closeModal = function(validate) {
            vm.isvalidate = validate
            if (vm.isvalidate) {
                if (info) {
                    $element.modal('hide');
                    close({
                        result: 'okay',
                        datas: vm.info
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
