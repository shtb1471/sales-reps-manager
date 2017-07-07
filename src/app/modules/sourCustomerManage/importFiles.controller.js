(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('importCustomerResourceController', importCustomerResourceController);

    /** @ngInject */
    function importCustomerResourceController($scope, close, $element) {
        var vm = this;
        // vm.info = info ;
        vm.isvalidate = true
        vm.document = {
            fileUrl: "",
            fileName: "",
            remark: "",
            fileType: 2
        }

        vm.closeModal = function(validate) {
            vm.isvalidate = validate
            $element.modal('hide');
            close({
                result: 'okay',
                datas: vm.document
            }, 500);
            angular.element($element).remove()
        };
        vm.cancel = function() {
            $element.modal('hide');
            angular.element($element).remove()
            close(null, 500);
        };
    }
})();
