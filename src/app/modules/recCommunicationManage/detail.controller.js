(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('recCommunicationDetailController', recCommunicationDetailController);

    /** @ngInject */
    function recCommunicationDetailController(notify, $resource, $state, $stateParams) {
        var vm = this;
        vm.query = {
            missionid: $stateParams.id
        }

        var datas = $resource("/api/hrtbmission/mission/detailinfo")
        datas.get(vm.query, function(response) {
            if (response.code == 0) {
                vm.detailData = response.data[0]
            }
        })
    }
})();
