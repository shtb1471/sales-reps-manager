(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .service('xxMd5Srv', xxMd5Srv);

    /** @ngInject */
    function xxMd5Srv(md5) {
        var hashCache = {}
        this.hash = hash;

        function hash(data) {
            var data = data + "";
            var temp = hashCache[data]
            if (!temp) {
                temp = md5.createHash(data)
                hashCache[data] = temp
            }
            return temp;
        }
    }

})();
