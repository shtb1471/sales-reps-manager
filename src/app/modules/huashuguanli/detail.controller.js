(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('huashuDetailController', huashuDetailController);

    /** @ngInject */
    function huashuDetailController(notify, $resource, $state, $stateParams, $scope) {
        var vm = this;
        vm.query = {
            courseName: "",
            serviceType: 0,
        }

        $scope.$emit("detCustomerListStateParams", $stateParams)

        vm.queryFn = function() {
            var datas = $resource("/api/course/query/course")
            datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    angular.forEach(response.data, function(cont, idc) {
                        if (cont.content) {
                            cont.content = cont.content.replace(/\n/g, '<br/>');
                        }
                    })
                    vm.dData = response
                }
            })
        };
        vm.tabQuery = function(type) {
            vm.query.serviceType = type;
            vm.queryFn();
        }
        vm.queryFn();
    }
})();
