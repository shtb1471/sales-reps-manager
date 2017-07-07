(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('editProgectController', editProgectController);

    /** @ngInject */
    function editProgectController($scope, close, $element) {
        var vm = this;
        // vm.info = info ;
        vm.isvalidate = true

        vm.document = {
            fileUrl: "",
            fileName: "",
            remark: "",
            fileType: 1
        }

        vm.closeModal = function(validate) {
            vm.isvalidate = validate
            if (vm.isvalidate) {
                $element.modal('hide');
                close({
                    result: 'okay',
                    datas: vm.document
                }, 500);
                angular.element($element).remove()
            }
        };
        vm.cancel = function() {
            $element.modal('hide');
            angular.element($element).remove()
            close(null, 500);
        };
    }
})();
