(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('editContactController', editContactController);

    /** @ngInject */
    function editContactController($scope, close, $element, info) {
        var vm = this;
        vm.info = info;
        vm.contacts = {}
        vm.isvalidate = true
        vm.isEdit = false;
        if (info) {
            vm.contacts = info;
            vm.isEdit = true;
        }

        vm.closeModal = function(validate) {
            vm.isvalidate = validate
            if (vm.isvalidate) {
                if (vm.contacts) {
                    $element.modal('hide');
                    close({
                        result: 'okay',
                        isEdit: vm.isEdit,
                        datas: vm.contacts
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
