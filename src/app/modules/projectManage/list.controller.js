(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('projectManageListController', projectManageListController);

    /** @ngInject */
    function projectManageListController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;

        function _init() {
            vm.query = {
                companyId: "",
                startTime: "",
                endTime: "",
                fileName: "",
                fileType: "1",
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
            vm.queryFn()

        })
        if ($stateParams.verifyStatus) {
            vm.query.searchVerifyType = $stateParams.verifyStatus * 1
        }
        vm.queryFn = function() {
            var datas = $resource("/api/accUserfile/query/commonfileByType")
            datas.save(vm.query, function(response) {
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
        vm.editSource = function(row) {
            ModalService.showModal({
                templateUrl: "app/modules/projectManage/editSource.html",
                controller: "editProgectController",
                controllerAs: "modal"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        var datas = $resource("/api/accUserfile/insert/fileVo");
                        result.datas.companyId = companyInfo.companyId;
                        datas.save(result.datas, function(response) {
                            if (response.code == 0) {
                                vm.queryFn();
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
            })
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
                var datas = $resource("/api/accUserfile/delete/fileVo")
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
