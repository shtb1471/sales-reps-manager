(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('recCommunicationListController', recCommunicationListController);

    /** @ngInject */
    function recCommunicationListController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv) {
        var vm = this;

        function _init() {
            vm.query = {
                createUserid:"",
                comName: "",
                startTime: "",
                tarmination: "",
                keyword: "",
                page: 1,
                // pagesize: paginationNum
                pagesize: 20
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

        //TODO：当前为获取销售人员列表
        var datas = $resource("/api/assign/query/xiashous");
        datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    vm.allotDatas = response.data || []
                    vm.allotDatas.unshift({
                        id: "",
                        name: "请选择"
                    });
                    //此处获取默认销售人员值
                    vm.query.createUserid = vm.allotDatas[1].id;
                }
            })

        if ($stateParams.verifyStatus) {
            vm.query.searchVerifyType = $stateParams.verifyStatus * 1
        }

        vm.queryFn = function() {
                var datas = $resource("/api/communication/record")
                datas.get(vm.query, function(response) {
                    if (response.code == 0) {
                        vm.listDatas = response
                    }
                })
            }
            // vm._canSelect=1

        vm.onReset = function() {
            _init()
            vm.queryFn()
        }
        vm.onRefresh = function() {
            vm.queryFn()
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
                });
                setTimeout(function() {
                    $scope.$apply();
                })
            }
        }

        vm.colsDefined = [{
            name: "沟通内容",
            field: "content"
        }, {
            name: "客户名称",
            field: "name"
        }, {
            name: "联系人",
            field: "user"
        }, {
            name: "沟通时间",
            field: "createDate"
        }]

    }
})();
