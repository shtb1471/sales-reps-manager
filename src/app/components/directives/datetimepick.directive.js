(function() {
    'use strict';
    //  <div ng-datepicker date-start="List.query.searchTimeMin" date-end="List.query.searchTimeMax" is-range="true" date-title="注册时间" placeholder-start="开始时间" placeholder-end="结束时间"></div>
    angular
        .module('gongrenOps')
        .directive('xxDatepicker', xxDatepicker);

    /** @ngInject */
    function xxDatepicker() {
        var directive = {
            restrict: 'AEM',
            replace: true,
            scope: {
                dateStart: "=",
                dateEnd: "=",
                isRange: "=",
                dateTitle: "@",
                placeholderStart: "@",
                placeholderEnd: "@"
            },
            template: '<div class=\"input-group input-daterange\"> <div class=\"input-group-btn\" ng-if=\"datePick.dateTitle\"> <span class=\"form-control\">{{datePick.dateTitle}}</span> </div> <input type=\"text\" name=\"start\" class=\"form-control\" ng-model=\"datePick.dateStart\" placeholder=\"{{datePick.placeholderStart}}\"> <span class=\"input-group-addon\" ng-show=\"datePick.isRange\">-</span> <input type=\"text\" ng-show=\"datePick.isRange\" name=\"end\" class=\"form-control\" ng-model=\"datePick.dateEnd\" placeholder=\"{{datePick.placeholderEnd}}\"> </div>',
            controller: ["$element", "$attrs", datetimepickController],
            controllerAs: "datePick",
            bindToController: true
        };

        return directive;

        function datetimepickController($element, $attrs) {
            var vm = this
            $($element).datepicker({
                autoclose: true,
                clearBtn: true,
                language: "zh-CN",
                format: "yyyy-mm-dd",
            });
        }
    }
})();
