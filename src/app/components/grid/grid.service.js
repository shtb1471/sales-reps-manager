(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .service('xxGridSrv', xxGridSrv);

    /** @ngInject */
    function xxGridSrv(xxMd5Srv, $resource, paginationNum) {
        var self = this;
        var gridSrvs = {};
        var currentPage = 1;

        function _getDatas(resourceApi, key, datas) {
            return $resource(resourceApi).get(gridSrvs[key].query, function(response) {
                if (response.code == 0) {}
            })
        }

        self.getMod = function(name) {
            return gridSrvs[name];
        }

        self.registry = function(name, opts) {
            var key = name
            gridSrvs[key] = {};
            gridSrvs[key].dataUrl = opts.dataUrl || "";
            gridSrvs[key].colsDefined = opts.ColsDefined || {};
            gridSrvs[key]._canSelect = opts._canSelect || false;
            gridSrvs[key].entityUnit = opts.entityUnit || "条";
            gridSrvs[key].entityName = opts.entityName || "记录";
            gridSrvs[key].query = {
                page: currentPage,
                pagesize: paginationNum,
                from: "service"
            }

            gridSrvs[key].Query = function(paras) {
                gridSrvs[key].setQueryPara(paras)
                gridSrvs[key].listDatas = _getDatas(gridSrvs[key].dataUrl, key)
            }

            gridSrvs[key].setQueryPara = function(paras) {
                for (var item in paras) {
                    gridSrvs[key].query[item] = paras[item]
                }
            }

            gridSrvs[key].setDataUrl = function(url) {
                resourceApi = url;
            }
            gridSrvs[key].setSelectFlag = function(flag) {
                _canSelect = flag;
            }

            gridSrvs[key].setColsDefined = function(coloums) {
                gridSrvs[key].colsDefined = coloums;
            }
            gridSrvs[key].setCurrentPage = function(currentpage) {
                gridSrvs[key].query.page = currentpage;
            }

            gridSrvs[key].setOptFns = function(optfns) {
                gridSrvs[key].optFns = optfns;
            }

            gridSrvs[key]._bindDatas = function() {
                return gridSrvs[key].listDatas;
            }
            gridSrvs[key]._bindColsDefined = function() {
                return gridSrvs[key].colsDefined;
            }

            gridSrvs[key]._bindSelectFlag = function() {
                return gridSrvs[key]._canSelect;
            }
            gridSrvs[key]._bindCurrentPage = function() {
                return gridSrvs[key].query.page;
            }
            gridSrvs[key]._bindOptFns = function() {
                return gridSrvs[key].optFns;
            }
            gridSrvs[key]._queryPages = function(page) {
                gridSrvs[key].query.page = page
                gridSrvs[key].listDatas = _getDatas(gridSrvs[key].dataUrl, key)
            }
            gridSrvs[key]._bindEntity = function() {
                return {
                    entityUnit: gridSrvs[key].entityUnit,
                    entityName: gridSrvs[key].entityName
                }
            }
        }

        self.getGrid = function(name) {
            var key = name
            return gridSrvs[key]
        }
    }

})();
