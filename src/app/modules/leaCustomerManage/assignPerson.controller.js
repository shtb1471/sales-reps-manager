(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('assignPersonDetailController', assignPersonDetailController);

    /** @ngInject */
    function assignPersonDetailController($scope, close, $element, $resource) {
      var vm = this;
      // vm.info = info ;
      vm.isvalidate=true
      vm.assign = {}
      var datas = $resource("/api/assign/query/assignSubUser")
      datas.get(vm.query, function(response) {
          if (response.code == 0) {
              vm.listDatas = response.data;
              vm.listDatas.unshift({
                  id: "",
                  name: "请选择"
              });
              vm.assign = vm.listDatas[0].id
          }
      })
      vm.closeModal = function(validate) {
          vm.isvalidate=validate
          if (vm.assign) {
              $element.modal('hide');
              close({
                  result: 'okay',
                  datas:vm.assign
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
