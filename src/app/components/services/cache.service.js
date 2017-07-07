(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .service('xxCacheSrv', xxCacheSrv);

    /** @ngInject */
    function xxCacheSrv(xxMd5Srv, $cacheFactory) {
        var self = this;
        var cacheName = 'cache001';
        var caches = {};
        var cache = $cacheFactory(cacheName);
        caches[cacheName] = cache;

        self.mkKey = function() {
            var rawkey = ''
            for (var item = 0; item < arguments.length; item++) {
                switch (typeof(arguments[item])) {
                    case 'string':
                    case 'number':
                        rawkey += arguments[item]
                        break;
                    case 'object':
                        try {
                            rawkey += JSON.stringify(arguments[item])
                        } catch (e) {} finally {}
                        break;
                    case 'undefined':
                        break;
                    default:
                }
            }
            var key = xxMd5Srv.hash(rawkey)
            self.put('rawdata' + key, arguments)
            return key
        }

        self.getKeyRaw = function(key) {
            return self.get('rawdata' + key)
        }

        self.select = function(name) {
            var tempId = name + '';
            if (caches[tempId]) {
                cache = caches[tempId];
            } else {
                caches[name] = $cacheFactory(name)
            }
            return cache.info();
        }

        self.put = function(key, value) {
            key = xxMd5Srv.hash(key);
            var _cacheName = arguments[2] || cacheName;
            if (caches[_cacheName]) {
                return caches[_cacheName].put(key, value)
            } else {
                caches[_cacheName] = $cacheFactory(_cacheName)
                return caches[_cacheName].put(key, value)
            }
        }

        self.get = function(key) {
            key = xxMd5Srv.hash(key);
            var _cacheName = arguments[1] || cacheName;
            return caches[_cacheName].get(key)
        }

        self.removeAll = function(cachename) {
            var _cacheName = cachename || cacheName;
            return caches[_cacheName].removeAll()
        }
        self.info = function(cachename) {
            var _cacheName = cachename || cacheName;
            return caches[_cacheName].info()
        }

        self.destroy = function(cachename) {
            var _cacheName = cachename || cacheName;
            return caches[_cacheName].destroy()
        }
    }

})();
