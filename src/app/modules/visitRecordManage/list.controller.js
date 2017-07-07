(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('visitRecordListController', visitRecordListController);

    /** @ngInject */
    function visitRecordListController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;

        function _init() {
            vm.query = {
                companyId: "",
                userName: "",
                startDate: "",
                endDate: "",
                page: 1,
                pagesize: paginationNum
            }
        }
        //TODO:这一段代码不能随便修改    start
        $scope.$emit("detCustomerListStateParams", $stateParams)
        vm.commL = commDict;
        // var l_uri = xxCacheSrv.mkKey($state.current.name, $state.params);
        // vm.query = xxCacheSrv.get(l_uri);
        //
        // $scope.$on("$destroy", function() {
        //     xxCacheSrv.put(l_uri, vm.query);
        // });
        //TODO:这一段代码不能随便修改    end

        var companyInfo = {};

        $scope.$on("detCustomerListGetUserListCompanyId", function(evt, msg) {
            companyInfo = msg;
            if (!vm.query) {
                _init();
            }
            vm.query.companyId = companyInfo.companyId;
            vm.queryFn();
        })

        vm.queryFn = function() {
            var datas = $resource("/api/company/query/companyVisitList");
            datas.save(vm.query, function(response) {
                if (response.code == 0) {
                    // createDate
                    angular.forEach(response.data, function(ele, index) {
                        if (ele.startDate) {
                            ele.startDate = moment(ele.startDate).format("YYYY-MM-DD")
                        }
                    })
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
        vm.editSource = function(row) {
            ModalService.showModal({
                templateUrl: "app/modules/visitRecordManage/editSource.html",
                controller: "editVisitController",
                controllerAs: "modal",
                inputs: {
                    info: companyInfo
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        var datas = $resource("/api/company/add/companyVisitInfo");
                        datas.save({
                            companyId: result.datas.companyId,
                            // userName: "测试企业",
                            userName: result.datas.userName,
                            mobile: result.datas.mobile,
                            linkContent: result.datas.linkContent,
                            questionContent: result.datas.questionContent,
                            intentContent: result.datas.intentContent,
                            followUser: result.datas.followUser,
                            visitDate: result.datas.visitDate
                        }, function(response) {
                            if (response.code == 0) {
                                // swal(response.msg, "", "success");
                                vm.queryFn();
                            } else {
                                swal(response.msg, "", "error");
                            }
                        })
                        //TODO: 当前接口用于获取id值，为线索客户，目标客户，合作客户的列表显示最后操作时间做判断   end
                        var datas = $resource("/api/assign/update/assignUpdateDate")
                        datas.get({id: companyInfo.resourceId}, function(response) {
                            if (response.code == 0) {
                            }
                        })
                    }
                });
            }).catch(function(error) {
                // error contains a detailed error message.
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
                    var datas = $resource("/api/company/delete/companyVisitInfo")
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
            // vm.queryFn()

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
            name: "拜访人",
            field: "userName"
        }, {
            name: "联系电话",
            field: "mobile"
        }, {
            name: "拜访日期",
            field: "startDate"
        }, {
            name: "创建时间",
            field: "createDate"
        }, {
            name: "操作"
        }]

    }
})();
