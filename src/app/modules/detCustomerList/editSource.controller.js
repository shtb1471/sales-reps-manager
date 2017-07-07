(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('editDetailsController', ["$scope", "close", "$element", "info", "$resource", editDetailsController]);

    /** @ngInject */
    function editDetailsController($scope, close, $element, info, $resource) {
        var vm = this;
        vm.isvalidate = true;
        vm.info = info;
        var datas = $resource("/api/company/query/companyInfo")
        datas.get({
            companyId: info.id
        }, function(response) {
            if (response.code == 0) {
                vm.companyList = response.data;
            }
        })
        var datas = $resource("/api/company/query/sysGencodeList");
        datas.get(vm.query, function(response) {
            if (response.code == 0) {

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

                var industryName = vm.info.entCompanyVo.industryName;
                var propertyName = vm.info.entCompanyVo.propertyName;
                var scaleName = vm.info.entCompanyVo.scaleName;

                if (ele.gencodeName == industryName) {
                    vm.info.entCompanyVo.industry = ele.gencodeValue
                } else if (ele.gencodeName == propertyName) {
                    vm.info.entCompanyVo.property = ele.gencodeValue
                } else if (ele.gencodeName == scaleName) {
                    vm.info.entCompanyVo.scale = ele.gencodeValue
                }
            })
        }
        vm.closeModal = function(validate) {
          console.log(validate)
            vm.isvalidate = validate;
            if (vm.isvalidate) {
                vm.info.entCompanyVo.companyId = vm.info.companyId
                if (vm.info) {
                    $element.modal('hide');
                    close({
                        result: 'okay',
                        datas: vm.info.entCompanyVo
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
