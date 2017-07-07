(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('huashuguanliCreateUpdateController', huashuguanliCreateUpdateController);

    /** @ngInject */
    function huashuguanliCreateUpdateController($scope, close, $element, info) {
        var vm = this;
        // vm.info = info ;
        vm.isvalidate = true
        vm.document = {
            name: "",
            content: "",
            serviceType: 0
        }
        if (info) {
            if (info.content) {
                info.content = info.content.replace('<br/>','\n' );
            }
            vm.document = {
                name: info.name,
                content: info.content,
                serviceType: info.serviceType,
                id: info.id
            }
            switch (info.serviceType * 1) {
                case 0:
                    vm.isChxp = true;
                    vm.isGrw = true;
                    break;
                case 1:
                    vm.isGrw = true;
                    break;
                case 2:
                    vm.isChxp = true;
                    break;
                default:

            }
        }

        vm.closeModal = function(validate) {
            vm.isvalidate = validate
                //  0全部 ，1工人网 ，2诚信互通
            if (vm.isChxp) {
                vm.document.serviceType = 2;
            }
            if (vm.isGrw) {
                vm.document.serviceType = 1;
            }
            if (vm.isChxp && vm.isGrw) {
                vm.document.serviceType = 0;
            }

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
