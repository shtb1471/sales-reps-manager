(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('cooTodoDetailController', cooTodoDetailController);

    /** @ngInject */
    function cooTodoDetailController($scope, close, $element, info, $resource) {
        var vm = this;
        vm.info = info;
        if(vm.info){
          vm.detailData=vm.info.todoData
        }
        vm.closeModal = function(validate) {
            vm.isvalidate = validate
            $element.modal('hide');
            close({
                result: 'okay',
                datas: vm.detailData
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
