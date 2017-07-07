(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('editToDoProjectController', editToDoProjectController);

    /** @ngInject */
    function editToDoProjectController($scope, close, $element, info) {
        var vm = this;
        vm.info = info;
        vm.todo = {}

        vm.isvalidate = true
        vm.isEdit = false;
        var currentDate = moment().format("YYYY-MM-DD")
        var currentTime = moment().format("HH-mm-ss").split("-")

        function xx(start, end) {
            var temp = []
            for (var idx = start; idx < end; idx++) {
                if (idx < 10) {
                    idx = '0' + idx
                }
                temp.push(idx + '')
            }
            return temp
        }
        vm.hhmmss = {
            hh: xx(0, 24),
            mm: xx(0, 60),
            ss: xx(0, 60),
        }
        vm.time = {
            date: currentDate,
            hh: currentTime[0] + '',
            mm: currentTime[1] + '',
            ss: currentTime[2] + ''
        }
        if (info) {
            vm.todo = info;
            console.log(vm.todo.item)
            var todoDate=vm.todo.itemDate.split(" ");
            var todoTime=todoDate[1];
            vm.time={
              date:todoDate[0],
              hh: todoTime.split(":")[0],
              mm: todoTime.split(":")[1],
              ss: todoTime.split(":")[2]
            }
            vm.isEdit = true;
        }

        vm.closeModal = function(validate) {
            vm.isvalidate = validate
            if(vm.isvalidate){
              vm.todo.item_date = moment(vm.time.date + " " + [vm.time.hh, vm.time.mm, vm.time.ss].join(":"), 'YYYY-MM-DD h:m:s').format("YYYY-MM-DD HH:mm:ss");
              if (vm.todo) {
                $element.modal('hide');
                close({
                  result: 'okay',
                  isEdit: vm.isEdit,
                  datas: vm.todo
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
