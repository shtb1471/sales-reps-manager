(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('projectManageList1Controller', projectManageList1Controller);

    /** @ngInject */
    function projectManageList1Controller(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;

        function _init() {
            vm.query = {
                createUserid:"",
                comName: "",
                startTime: "",
                endTime: "",
                keyword: "",
                page: 1,
                pagesize: paginationNum
            }
        }
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

        var companyInfo = {};

        $scope.$on("detCustomerListGetUserListCompanyId", function(evt, msg) {
            companyInfo = msg;
            if (!vm.query) {
                _init();
            }
            vm.query.companyId = companyInfo.companyId;
            vm.queryFn();
        })

        if ($stateParams.verifyStatus) {
            vm.query.searchVerifyType = $stateParams.verifyStatus * 1
        }

        vm.queryFn = function() {
            var datas = $resource("/api/communication/programme")
            datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    vm.listDatas = response
                }
            })
        }
        vm._canSelect = 1

        vm.onReset = function() {
            var companyId = vm.query.companyId;
            _init()
            vm.query.companyId = companyId
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
                var datas = $resource("/api/communication/delete/programme")
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
                })
            }
            setTimeout(function() {
                $scope.$apply();
            })
        }

        vm.colsDefined = [{
            name: "客户名称",
            field: "name"
        }, {
            name: "方案名称",
            field: "fileName"
        }, {
            name: "附件",
            field: "fileUrlName"
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
