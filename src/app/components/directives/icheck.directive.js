(function() {
    'use strict';
    // <input xx-check type="checkbox" ng-model="List._checkedAll" xx-model="List._checkedAll">
    angular
        .module('gongrenOps')
        .directive('xxCheck', ngPrettyCheck);

    /** @ngInject */
    function ngPrettyCheck() {
        var directive = {
            replace: false,
            restrict: 'AE',
            template: "<input type=\"checkbox\" name=\"{{name}}\">",
            scope: {
                xxModel: "=",
                xxChange: "="
            },
            controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
                var vm = this;
                $scope.xxModel = !!$scope.xxModel;
                $scope.name = Math.random().toString(36).substr(2)
                $($element).iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green'
                }).on('ifChecked', function(event) {
                    setTimeout(function() {
                        $scope.xxModel = true;
                        $scope.$apply();
                        if (typeof($scope.xxChange) == 'function') {
                            $scope.xxChange()
                        }
                    })
                }).on('ifUnchecked', function(event) {
                    setTimeout(function() {
                        $scope.xxModel = false;
                        $scope.$apply();
                        if (typeof($scope.xxChange) == 'function') {
                            $scope.xxChange()
                        }
                    })
                });

                $scope.$watch('xxModel', function(nVal, oVal) {
                    if ($scope.xxModel) {
                        $($element).iCheck('check');
                    } else {
                        $($element).iCheck('uncheck');
                    }
                    $($element).iCheck('update');
                })
            }]
        }
        return directive;


    }
})();
