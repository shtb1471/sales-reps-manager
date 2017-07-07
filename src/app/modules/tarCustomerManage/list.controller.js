(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('tarCustomerListController', tarCustomerListController);

    /** @ngInject */
    function tarCustomerListController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;

        function _init() {
            vm.query = {
                userid: "",
                name: "",
                industry: "",
                startTime: "",
                endTime: "",
                companyType: 2,
                companyLevel: "",
                serviceType: "",
                page: 1,
                pagesize: paginationNum
            }
        }
        //TODO：当前为获取销售人员列表
        vm.allot = {}
        var datas = $resource("/api/assign/query/xiashous")
        datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    vm.allotDatas = response.data || []
                    vm.allotDatas.unshift({
                        id: "",
                        name: "请选择"
                    });
                    //此处获取默认销售人员值
                    vm.query.userid = vm.allotDatas[1].id;
                }
            })
            //TODO:获取待办事项列表{
        vm.todo = {}
        vm.todoQuery = function() {
            var datas = $resource("/api/communication/queryAll/todo")
            datas.get({}, function(response) {
                if (response.code == 0) {
                    vm.todoDatas = response.data
                }
            })
        }
        vm.todoQuery()
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
            var datas = $resource("/api/assign/query/assignPage")
            datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    vm.listDatas = response
                }
            })
        }
        vm.tabQuery = function(type) {
            vm.query.companyLevel = type;
            vm.queryFn();
        }
        vm._canSelect = 1
        vm.onReset = function() {
            _init()
            vm.queryFn()
        }
        vm.onRefresh = function() {
            vm.queryFn()
        }
        vm.editSource = function(row) {
            ModalService.showModal({
                templateUrl: "app/modules/tarCustomerManage/editSource.html",
                controller: "targetEditSourceController",
                controllerAs: "modal"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        var datas = $resource("/api/company/add/companyvo");
                        datas.save({
                                name: result.datas.name,
                                companyWebsite: result.datas.companyWebsite,
                                industry: result.datas.industry,
                                scale: result.datas.scale,
                                property: result.datas.property,
                                address: result.datas.address,
                                shortDesc: result.datas.shortDesc,
                                insertType: result.datas.insertType, //查看代表什么
                                user: result.datas.user,
                                mobile: result.datas.mobile,
                                phone: result.datas.phone,
                                email: result.datas.email,
                                resourceType: 2,
                                job: result.datas.job,
                                qq: result.datas.qq,
                                weixin: result.datas.weixin,
                                ext: result.datas.ext
                            },
                            function(response) {
                                if (response.code == 0) {
                                    vm.queryFn()
                                } else {
                                    swal(response.msg, "", "error");
                                }
                            })
                    }
                });
            });
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
                var datas = $resource("/api/assign/lowdown/byIds")
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
        vm.importFile = function() {
            ModalService.showModal({
                templateUrl: "app/modules/tarCustomerManage/import.html",
                controller: "targetImportManageController",
                controllerAs: "modal"
            }).then(function(modal) {
                modal.element.modal();
                // $state.reload();
            });
        }


        vm.queryFn()
            //todo:处理详情
        vm.todoDetail = function(row) {
            ModalService.showModal({
                templateUrl: "app/modules/tarCustomerManage/todoDetail.html",
                controller: "tarTodoDetailController",
                controllerAs: "modal",
                inputs: {
                    info: row
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        var datas = $resource("/api/communication/modify/todoState");
                        datas.save({
                            id: result.datas.id
                        }, function(response) {
                            if (response.code == 0) {
                                vm.todoQuery();
                                // vm.queryFn();
                            }
                        })
                    }
                });
            }).catch(function(error) {
                // error contains a detailed error message.
                // swal(response.msg, "", "error");
            });
        }

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
            name: "公司名称",
            field: "companyName"
        }, {
            name: "分配人员",
            field: "belongToUserName"
        }, {
            name: "联系人",
            field: "user"
        }, {
            name: "联系电话",
            field: "phone"
        }, {
            name: "手机号",
            field: "mobile"
        }, {
            name: "最后操作时间",
            field: "updateDate"
        }, {
            name: "操作"
        }]

    }
})();
