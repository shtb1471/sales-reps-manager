(function() {
    'use strict';
    //  <div ng-Options date-start="List.query.searchTimeMin" date-end="List.query.searchTimeMax" is-range="true" date-title="注册时间" placeholder-start="开始时间" placeholder-end="结束时间"></div>
    angular
        .module('gongrenOps')
        .directive('xxOptions', xxOptions);

    /** @ngInject */
    function xxOptions() {
        var directive = {
            restrict: 'A',
            replace: true,
            scope: {
                ngModel: "=",
                xxOptions: "=",
                xxTitle: "@",
                placeholderStart: "@",
                placeholderEnd: "@"
            },
            template: '<div ng-class=\"{\'input-group\':option.xxTitle,\'input-group-btn\':!option.xxTitle}\"> <div class=\"input-group-btn\" ng-if=\"option.xxTitle\"> <span class=\"form-control\">{{option.xxTitle}}</span> </div> <select class=\"form-control\" ng-model=\"option.ngModel\" ng-options=\"item.id as item.name for item in option.xxOptions\"></select> </div>',
            controller: ["$element", "$attrs", xxOptionsController],
            controllerAs: "option",
            bindToController: true
        };

        return directive;

        function xxOptionsController($element, $attrs) {
            var vm = this
        }
    }
})();
