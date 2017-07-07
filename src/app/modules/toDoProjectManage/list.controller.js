(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('toDoProjectController', toDoProjectController);

    /** @ngInject */
    function toDoProjectController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;

        function _init() {
            vm.query = {
                companyId: "",
                page: 1,
                pagesize: paginationNum
            }
        }
        //TODO:这一段代码不能随便修改    start
        $scope.$emit("detCustomerListStateParams", $stateParams)
        vm.commL = commDict;
        var l_uri = xxCacheSrv.mkKey($state.current.name, $state.params);
        vm.query = xxCacheSrv.get(l_uri);

        $scope.$on("$destroy", function() {
            xxCacheSrv.put(l_uri, vm.query);
        });
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

        if ($stateParams.verifyStatus) {
            vm.query.searchVerifyType = $stateParams.verifyStatus * 1
        }

        vm.queryFn = function() {
                var datas = $resource("/api/communication/query/todo");
                datas.get(vm.query, function(response) {
                    if (response.code == 0) {
                        vm.listDatas = response
                    }
                })
            }
            // 设置默认联系人
        vm.setDefaultContact = function(row) {
            var datas = $resource("/api/contacts/update/accContactsDefault");
            datas.get({
                companyId: row.companyId,
                contactId: row.id
            }, function(response) {
                if (response.code == 0) {
                    vm.contactInfo = response;

                    $state.reload();
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
                templateUrl: "app/modules/toDoProjectManage/editToDoProject.html",
                controller: "editToDoProjectController",
                controllerAs: "modal",
                inputs: {
                    info: row
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                      console.log(result,companyInfo)
                        var apiUrl = ""
                        var postDatas = {}
                        if (result.isEdit) {
                            apiUrl = "/api/communication/update/todo"
                            postDatas = {
                                id: result.datas.id,
                                companyId: result.datas.companyId,
                                createUserid: result.datas.createUserid,
                                assignId: result.datas.assignId,
                                item: result.datas.item,
                                itemDate: result.datas.itemDate
                            }
                        } else {
                            apiUrl = "/api/communication/add/todo"
                            postDatas = {
                                companyId: companyInfo.companyId,
                                assignId: companyInfo.resourceId,
                                item: result.datas.item,
                                itemDate: result.datas.item_date
                                    // item_date: ""//result.datas.item_date
                            }
                        }
                        var datas = $resource(apiUrl);
                        datas.save(postDatas, function(response) {
                                if (response.code == 0) {
                                    // swal(response.msg, "", "success");
                                    vm.queryFn();
                                } else {
                                    swal(response.msg, "", "error");
                                }
                            })
                            //TODO: 当前接口用于获取id值，为线索客户，目标客户，合作客户的列表显示最后操作时间做判断   end
                        var datas = $resource("/api/assign/update/assignUpdateDate")
                        datas.get({
                            id: companyInfo.resourceId
                        }, function(response) {
                            if (response.code == 0) {}
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
                    var datas = $resource("/api/communication/delete/todo")
                    datas.save({
                        ids: ids
                    }, function(response) {
                        if (response.code == 0) {
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
                })
                setTimeout(function() {
                    $scope.$apply();
                })
            }
        }

        vm.colsDefined = [{
            name: "待办时间",
            field: "itemDate"
        }, {
            name: "待办事项",
            field: "item"
        }, {
            name: "操作"
        }]
    }
})();
