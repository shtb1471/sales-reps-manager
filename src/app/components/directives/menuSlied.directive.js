(function() {
    'use strict';
    //  <div ng-Optionsr date-start="List.query.searchTimeMin" date-end="List.query.searchTimeMax" is-range="true" date-title="注册时间" placeholder-start="开始时间" placeholder-end="结束时间"></div>
    angular
        .module('gongrenOps')
        .directive('xxSlied', xxSlied);

    /** @ngInject */
    function xxSlied() {
        var directive = {
            restrict: 'A',
            scope: {
                xxSlied: "="
            },
            controller: ["$scope", "$element", "$attrs", xxSliedControllerFn]
        };
        return directive;

        function xxSliedControllerFn($scope, $element, $attrs) {
            var vm = this;
            //TODO:在这里添加动画效果

        }
    }
})();
