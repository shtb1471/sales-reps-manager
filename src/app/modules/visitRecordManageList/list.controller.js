(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('visitRecordList1Controller', visitRecordList1Controller);

    /** @ngInject */
    function visitRecordList1Controller(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;

        function _init() {
            vm.query = {
                createUserid: "",
                comName: "",
                visitPeople: "",
                startTime: "",
                endTime: "",
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
            var datas = $resource("/api/communication/visit")
            datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    // createDate
                    angular.forEach(response.data, function(ele, index) {
                        if (ele.createDate) {
                            ele.createDateShow = moment(ele.createDate).format("YYYY-MM-DD")
                        }
                    })
                    vm.listDatas = response
                }
            })
        }
        vm._canSelect = 1

        vm.onReset = function() {
            _init()
            vm.queryFn()
        }
        vm.onRefresh = function() {
            vm.queryFn()
        }
        vm.deleteSource = function() {
            var ids = []
            angular.forEach(vm.listDatas.data, function(ele, index) {
                // ele._checked = vm._checkedAll
                if (ele._checked) {
                    ids.push(ele.id)
                }
            })
            swal({
                title: "删除",
                text: "确认删除吗？",
                type: "info",
                showLoaderOnConfirm: true,
                showCancelButton: true,
                // closeOnConfirm: false,
                animation: "slide-from-top"
            }, function(inputValue) {
                if (inputValue === false) return false;
                var datas = $resource("/api/communication/delete/visit")
                datas.save({
                    ids: ids
                }, function(response) {
                    if (response.code == 0) {
                        // swal(response.msg, "", "success");
                        vm.queryFn()
                    } else {
                        swal(response.msg, "", "error");
                    }
                })
            });
        }
        vm.queryFn()

        vm.rowSelect = function(row, $event) {
            if (angular.element($event.target).hasClass('grid-opt-btn')) {
                return
            }
            // row._checked = !row._checked && vm._canSelect;
            // var checkedCount = 0
            // angular.forEach(vm.listDatas.data, function(ele, index) {
            //     if (ele._checked) {
            //         checkedCount++
            //     }
            // })
            // vm._checkedAll = checkedCount == vm.listDatas.data.length
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
            name: "客户名称",
            field: "name"
        }, {
            name: "拜访人",
            field: "userName"
        }, {
            name: "联系电话",
            field: "mobile"
        }, {
            name: "拜访日期",
            field: "createDateShow"
        }, {
            name: "创建时间",
            field: "createDate"
        }, {
            name: "操作"
        }]

    }
})();
