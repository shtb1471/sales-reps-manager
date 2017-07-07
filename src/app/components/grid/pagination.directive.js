(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .directive('grPagination', grPagination);

    /** @ngInject */
    function grPagination() {
        var directive = {
            restrict: 'EACM',
            repeat: false,
            templateUrl: 'app/components/grid/pagination.html',
            scope: {
                total: '=',
                page: '=',
                totalRecords: '=',
                onPageChange: '=',
                entityUnit: '@',
                entityName: '@'
            },
            controller: grPaginationController,
            link: linkFn,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function grPaginationController($scope, $element, $attrs) {
            var vm = this;
            vm.split = 5;
            $scope.$on("resetCurrentPage", function(evt, data) {
                vm.page = 1;
                setTimeout(function() {
                    vm.onPageChange(vm.page);
                })
            })

            function min(val1, val2) {
                return val1 > val2 ? val2 : val1;
            }

            function calPages(start, end, current) {
                var pages = [],
                    _start = 1,
                    _end = 1;
                if (end - start >= 10) {
                    var deta1 = current - start + 1;
                    var deta2 = end - current + 1;
                    if (min(deta1, deta2) <= 5) {
                        if (deta1 < deta2) {
                            _start = current - deta1 + 1;
                            _end = _start + 10;
                        } else {
                            _end = current + deta2;
                            _start = end - 9;
                        }
                    } else {
                        _start = current - 4;
                        _end = current + 6;
                    }
                } else {
                    _start = start;
                    _end = end + 1;
                }
                for (var i = _start; i < _end; i++) {
                    pages.push(i)
                }
                return pages
            }

            $scope.$watch('vm.page', function(value) {
                vm.pages = calPages(1, vm.total, value);
            });

            $scope.$watch('vm.total', function(value, old) {
                vm.pages = calPages(1, vm.total, vm.page);
                if (vm.page > value && value > 0) {
                    vm.selectPage(vm.page);
                }
            });
            vm.isActive = function(page) {
                return vm.page === page;
            };

            vm.selectPage = function(page) {
                if (page <= 0 || page > vm.total) {
                    return;
                }
                if (!vm.isActive(page)) {
                    vm.page = page;
                    setTimeout(function() {
                        vm.onPageChange(vm.page);
                    })
                }
            };

            vm.goPage = function() {
                event && event.stopPropagation && event.stopPropagation();
                if ((event instanceof KeyboardEvent && event.which == 13) || !(event instanceof KeyboardEvent)) {
                    if (isNaN(vm.pageToGo)) {
                        return;
                    }
                    vm.pageToGo = parseInt(vm.pageToGo);
                    vm.selectPage(vm.pageToGo);
                    vm.pageToGo = '';
                }
            };

            vm.refresh = function() {
                setTimeout(function() {
                    vm.onPageChange(vm.page);
                })
            };

            vm.isFirstPage = function() {
                return (!vm.total || !vm.page || vm.page == 1)
            };

            vm.isLastPage = function() {
                return (!vm.total || !vm.page || vm.page == vm.total);
            };

            vm.noPrevious = function() {
                return vm.page === 1 || vm.total === 0 || vm.total === 1;
            };

            vm.noNext = function() {
                return vm.page === vm.total || vm.total === 0 || vm.total === 1;
            };

            vm.previousPage = function() {
                if (!vm.noPrevious()) {
                    vm.selectPage(vm.page - 1);
                }
            };

            vm.nextPage = function() {
                if (!vm.noNext()) {
                    vm.selectPage(vm.page + 1);
                }
            };
        }

        /** @ngInject */
        function linkFn($scope, $element, $attrs) {
            var vm = this;
        }
    }

})();
