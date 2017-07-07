(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('allotDocumentDetailController', allotDocumentDetailController);

    /** @ngInject */
    function allotDocumentDetailController($scope, close, $element, $resource) {
      var vm = this;
      // vm.info = info ;
      vm.isvalidate=true
      vm.allot = {}
      var datas = $resource("/api/assign/query/xiashous")
      datas.get(vm.query, function(response) {
          if (response.code == 0) {
              vm.listDatas = response.data;
              vm.listDatas.unshift({
                  id: "",
                  name: "请选择"
              });
              vm.allot = vm.listDatas[0].id
          }
      })
      vm.closeModal = function(validate) {
          vm.isvalidate=validate
          if (vm.allot) {
              $element.modal('hide');
              close({
                  result: 'okay',
                  datas:vm.allot
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
