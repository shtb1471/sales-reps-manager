(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('visitRecordDetailController', visitRecordDetailController);

    /** @ngInject */
    function visitRecordDetailController(notify, $resource, $state, $stateParams) {
        var vm = this;
        vm.query = {
            companyVisitId: $stateParams.id
        }
        var datas = $resource("/api/company/query/companyVisitInfo")
        datas.get(vm.query, function(response) {
            if (response.code == 0) {
                vm.detailData = response.data[0];
            }
        })
    }
})();
