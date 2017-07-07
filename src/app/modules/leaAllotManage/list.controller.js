(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('leaAllotListController', leaAllotListController);

    /** @ngInject */
    function leaAllotListController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;
        //处理隐藏导入操作
        function _init() {
            vm.query = {
                name: "",
                industry: "",
                createUserId: "",
                page: 1,
                pagesize: paginationNum
            }
        }
        // 获取所属行业select值 接口
        var datas = $resource("/api/company/query/sysGencodeList");
        datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    // console.log(response)
                    vm.tradeStatus = response.data[0].industryList
                    vm.tradeStatus.unshift({
                        gencodeValue: "",
                        gencodeName: "请选择"
                    });
                    // console.log(vm.tradeStatus)
                }
            })
            // 获取创建人 select值 接口
        var datas = $resource("/api/company/query/createUserList");
        datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    vm.createUser = response.data;
                    vm.createUser.unshift({
                        id: "",
                        name: "请选择"
                    });
                }
            })
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
            var datas = $resource("/api/company/query/byNameAndIndustry")
            datas.get(vm.query, function(response) {
                if (response.code == 0) {
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
        vm.editDocument = function(row) {
            ModalService.showModal({
                templateUrl: "app/modules/leaAllotManage/editDetail.html",
                controller: "editDetailController",
                controllerAs: "modal",
                inputs: {
                    info: angular.copy(row)
                }
            }).then(function(modal) {
                modal.close.then(function(result) {
                    console.log(result);
                    if (result) {
                        var datas = $resource("/api/company/update/company");
                        datas.save({
                            id: result.datas.id,
                            name: result.datas.name,
                            companyWebsite: result.datas.companyWebsite,
                            industry: result.datas.industry,
                            scale: result.datas.scale,
                            property: result.datas.property,
                            address: result.datas.address,
                            shortDesc: result.datas.shortDesc,
                            companyId: result.datas.id,
                            user: result.datas.user,
                            mobile: result.datas.mobile,
                            phone: result.datas.phone,
                            email: result.datas.email,
                            job: result.datas.job,
                            qq: result.datas.qq,
                            weixin: result.datas.weixin,
                            ext:result.datas.ext
                        }, function(response) {
                            if (response.code == 0) {
                                // swal(response.msg, "", "success");
                                vm.queryFn();
                            }
                        })
                    }
                });

            }).catch(function(error) {
                // error contains a detailed error message.
            });
        }
        vm.allotDocument = function() {
            var ids = []
            if (vm.listDatas && vm.listDatas.data) {
                angular.forEach(vm.listDatas.data, function(ele, index) {
                    // ele._checked = vm._checkedAll
                    if (ele._checked) {
                        ids.push(ele.id)
                    }
                })
            }
            // else{
            //   swal(response.msg, "", "error");
            // }
            ModalService.showModal({
                templateUrl: "app/modules/leaAllotManage/allotDocument.html",
                controller: "allotDocumentDetailController",
                controllerAs: "modal"
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        var datas = $resource("/api/assign/update/fenpei");
                        datas.save({
                            userid: result.datas,
                            companyid: ids.join(","),
                            serviceType: "1"
                        }, function(response) {
                            if (response.code == 0) {
                                // swal(response.msg, "", "success");
                                // vm.queryFn();
                                $state.reload();
                            }
                        })
                    }
                });
            }).catch(function(error) {
                // error contains a detailed error message.
                // swal(response.msg, "", "error");
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
            //待分配  tab标签项
        vm.tabQuery = function(type) {
            // vm.query.companyLevel = type;
            var apiUrl = ""
            if (type) {
                if (type == 1) {
                    apiUrl = "/api/company/query/deleteOne";
                } else if (type == 2) {
                    apiUrl = "/api/company/query/deleteTwo";
                } else {
                    apiUrl = "/api/company/query/Empty";
                }
            } else {
                apiUrl = "/api/company/query/byNameAndIndustry";
            }
            var datas = $resource(apiUrl);
            datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    vm.listDatas = response
                }
            })
        }

        vm.colsDefined = [{
            name: "公司名称",
            field: "name"
        }, {
            name: "创建人",
            field: "createUsername"
        }, {
            name: "所属行业",
            field: "industryName"
        }, {
            name: "联系人",
            field: "user"
        }, {
            name: "手机",
            field: "mobile"
        }, {
            name: "联系电话",
            field: "phone"
        }, {
            name: "操作"
        }]

    }
})();
