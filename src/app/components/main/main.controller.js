(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($timeout, notify, $sce,$state) {
        var vm = this;
        notify.config({
            theme: 'pure',
            duration: 5000,
            sticky: false,
            button: true,
            html: false
        });

        setTimeout(function() {
            var today = moment().format("YYYY-MM-DD")
            localStorage.setItem(today, 'true');
            // notify({
            //     message: $sce.trustAsHtml('Today is ' + today + ', have a nice day. ^_^'),
            //     classes: 'alert-success'
            // });
        }, 3000);

        vm.confirmExit = function() {
            //TODO:清理cookie 退出登录 跳转登录页面
            window.location = '/logout'
        }

    }
})();
