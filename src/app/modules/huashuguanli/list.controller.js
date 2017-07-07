(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('huashuguanliListController', huashuguanliListController);

    /** @ngInject */
    function huashuguanliListController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;
        vm._canSelect = true;

        function _init() {
            vm.query = {
                courseName: "",
                serviceType: 0,
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

        vm.queryFn = function() {
            var datas = $resource("/api/course/query/course")
            datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    var srvTypeList = ["全部", "工人网", "诚信互通"]
                    angular.forEach(response.data, function(ele, idx) {
                        ele.serviceTypeName = srvTypeList[ele.serviceType];
                    })
                    angular.forEach(response.data, function(cont, idc) {
                        if (cont.content) {
                            cont.content = cont.content.replace(/\n/g, '<br/>');
                        }
                    })
                    vm.listDatas = response;
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
        vm.queryFn()

        vm.editSource = function(row) {
            ModalService.showModal({
                templateUrl: "app/modules/huashuguanli/modal.createUpdate.html",
                controller: "huashuguanliCreateUpdateController",
                controllerAs: "modal",
                inputs: {
                    info: angular.copy(row)
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    var apiUrl = "/api/course/add/course"
                    if (row) {
                        apiUrl = "/api/course/update/course"
                    }
                    if (result) {
                        var datas = $resource(apiUrl)
                        datas.save(result.datas, function(response) {
                            if (response.code == 0) {
                                vm.queryFn();
                            } else {
                                swal(response.msg, "", "error");
                            }
                        });
                    }
                });
            });
        }

        vm.deleteSource = function(row) {
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
                var datas = $resource("/api/course/delete/course")
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
            name: "问",
            field: "name"
        }, {
            name: "答",
            field: "content"
        }, {
            name: "适用团队",
            field: "serviceTypeName"
        }, {
            name: "创建时间",
            field: "createDate"
        }, {
            name: "操作"
        }]
    }
})();
