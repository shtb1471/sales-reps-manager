(function() {
    'use strict';

    angular
        .module('gongrenOps')
        .controller('sourCustomerListController', sourCustomerListController);

    /** @ngInject */
    function sourCustomerListController(notify, $sce, $resource, $compile, $scope, $state, commDict, paginationNum, $stateParams, xxCacheSrv, ModalService) {
        var vm = this;

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
                    vm.tradeStatus = response.data[0].industryList
                    vm.tradeStatus.unshift({
                        gencodeValue: "",
                        gencodeName: "请选择"
                    });
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

        vm.queryFn = function() {
            var datas = $resource("/api/company/queryAll/byNameAndIndustry")
            datas.get(vm.query, function(response) {
                if (response.code == 0) {
                    vm.listDatas = response;
                }
            })
        }
        vm._canSelect = true
        vm.onReset = function() {
            _init()
            vm.queryFn()
        }
        vm.onRefresh = function() {
            vm.queryFn()
        }

        vm.editSource = function(row) {
            ModalService.showModal({
                templateUrl: "app/modules/sourCustomerManage/editSource.html",
                controller: "editSourceController",
                controllerAs: "modal",
                inputs: {
                    info: row
                }
            }).then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    if (result) {
                        var apiUrl = ""
                        var postDatas = {}
                        if (result.isEdit) {
                            apiUrl = "/api/company/update/company"
                            postDatas = {
                                id: result.datas.id,
                                name: result.datas.name,
                                companyWebsite: result.datas.companyWebsite,
                                industry: result.datas.industry,
                                scale: result.datas.scale,
                                property: result.datas.property,
                                address: result.datas.address,
                                shortDesc: result.datas.shortDesc,
                                companyId: result.datas.id, //查看代表什么
                                user: result.datas.user,
                                mobile: result.datas.mobile,
                                phone: result.datas.phone,
                                email: result.datas.email,
                                job: result.datas.job,
                                qq: result.datas.qq,
                                weixin: result.datas.weixin,
                                ext:result.datas.ext
                            }
                        } else {
                            apiUrl = "/api/company/add/companyvo"
                            postDatas = {
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
                                job: result.datas.job,
                                qq: result.datas.qq,
                                weixin: result.datas.weixin,
                                ext:result.datas.ext
                            }
                        }
                        var datas = $resource(apiUrl);
                        datas.save(postDatas,
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
                var datas = $resource("/api/company/delete/byId")
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
        vm.importFile = function() {
            ModalService.showModal({
                templateUrl: "app/modules/sourCustomerManage/import.html",
                controller: "importCustomerResourceController",
                controllerAs: "modal"
            }).then(function(modal) {
                modal.element.modal();
                // $state.reload();
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

        $scope.$watch("vm._checkedAll", function(n, o) {
            if (vm.listDatas && vm.listDatas.data.length > 0) {
                angular.forEach(vm.listDatas.data, function(ele, index) {
                    ele._checked = vm._checkedAll
                })
            }
        }, true)


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
            name: "联系电话",
            field: "phone"
        }, {
            name: "操作"
        }]
    }

})();
