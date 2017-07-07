(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('visitRecordListDetailController', visitRecordListDetailController);

    /** @ngInject */
    function visitRecordListDetailController(notify, $resource, $state, $stateParams) {
        var vm = this;
        vm.query = {
            visitId: $stateParams.id
        }
        var datas = $resource("/api/communication/query/visit")
        datas.get(vm.query, function(response) {
            if (response.code == 0) {
                vm.detailData = response.data[0];
            }
        })
    }
})();
