(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .config(config);

    /** @ngInject */
    function config($logProvider, blockUIConfig, $httpProvider) {
        // Enable log
        $logProvider.debugEnabled(true);
        // Change the default overlay message
        blockUIConfig.message = '加载中...';
        blockUIConfig.cssClass = 'block-ui ';
        blockUIConfig.template = "<div  class=\"loading-bkg\" ><div class=\"loading-info-box\"><i class=\"fa fa-spinner fa-spin fa-2x\"></i><p></p><p><strong>{{state.message||'加载中...'}}</strong></p></div></div>";

        $httpProvider.interceptors.push([
            '$injector',
            function($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    }

})();
