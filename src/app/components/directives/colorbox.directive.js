(function() {
    'use strict';
    //  <div ng-Optionsr date-start="List.query.searchTimeMin" date-end="List.query.searchTimeMax" is-range="true" date-title="注册时间" placeholder-start="开始时间" placeholder-end="结束时间"></div>
    angular
        .module('gongrenOps')
        .directive('xxColorbox', xxColorbox);

    /** @ngInject */
    function xxColorbox() {
        var directive = {
            restrict: 'A',
            scope: {},
            link: xxColorboxLinkFn
        };
        return directive;

        function xxColorboxLinkFn($scope, $element, $attrs) {
            var vm = this;
            $($element).click('bind', function(event) {
                $.colorbox({
                    // maxWidth: 800,
                    // maxHeight: 600,
                    href: $attrs.xxColorbox
                });
                $("#colorbox").click(function(event) {
                    $.colorbox.remove();
                })
            });
        }
    }
})();
