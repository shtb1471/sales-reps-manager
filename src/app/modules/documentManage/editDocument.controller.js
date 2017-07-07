(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('editDocumentDetailController', ["$scope", "close", "$element", "$resource", "FileUploader", editDocumentDetailController]);

    /** @ngInject */
    function editDocumentDetailController($scope, close, $element, $resource, FileUploader) {
        var vm = this;
        // vm.info = info ;
        vm.isvalidate = true
        vm.document = {
            fileUrl: "",
            fileName: "",
            remark: "",
            fileType: 3
        }

        vm.closeModal = function(validate) {
            vm.isvalidate = validate
            if(vm.isvalidate){
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
