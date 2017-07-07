(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .directive('xxGrid', xxGrid);

    /** @ngInject */
    function xxGrid(xxGridSrv, $compile) {
        var directive = {
            restrict: 'EACM',
            repeat: false,
            templateUrl: 'app/components/grid/template.html',
            scope: {
                xxGrid: "="
            },
            controller: xxGridController,
            link: linkFn,
            controllerAs: 'List',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function xxGridController($scope, $element, $attrs) {
            var vm = this;
            var curMod = $scope.List.xxGrid;
            // vm.listDatas = xxGridSrv.gridSrvs[curMod]._bindDatas();
            var gridSrvs = xxGridSrv.getMod(curMod)
            vm.dataSrv = gridSrvs;
            vm.listDatas = vm.dataSrv.listDatas;
            vm.colsDefined = gridSrvs._bindColsDefined();
            vm._canSelect = gridSrvs._bindSelectFlag();
            vm.queryFn = gridSrvs._queryPages;
            vm.optFns = gridSrvs._bindOptFns();
            vm.currentPage = gridSrvs._bindCurrentPage();
            vm.entity = gridSrvs._bindEntity()

            vm.rowSelect = function(row, $event) {
                if (angular.element($event.target).hasClass('grid-opt-btn')) {
                    return
                }
                row._checked = !row._checked && vm._canSelect;
                var checkedCount = 0
                angular.forEach(vm.listDatas.data, function(ele, index) {
                    if (ele._checked) {
                        checkedCount++
                    }
                })
                vm._checkedAll = checkedCount == vm.listDatas.data.length
            }

            vm.selectAllRow = function() {
                if (vm.listDatas && vm.listDatas.data.length > 0) {
                    angular.forEach(vm.listDatas.data, function(ele, index) {
                        ele._checked = vm._checkedAll
                    })
                }
            }
        }

        /** @ngInject */
        function linkFn($scope, $element, $attrs) {
            var vm = this;
        }
    }

})();
