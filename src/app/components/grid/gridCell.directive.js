(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .directive('xxGridCell', xxGridCell);

    /** @ngInject */
    function xxGridCell($compile) {
        var directive = {
            restrict: 'EA',
            repeat: true,
            scope: false, 
            compile: xxGridCellCompile,
            link: xxGridCellLinkFn
        };

        return directive;

        /** @ngInject */
        function xxGridCellCompile($scope, $element, $attrs) {
            return {
                pre: function($scope, $element, $attrs) {},
                post: function($scope, $element, $attrs) {
                    var vm = this;
                    var cellElement = $compile($scope.$parent.hitem.cellTemplate)($scope);
                    $element.append(cellElement);
                }
            }
        }

        /** @ngInject */
        function xxGridCellLinkFn($scope, $element, $attrs) {}
    }
})();
