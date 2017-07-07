(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('documentListController', documentListController);

    /** @ngInject */
    function documentListController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;

        function _init() {
            vm.query = {
                fileName: "",
                searchTimeMin: "",
                searchTimeMax: "",
                page: 1,
                pagesize: paginationNum
            }
        }
        //TODO:这一段代码不能随便修改    start
        vm.commL = commDict;
        var l_uri = xxCacheSrv.mkKey($state.current.name, $state.params);
        vm.query = xxCacheSrv.get(l_uri);
        if (!vm.query) {
            _init()
        };
        $scope.$on("$destroy", function() {
            xxCacheSrv.put(l_uri, vm.query);
        });
        //TODO:这一段代码不能随便修改    end

        if ($stateParams.verifyStatus) {
            vm.query.searchVerifyType = $stateParams.verifyStatus * 1
        }

        vm.queryFn = function() {
            var datas = $resource("/api/accUserfile/query/commonfile")
            datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    vm.listDatas = response
                }
            })
        }

        vm.onReset = function() {
            _init()
            vm.queryFn()
        }
        vm.onRefresh = function() {
            vm.queryFn()
        }
        vm.editDocument = function(row) {
            ModalService.showModal({
                templateUrl: "app/modules/documentManage/editDocument.html",
                controller: "editDocumentDetailController",
                controllerAs: "modal"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        var datas = $resource("/api/accUserfile/insert/fileVo")
                        datas.save(result.datas, function(response) {
                            if (response.code == 0) {
                                vm.queryFn();
                            }
                        })
                    }
                });
            });
        }
        vm.queryFn()

        vm.rowSelect = function(row, $event) {
            if (angular.element($event.target).hasClass('grid-opt-btn')) {
                return
            }
            row._checked = !row._checked && vm._canSelect;
            var checkedCount = 0
            angular.forEach(vm.listDatas.data, function(ele, index) {
                if (ele._checked) {
                    checkedCount++
                }
            })
            vm._checkedAll = checkedCount == vm.listDatas.data.length
        }

        vm.selectAllRow = function() {
            if (vm.listDatas && vm.listDatas.data.length > 0) {
                angular.forEach(vm.listDatas.data, function(ele, index) {
                    ele._checked = vm._checkedAll
                })
            }
            setTimeout(function() {
                $scope.$apply();
            })
        }

        vm.colsDefined = [{
            name: "文档名称",
            field: "fileName"
        }, {
            name: "创建人",
            field: "createUsername"
        }, {
            name: "创建时间",
            field: "createDate"
        }, {
            name: "操作"
        }]

    }
})();
