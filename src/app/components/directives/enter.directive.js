(function() {
    'use strict';
    //
    angular
        .module('gongrenOps')
        .directive('xxEnter', xxEnter);

    /** @ngInject */
    function xxEnter() {
        var directive = {
            restrict: 'A',
            scope: {
                xxEnter: "="
            },
            controller: ["$scope", "$element", "$attrs", xxSliedControllerFn]
        };
        return directive;

        function xxSliedControllerFn($scope, $element, $attrs) {
            var vm = this;
            $element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    $scope.$apply(function() {
                        if (typeof($scope.xxEnter) == 'function') {
                            $scope.xxEnter();
                        }
                    });
                    event.preventDefault();
                }
            });
        }
    }
})();
